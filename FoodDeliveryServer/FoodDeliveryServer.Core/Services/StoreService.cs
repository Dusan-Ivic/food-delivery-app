using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryServer.Common.Exceptions;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Core.Interfaces;
using FoodDeliveryServer.Data.Models;
using NetTopologySuite.Geometries;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using CloudinaryDotNet.Actions;
using Point = NetTopologySuite.Geometries.Point;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Services
{
    public class StoreService : IStoreService
    {
        private readonly IStoreRepository _storeRepository;
        private readonly IValidator<Store> _validator;
        private readonly IMapper _mapper;
        private readonly Cloudinary _cloudinary;

        public StoreService(IConfiguration config, IStoreRepository storeRepository, IValidator<Store> validator, IMapper mapper)
        {
            _storeRepository = storeRepository;
            _validator = validator;
            _mapper = mapper;

            IConfigurationSection cloudinarySettings = config.GetSection("CloudinarySettings");
            string cloudinaryUrl = cloudinarySettings.GetValue<string>("CloudinaryUrl");
            _cloudinary = new Cloudinary(cloudinaryUrl);
        }

        public async Task<List<StoreResponseDto>> GetStores(long? partnerId, double? latitude, double? longitude)
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

            return _mapper.Map<List<StoreResponseDto>>(stores);
        }

        public async Task<StoreResponseDto> GetStore(long id)
        {
            Store? store = await _storeRepository.GetStoreById(id);

            if (store == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            return _mapper.Map<StoreResponseDto>(store);
        }

        public async Task<StoreResponseDto> CreateStore(long partnerId, StoreRequestDto requestDto)
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

            store = await _storeRepository.CreateStore(store);

            return _mapper.Map<StoreResponseDto>(store);
        }

        public async Task<StoreResponseDto> UpdateStore(long id, long partnerId, StoreRequestDto requestDto)
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

            _mapper.Map(requestDto, store);

            store.DeliveryArea = deliveryAreaPolygon;

            store = await _storeRepository.UpdateStore(store);

            return _mapper.Map<StoreResponseDto>(store);
        }

        public async Task<DeleteEntityResponseDto> DeleteStore(long id)
        {
            Store? store = await _storeRepository.GetStoreById(id);

            if (store == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            await _storeRepository.DeleteStore(store);

            return _mapper.Map<DeleteEntityResponseDto>(store);
        }

        public async Task<ImageResponseDto> UploadImage(long storeId, long partnerId, Stream imageStream, string imageName)
        {
            if (imageStream == null || imageStream.Length == 0)
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

            if (existingStore.ImagePublicId != null)
            {
                DeletionParams deletionParams = new DeletionParams(existingStore.ImagePublicId)
                {
                    ResourceType = ResourceType.Image
                };

                await _cloudinary.DestroyAsync(deletionParams);
            }

            ImageUploadParams uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imageName, imageStream),
                Tags = "stores"
            };

            ImageUploadResult uploadResult = await _cloudinary.UploadAsync(uploadParams);

            existingStore.ImagePublicId = uploadResult.PublicId;
            existingStore.Image = uploadResult.Url.ToString();

            existingStore = await _storeRepository.UpdateStore(existingStore);

            return _mapper.Map<ImageResponseDto>(existingStore);
        }
    }
}
