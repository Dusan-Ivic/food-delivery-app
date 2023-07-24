using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryApi.Dto.Admin;
using FoodDeliveryApi.Dto.Partner;
using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Models;
using FoodDeliveryApi.Repositories;

namespace FoodDeliveryApi.Services
{
    public class PartnerService : IPartnerService
    {
        private readonly IPartnerRepository _partnerRepository;
        private readonly IValidator<Partner> _validator;
        private readonly IMapper _mapper;

        public PartnerService(IPartnerRepository partnerRepository, IValidator<Partner> validator, IMapper mapper)
        {
            _partnerRepository = partnerRepository;
            _validator = validator;
            _mapper = mapper;
        }

        public async Task<List<GetPartnerResponseDto>> GetPartners(string status)
        {
            List<Partner> partners = new List<Partner>();

            if (string.IsNullOrEmpty(status))
            {
                partners = await _partnerRepository.GetAllPartners();
            }
            else
            {
                PartnerStatus partnerStatus;

                if (!Enum.TryParse(status, out partnerStatus))
                {
                    throw new ArgumentException("Invalid status. Status must be one of the following: " + string.Join(", ", Enum.GetNames(typeof(PartnerStatus))));
                }

                partners = await _partnerRepository.GetPartnersByStatus(partnerStatus);
            }

            return _mapper.Map<List<GetPartnerResponseDto>>(partners);
        }

        public async Task<RegisterPartnerResponseDto> RegisterPartner(RegisterPartnerRequestDto requestDto)
        {
            Partner partner = _mapper.Map<Partner>(requestDto);
            partner.Status = PartnerStatus.Pending;

            ValidationResult validationResult = _validator.Validate(partner);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            if (await _partnerRepository.IsEmailTaken(partner.Email))
            {
                throw new UserAlreadyExistsException("User with this email already exists");
            }

            if (await _partnerRepository.IsUsernameTaken(partner.Username))
            {
                throw new UserAlreadyExistsException("User with this username already exists");
            }

            // Hash password
            string salt = BCrypt.Net.BCrypt.GenerateSalt();
            partner.Password = BCrypt.Net.BCrypt.HashPassword(partner.Password, salt);

            try
            {
                partner = await _partnerRepository.RegisterPartner(partner);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<RegisterPartnerResponseDto>(partner);
        }
    }
}
