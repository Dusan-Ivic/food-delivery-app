﻿using AutoMapper;
using FoodDeliveryApi.Dto.Store;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Mapping
{
    public class StoreProfile : Profile
    {
        public StoreProfile()
        {
            CreateMap<CreateStoreRequestDto, Store>();
            CreateMap<Store, CreateStoreResponseDto>();
        }
    }
}