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

        public async Task<List<GetStoreResponseDto>> GetStores(long? partnerId)
        {
            List<Store> stores = new List<Store>();

            if (partnerId.HasValue)
            {
                List<Store> allStores = await _storeRepository.GetAllStores();
                stores = allStores.Where(x => x.PartnerId == partnerId.Value).ToList();
            }
            else
            {
                stores = await _storeRepository.GetAllStores();
            }

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

        public async Task<UpdateStoreResponseDto> UpdateStore(long id, long partnerId, UpdateStoreRequestDto requestDto)
        {
            Store? store = await _storeRepository.GetStoreById(id);

            if (store == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            if (store.PartnerId != partnerId)
            {
                throw new ActionNotAllowedException("Unauthorized to update this store. Only the creator can perform this action.");
            }

            Store updatedStore = _mapper.Map<Store>(requestDto);

            ValidationResult validationResult = _validator.Validate(updatedStore, options =>
            {
                options.IncludeProperties(x => x.Name);
                options.IncludeProperties(x => x.Description);
                options.IncludeProperties(x => x.Address);
                options.IncludeProperties(x => x.City);
                options.IncludeProperties(x => x.PostalCode);
                options.IncludeProperties(x => x.Phone);
            });

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            try
            {
                _mapper.Map(requestDto, store);
                store = await _storeRepository.UpdateStore(store);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<UpdateStoreResponseDto>(store);
        }

        public async Task<DeleteStoreResponseDto> DeleteStore(long id)
        {
            Store? store = await _storeRepository.GetStoreById(id);

            if (store == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            try
            {
                await _storeRepository.DeleteStore(store);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<DeleteStoreResponseDto>(store);
        }
    }
}
