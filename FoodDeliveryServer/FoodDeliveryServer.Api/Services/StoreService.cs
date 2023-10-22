﻿using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryServer.Common.Dto.Auth;
using FoodDeliveryServer.Common.Dto.Store;
using FoodDeliveryServer.Common.Enums;
using FoodDeliveryServer.Common.Exceptions;
using FoodDeliveryServer.Api.Interfaces.Repositories;
using FoodDeliveryServer.Api.Interfaces.Services;
using FoodDeliveryServer.Api.Models;
using FoodDeliveryServer.Api.Repositories;
using NetTopologySuite.Geometries;

namespace FoodDeliveryServer.Api.Services
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

        public async Task<List<GetStoreResponseDto>> GetStores(long? partnerId, double? latitude, double? longitude)
        {
            List<Store> allStores = await _storeRepository.GetAllStores();
            List<Store> stores = new List<Store>();

            if (partnerId.HasValue)
            {
                stores = allStores.Where(x => x.PartnerId == partnerId.Value).ToList();
            }
            else if (latitude.HasValue && longitude.HasValue)
            {
                Point point = new Point(new Coordinate(longitude.Value, latitude.Value));
                stores = allStores.Where(x => point.Within(x.DeliveryArea)).ToList();
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

            Polygon deliveryAreaPolygon = _mapper.Map<Polygon>(store.Coordinates);

            if (!deliveryAreaPolygon.IsValid)
            {
                throw new InvalidTopologyException("Delivery area is not a valid polygon");
            }

            deliveryAreaPolygon.SRID = 4326;
            store.DeliveryArea = deliveryAreaPolygon;

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
                options.IncludeProperties(x => x.Coordinates);
            });

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            Polygon deliveryAreaPolygon = _mapper.Map<Polygon>(updatedStore.Coordinates);

            if (!deliveryAreaPolygon.IsValid)
            {
                throw new InvalidTopologyException("Delivery area is not a valid polygon");
            }

            deliveryAreaPolygon.SRID = 4326;

            try
            {
                _mapper.Map(requestDto, store);
                store.DeliveryArea = deliveryAreaPolygon;
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

        public async Task<ImageResponseDto> UploadImage(long storeId, long partnerId, IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                throw new InvalidImageException("Provided image is invalid. Please ensure that the image has valid content");
            }

            Store? existingStore = await _storeRepository.GetStoreById(storeId);

            if (existingStore == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            if (existingStore.PartnerId != partnerId)
            {
                throw new ActionNotAllowedException("Unauthorized to update this store. Only the creator can perform this action.");
            }

            if (existingStore.Image != null)
            {
                string oldImageName = existingStore.Image;
                string oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", oldImageName);

                if (File.Exists(oldImagePath))
                {
                    File.Delete(oldImagePath);
                }
            }

            string fileExtension = Path.GetExtension(image.FileName);

            DateTime currentTime = DateTime.UtcNow;
            string newImageName = $"{currentTime:yyyyMMddHHmmssfff}{fileExtension}";
            string newImagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", newImageName);

            using (var stream = new FileStream(newImagePath, FileMode.Create))
            {
                image.CopyTo(stream);
            }

            existingStore.Image = newImageName;

            try
            {
                existingStore = await _storeRepository.UpdateStore(existingStore);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<ImageResponseDto>(existingStore);
        }
    }
}