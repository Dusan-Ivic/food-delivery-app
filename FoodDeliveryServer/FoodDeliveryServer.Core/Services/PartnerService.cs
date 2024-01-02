using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryServer.Common.Enums;
using FoodDeliveryServer.Common.Exceptions;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Core.Interfaces;
using FoodDeliveryServer.Data.Models;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Services
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

        public async Task<PartnerResponseDto> GetPartner(long id)
        {
            Partner? partner = await _partnerRepository.GetPartnerById(id);

            if (partner == null)
            {
                throw new ResourceNotFoundException("Partner with this id doesn't exist");
            }

            return _mapper.Map<PartnerResponseDto>(partner);
        }

        public async Task<List<PartnerResponseDto>> GetPartners(string status)
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

            return _mapper.Map<List<PartnerResponseDto>>(partners);
        }

        public async Task<PartnerResponseDto> RegisterPartner(RegisterUserRequestDto requestDto)
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
                throw new UserAlreadyExistsException("Partner with this email already exists");
            }

            if (await _partnerRepository.IsUsernameTaken(partner.Username))
            {
                throw new UserAlreadyExistsException("Partner with this username already exists");
            }

            // Hash password
            string salt = BCrypt.Net.BCrypt.GenerateSalt();
            partner.Password = BCrypt.Net.BCrypt.HashPassword(partner.Password, salt);

            partner = await _partnerRepository.RegisterPartner(partner);

            PartnerResponseDto responseDto = _mapper.Map<PartnerResponseDto>(partner);
            responseDto.UserType = UserType.Partner;

            return responseDto;
        }

        public async Task<PartnerResponseDto> UpdatePartner(long id, UpdateUserRequestDto requestDto)
        {
            Partner? partner = await _partnerRepository.GetPartnerById(id);

            if (partner == null)
            {
                throw new ResourceNotFoundException("Partner with this id doesn't exist");
            }

            Partner updatedPartner = _mapper.Map<Partner>(requestDto);

            ValidationResult validationResult = _validator.Validate(updatedPartner, options =>
            {
                options.IncludeProperties(x => x.Username);
                options.IncludeProperties(x => x.Email);
                options.IncludeProperties(x => x.FirstName);
                options.IncludeProperties(x => x.LastName);
            });

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            if (await _partnerRepository.IsEmailTaken(updatedPartner.Email) && updatedPartner.Email != partner.Email)
            {
                throw new UserAlreadyExistsException("Partner with this email already exists");
            }

            if (await _partnerRepository.IsUsernameTaken(updatedPartner.Username) && updatedPartner.Username != partner.Username)
            {
                throw new UserAlreadyExistsException("Partner with this username already exists");
            }

            _mapper.Map(requestDto, partner);

            partner = await _partnerRepository.UpdatePartner(partner);

            PartnerResponseDto responseDto = _mapper.Map<PartnerResponseDto>(partner);
            responseDto.UserType = UserType.Partner;

            return responseDto;
        }

        public async Task<DeleteEntityResponseDto> DeletePartner(long id)
        {
            Partner? partner = await _partnerRepository.GetPartnerById(id);

            if (partner == null)
            {
                throw new ResourceNotFoundException("Partner with this id doesn't exist");
            }

            await _partnerRepository.DeletePartner(partner);

            return _mapper.Map<DeleteEntityResponseDto>(partner);
        }

        public async Task<PartnerResponseDto> VerifyPartner(long id, VerifyPartnerRequestDto requestDto)
        {
            Partner? partner = await _partnerRepository.GetPartnerById(id);

            if (partner == null)
            {
                throw new ResourceNotFoundException("Partner with this id doesn't exist");
            }

            _mapper.Map(requestDto, partner);

            ValidationResult validationResult = _validator.Validate(partner);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            partner = await _partnerRepository.UpdatePartner(partner);

            return _mapper.Map<PartnerResponseDto>(partner);
        }
    }
}
