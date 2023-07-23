using AutoMapper;
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
        private readonly IMapper _mapper;

        public AuthService(IAuthRepository authRepository, IMapper mapper)
        {
            _authRepository = authRepository;
            _mapper = mapper;
        }

        public async Task<LoginUserResponseDto> LoginUser(LoginUserRequestDto requestDto)
        {
            User? user = await _authRepository.GetUser(requestDto.Username, requestDto.UserType);

            if (user == null)
            {
                throw new IncorrectLoginCredentialsException("User with this username doesn't exist");
            }

            if (!BCrypt.Net.BCrypt.Verify(requestDto.Password, user.Password))
            {
                throw new IncorrectLoginCredentialsException("Incorrect password");
            }

            LoginUserResponseDto responseDto = _mapper.Map<LoginUserResponseDto>(user);
            responseDto.UserType = requestDto.UserType;
            
            // TODO - Create JSON Web Token
            responseDto.Token = "";

            return responseDto;
        }
    }
}
