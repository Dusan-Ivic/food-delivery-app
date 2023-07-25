using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryApi.Dto.Store;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Models;
using FoodDeliveryApi.Repositories;

namespace FoodDeliveryApi.Services
{
    public class StoreService : IStoreService
    {
        private readonly IStoreRepository _storeRepository;
        private readonly IValidator<Store> _validator;
        private readonly IMapper _mapper;

        public StoreService(IStoreRepository storeRepository, IValidator<Store> validator, IMapper mapper)
        {
            _storeRepository = storeRepository;
            _validator = validator;
            _mapper = mapper;
        }

        public async Task<CreateStoreResponseDto> CreateStore(long partnerId, CreateStoreRequestDto requestDto)
        {
            Store store = _mapper.Map<Store>(requestDto);
            store.PartnerId = partnerId;

            ValidationResult validationResult = _validator.Validate(store);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            try
            {
                store = await _storeRepository.CreateStore(store);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<CreateStoreResponseDto>(store);
        }
    }
}
