﻿using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryApi.Dto.Admin;
using FoodDeliveryApi.Dto.Auth;
using FoodDeliveryApi.Dto.Customer;
using FoodDeliveryApi.Dto.Partner;
using FoodDeliveryApi.Dto.User;
using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Helpers;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace FoodDeliveryApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfigurationSection _jwtSettings;
        private readonly IAuthRepository _authRepository;
        private readonly IValidator<User> _validator;
        private readonly IMapper _mapper;

        public AuthService(IConfiguration config, IAuthRepository authRepository, IValidator<User> validator, IMapper mapper)
        {
            _jwtSettings = config.GetSection("JWTSettings");
            _authRepository = authRepository;
            _validator = validator;
            _mapper = mapper;
        }

        public async Task<LoginUserResponseDto> LoginUser(LoginUserRequestDto requestDto)
        {
            User user = _mapper.Map<User>(requestDto);

            ValidationResult validationResult = _validator.Validate(user, options =>
            {
                options.IncludeProperties(x => x.Username);
                options.IncludeProperties(x => x.Password);
            });

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            User? existingUser = await _authRepository.GetUserByUsername(user.Username, requestDto.UserType);

            if (existingUser == null)
            {
                throw new IncorrectLoginCredentialsException("User with this username doesn't exist");
            }

            if (!BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password))
            {
                throw new IncorrectLoginCredentialsException("Incorrect password");
            }

            UserResponseDto userDto;

            switch (requestDto.UserType)
            {
                case UserType.Customer:
                    userDto = _mapper.Map<CustomerResponseDto>(existingUser);
                    break;
                case UserType.Partner:
                    userDto = _mapper.Map<PartnerResponseDto>(existingUser);
                    break;
                case UserType.Admin:
                    userDto = _mapper.Map<AdminResponseDto>(existingUser);
                    break;
                default:
                    userDto = _mapper.Map<UserResponseDto>(existingUser);
                    break;
            }

            userDto.UserType = requestDto.UserType;

            List<Claim> claims = new List<Claim>
            {
                new Claim("UserId", existingUser.Id.ToString()),
                new Claim(ClaimTypes.Role, userDto.UserType.ToString())
            };

            if (existingUser is Partner possiblePartner)
            {
                claims.Add(new Claim("Status", possiblePartner.Status.ToString()));
                // TODO
                //responseDto.PartnerStatus = possiblePartner.Status;
            }

            string jwtSecretKey = _jwtSettings.GetValue<string>("SecretKey");
            string jwtIssuer = _jwtSettings.GetValue<string>("Issuer");

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey));

            SigningCredentials signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken securityToken = new JwtSecurityToken(
                issuer: jwtIssuer,
                claims: claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signingCredentials
            );

            LoginUserResponseDto responseDto = new LoginUserResponseDto()
            {
                User = userDto,
                Token = new JwtSecurityTokenHandler().WriteToken(securityToken)
            };

            return responseDto;
        }

        public async Task<UserResponseDto> GetProfile(long userId, UserType userType)
        {
            User? existingUser = await _authRepository.GetUserById(userId, userType);

            if (existingUser == null)
            {
                throw new ResourceNotFoundException("User with this id doesn't exist");
            }

            UserResponseDto responseDto = new UserResponseDto();

            switch (userType)
            {
                case UserType.Customer:
                    responseDto = _mapper.Map<CustomerResponseDto>(existingUser);
                    break;
                case UserType.Partner:
                    responseDto = _mapper.Map<PartnerResponseDto>(existingUser);
                    break;
                case UserType.Admin:
                    responseDto = _mapper.Map<AdminResponseDto>(existingUser);
                    break;
                default:
                    responseDto = _mapper.Map<UserResponseDto>(existingUser);
                    break;
            }

            return responseDto;
        }

        public async Task<TokenResponseDto> GenerateToken(CreateTokenRequestDto requestDto)
        {
            GrantType grantType = requestDto.GrantType;

            if (grantType == GrantType.UsernamePassword)
            {
                UserType? userType = requestDto.UserType;
                string? username = requestDto.Username;
                string? password = requestDto.Password;

                if (userType == null)
                {
                    throw new IncorrectLoginCredentialsException("User type is required");
                }

                if (string.IsNullOrEmpty(username) ||  string.IsNullOrEmpty(password))
                {
                    throw new IncorrectLoginCredentialsException("Username and password are required");
                }

                User? user = await _authRepository.GetUserByUsername(username, userType.Value);

                if (user == null)
                {
                    throw new IncorrectLoginCredentialsException("Incorrect username");
                }

                if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
                {
                    throw new IncorrectLoginCredentialsException("Incorrect password");
                }

                List<Claim> claims = new List<Claim>()
                {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim(ClaimTypes.Role, userType.Value.ToString())
                };

                if (user is Partner partner)
                {
                    claims.Add(new Claim("Status", partner.Status.ToString()));
                }

                string jwtSecretKey = _jwtSettings.GetValue<string>("SecretKey");
                string jwtIssuer = _jwtSettings.GetValue<string>("Issuer");

                int accessTokenExpiresIn = 1800;
                int refreshTokenExpiresIn = 2592000;

                string accessTokenPayload = TokenHelpers.GenerateAccessToken(jwtSecretKey, jwtIssuer, claims, accessTokenExpiresIn);
                string refreshTokenPayload = TokenHelpers.GenerateRefreshToken();

                RefreshToken refreshToken = new RefreshToken()
                {
                    Token = refreshTokenPayload,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresIn = refreshTokenExpiresIn,
                    UserId = user.Id,
                    UserType = userType.Value
                };

                try
                {
                    refreshToken = await _authRepository.CreateRefreshToken(refreshToken);
                }
                catch (Exception)
                {
                    throw;
                }

                TokenResponseDto responseDto = new TokenResponseDto()
                {
                    AccessToken = accessTokenPayload,
                    RefreshToken = refreshToken.Token,
                    ExpiresIn = accessTokenExpiresIn
                };

                return responseDto;
            }
            else if (grantType == GrantType.RefreshToken)
            {
                string? refreshToken = requestDto.RefreshToken;

                if (string.IsNullOrEmpty(refreshToken))
                {
                    throw new IncorrectLoginCredentialsException("Refresh token is required");
                }

                RefreshToken? existingRefreshToken = await _authRepository.GetRefreshToken(refreshToken);

                if (existingRefreshToken == null)
                {
                    throw new IncorrectLoginCredentialsException("Provided refresh token is not valid");
                }

                User? user = await _authRepository.GetUserById(existingRefreshToken.UserId, existingRefreshToken.UserType);

                if (user == null)
                {
                    throw new ResourceNotFoundException("User with this id doesn't exist");
                }

                List<Claim> claims = new List<Claim>()
                {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim(ClaimTypes.Role, existingRefreshToken.UserType.ToString())
                };

                if (user is Partner partner)
                {
                    claims.Add(new Claim("Status", partner.Status.ToString()));
                }

                string jwtSecretKey = _jwtSettings.GetValue<string>("SecretKey");
                string jwtIssuer = _jwtSettings.GetValue<string>("Issuer");

                int accessTokenExpiresIn = 1800;

                string accessToken = TokenHelpers.GenerateAccessToken(jwtSecretKey, jwtIssuer, claims, accessTokenExpiresIn);

                TokenResponseDto responseDto = new TokenResponseDto()
                {
                    AccessToken = accessToken,
                    RefreshToken = existingRefreshToken.Token,
                    ExpiresIn = accessTokenExpiresIn
                };

                return responseDto;
            }
            else
            {
                throw new NotImplementedException();
            }
        }

        public async Task DeleteToken(long userId, UserType userType, DeleteTokenRequestDto requestDto)
        {
            User? user = await _authRepository.GetUserById(userId, userType);

            if (user == null)
            {
                throw new ResourceNotFoundException("User with this id doesn't exist");
            }

            string refreshToken = requestDto.RefreshToken;

            RefreshToken? existingRefreshToken = await _authRepository.GetRefreshToken(refreshToken);

            if (existingRefreshToken == null)
            {
                throw new IncorrectLoginCredentialsException("Provided refresh token is not valid");
            }

            try
            {
                await _authRepository.DeleteRefreshToken(existingRefreshToken);
            }
            catch (Exception)
            {
                throw;
            }

            return;
        }

        public async Task ChangePassword(long id, UserType userType, ChangePasswordRequestDto requestDto)
        {
            User user = _mapper.Map<User>(requestDto);

            ValidationResult validationResult = _validator.Validate(user, options =>
            {
                options.IncludeProperties(x => x.Password);
            });

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            User? existingUser = await _authRepository.GetUserById(id, userType);

            if (existingUser == null)
            {
                throw new ResourceNotFoundException("User with this id doesn't exist");
            }

            if (!BCrypt.Net.BCrypt.Verify(requestDto.OldPassword, existingUser.Password))
            {
                throw new IncorrectLoginCredentialsException("Incorrect password");
            }

            string salt = BCrypt.Net.BCrypt.GenerateSalt();
            existingUser.Password = BCrypt.Net.BCrypt.HashPassword(requestDto.NewPassword, salt);

            try
            {
                existingUser = await _authRepository.UpdateUser(existingUser);
            }
            catch (Exception)
            {
                throw;
            }

            return;
        }

        public async Task<ImageResponseDto> UploadImage(long id, UserType userType, IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                throw new InvalidImageException("Provided image is invalid. Please ensure that the image has valid content");
            }

            User? existingUser = await _authRepository.GetUserById(id, userType);

            if (existingUser == null)
            {
                throw new ResourceNotFoundException("User with this id doesn't exist");
            }

            using var memoryStream = new MemoryStream();
            image.CopyTo(memoryStream);

            byte[] imageData = memoryStream.ToArray();

            existingUser.ImageData = imageData;

            try
            {
                existingUser = await _authRepository.UpdateUser(existingUser);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<ImageResponseDto>(existingUser);
        }

        public async Task<ImageResponseDto> GetImage(long id, UserType userType)
        {
            User? existingUser = await _authRepository.GetUserById(id, userType);

            if (existingUser == null)
            {
                throw new ResourceNotFoundException("User with this id doesn't exist");
            }

            return _mapper.Map<ImageResponseDto>(existingUser);
        }

        public async Task RemoveImage(long userId, UserType userType)
        {
            User? existingUser = await _authRepository.GetUserById(userId, userType);

            if (existingUser == null)
            {
                throw new ResourceNotFoundException("User with this id doesn't exist");
            }

            existingUser.ImageData = new byte[0];

            try
            {
                existingUser = await _authRepository.UpdateUser(existingUser);
            }
            catch (Exception)
            {
                throw;
            }

            return;
        }
    }
}
