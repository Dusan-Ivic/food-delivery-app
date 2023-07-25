using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryApi.Dto.Store;
using FoodDeliveryApi.Exceptions;
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

        public async Task<List<GetStoreResponseDto>> GetStores()
        {
            List<Store> stores = await _storeRepository.GetAllStores();

            return _mapper.Map<List<GetStoreResponseDto>>(stores);
        }

        public async Task<GetStoreResponseDto> GetStore(long id)
        {
            Store? store = await _storeRepository.GetStoreById(id);

            if (store == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            return _mapper.Map<GetStoreResponseDto>(store);
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
