using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryServer.Common.Dto.Partner;
using FoodDeliveryServer.Common.Enums;
using FoodDeliveryServer.Common.Exceptions;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Core.Interfaces;
using FoodDeliveryServer.Data.Models;

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

        public async Task<GetPartnerResponseDto> GetPartner(long id)
        {
            Partner? partner = await _partnerRepository.GetPartnerById(id);

            if (partner == null)
            {
                throw new ResourceNotFoundException("Partner with this id doesn't exist");
            }

            return _mapper.Map<GetPartnerResponseDto>(partner);
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
                throw new UserAlreadyExistsException("Partner with this email already exists");
            }

            if (await _partnerRepository.IsUsernameTaken(partner.Username))
            {
                throw new UserAlreadyExistsException("Partner with this username already exists");
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

            RegisterPartnerResponseDto responseDto = _mapper.Map<RegisterPartnerResponseDto>(partner);
            responseDto.UserType = UserType.Partner;

            return responseDto;
        }

        public async Task<UpdatePartnerResponseDto> UpdatePartner(long id, UpdatePartnerRequestDto requestDto)
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

            try
            {
                _mapper.Map(requestDto, partner);
                partner = await _partnerRepository.UpdatePartner(partner);
            }
            catch (Exception)
            {
                throw;
            }

            UpdatePartnerResponseDto responseDto = _mapper.Map<UpdatePartnerResponseDto>(partner);
            responseDto.UserType = UserType.Partner;

            return responseDto;
        }

        public async Task<DeletePartnerResponseDto> DeletePartner(long id)
        {
            Partner? partner = await _partnerRepository.GetPartnerById(id);

            if (partner == null)
            {
                throw new ResourceNotFoundException("Partner with this id doesn't exist");
            }

            try
            {
                await _partnerRepository.DeletePartner(partner);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<DeletePartnerResponseDto>(partner);
        }

        public async Task<UpdatePartnerResponseDto> VerifyPartner(long id, VerifyPartnerRequestDto requestDto)
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

            try
            {
                partner = await _partnerRepository.UpdatePartner(partner);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<UpdatePartnerResponseDto>(partner);
        }
    }
}
