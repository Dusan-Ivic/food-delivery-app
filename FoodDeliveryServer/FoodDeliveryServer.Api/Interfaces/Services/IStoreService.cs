﻿using FoodDeliveryServer.Common.Dto.Auth;
using FoodDeliveryServer.Common.Dto.Store;
using FoodDeliveryServer.Common.Enums;

namespace FoodDeliveryServer.Api.Interfaces.Services
{
    public interface IStoreService
    {
        public Task<List<GetStoreResponseDto>> GetStores(long? partnerId, double? latitude, double? longitude);
        public Task<GetStoreResponseDto> GetStore(long id);
        public Task<CreateStoreResponseDto> CreateStore(long partnerId, CreateStoreRequestDto requestDto);
        public Task<UpdateStoreResponseDto> UpdateStore(long id, long partnerId, UpdateStoreRequestDto requestDto);
        public Task<DeleteStoreResponseDto> DeleteStore(long id);
        public Task<ImageResponseDto> UploadImage(long storeId, long partnerId, IFormFile image);
    }
}