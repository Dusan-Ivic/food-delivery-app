using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryApi.Dto.Auth;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IValidator<User> _validator;
        private readonly IMapper _mapper;

        public AuthService(IAuthRepository authRepository, IValidator<User> validator, IMapper mapper)
        {
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

            User? existingUser = await _authRepository.GetUser(user.Username, requestDto.UserType);

            if (existingUser == null)
            {
                throw new IncorrectLoginCredentialsException("User with this username doesn't exist");
            }

            if (!BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password))
            {
                throw new IncorrectLoginCredentialsException("Incorrect password");
            }

            LoginUserResponseDto responseDto = _mapper.Map<LoginUserResponseDto>(existingUser);
            responseDto.UserType = requestDto.UserType;
            
            // TODO - Create JSON Web Token
            responseDto.Token = "";

            return responseDto;
        }
    }
}
