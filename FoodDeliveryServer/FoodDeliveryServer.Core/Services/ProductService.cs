using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryServer.Common.Exceptions;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Core.Interfaces;
using FoodDeliveryServer.Data.Models;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using CloudinaryDotNet.Actions;
using FoodDeliveryServer.Common.Dto.Request;
using FoodDeliveryServer.Common.Dto.Response;

namespace FoodDeliveryServer.Core.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IStoreRepository _storeRepository;
        private readonly IValidator<Product> _validator;
        private readonly IMapper _mapper;
        private readonly Cloudinary _cloudinary;

        public ProductService(IConfiguration config, IProductRepository productRepository, IStoreRepository storeRepository, IValidator<Product> validator, IMapper mapper)
        {
            _productRepository = productRepository;
            _storeRepository = storeRepository;
            _validator = validator;
            _mapper = mapper;

            IConfigurationSection cloudinarySettings = config.GetSection("CloudinarySettings");
            string cloudinaryUrl = cloudinarySettings.GetValue<string>("CloudinaryUrl");
            _cloudinary = new Cloudinary(cloudinaryUrl);
        }

        public async Task<List<ProductResponseDto>> GetProducts(long? storeId)
        {
            List<Product> products;

            if (storeId == null)
            {
                products = await _productRepository.GetAllProducts();
            }
            else
            {
                products = await _productRepository.GetProductsByStore(storeId.Value);
            }

            return _mapper.Map<List<ProductResponseDto>>(products);
        }

        public async Task<ProductResponseDto> GetProduct(long id)
        {
            Product? product = await _productRepository.GetProductById(id);

            if (product == null)
            {
                throw new ResourceNotFoundException("Product with this id doesn't exist");
            }

            return _mapper.Map<ProductResponseDto>(product);
        }

        public async Task<ProductResponseDto> CreateProduct(long partnerId, CreateProductRequestDto requestDto)
        {
            Product product = _mapper.Map<Product>(requestDto);

            ValidationResult validationResult = _validator.Validate(product);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            Store? store = await _storeRepository.GetStoreById(product.StoreId);

            if (store == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            if (store.PartnerId != partnerId)
            {
                throw new ActionNotAllowedException("Unauthorized to add products to this store. Only the creator can perform this action.");
            }

            product = await _productRepository.CreateProduct(product);

            return _mapper.Map<ProductResponseDto>(product);
        }

        public async Task<ProductResponseDto> UpdateProduct(long id, long partnerId, UpdateProductRequestDto requestDto)
        {
            Product? product = await _productRepository.GetProductById(id);

            if (product == null)
            {
                throw new ResourceNotFoundException("Product with this id doesn't exist");
            }

            if (product.Store.PartnerId != partnerId)
            {
                throw new ActionNotAllowedException("Unauthorized to update this product. Only the creator can perform this action.");
            }

            Product updatedProduct = _mapper.Map<Product>(requestDto);

            ValidationResult validationResult = _validator.Validate(updatedProduct, options =>
            {
                options.IncludeProperties(x => x.Name);
                options.IncludeProperties(x => x.Description);
                options.IncludeProperties(x => x.Price);
                options.IncludeProperties(x => x.Quantity);
            });

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            _mapper.Map(requestDto, product);

            product = await _productRepository.UpdateProduct(product);

            return _mapper.Map<ProductResponseDto>(product);
        }

        public async Task<DeleteEntityResponseDto> DeleteProduct(long id, long partnerId)
        {
            Product? product = await _productRepository.GetProductById(id);

            if (product == null)
            {
                throw new ResourceNotFoundException("Product with this id doesn't exist");
            }

            if (product.Store.PartnerId != partnerId)
            {
                throw new ActionNotAllowedException("Unauthorized to delete this product. Only the creator can perform this action.");
            }

            product.IsDeleted = true;

            await _productRepository.UpdateProduct(product);

            return _mapper.Map<DeleteEntityResponseDto>(product);
        }

        public async Task<ImageResponseDto> UploadImage(long productId, long partnerId, Stream imageStream, string imageName)
        {
            if (imageStream == null || imageStream.Length == 0)
            {
                throw new InvalidImageException("Provided image is invalid. Please ensure that the image has valid content");
            }

            Product? existingProduct = await _productRepository.GetProductById(productId);

            if (existingProduct == null)
            {
                throw new ResourceNotFoundException("Store with this id doesn't exist");
            }

            if (existingProduct.Store.PartnerId != partnerId)
            {
                throw new ActionNotAllowedException("Unauthorized to update this store. Only the creator can perform this action.");
            }

            if (existingProduct.ImagePublicId != null)
            {
                DeletionParams deletionParams = new DeletionParams(existingProduct.ImagePublicId)
                {
                    ResourceType = ResourceType.Image
                };

                await _cloudinary.DestroyAsync(deletionParams);
            }

            ImageUploadParams uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imageName, imageStream),
                Tags = "products"
            };

            ImageUploadResult uploadResult = await _cloudinary.UploadAsync(uploadParams);

            existingProduct.ImagePublicId = uploadResult.PublicId;
            existingProduct.Image = uploadResult.Url.ToString();

            existingProduct = await _productRepository.UpdateProduct(existingProduct);

            return _mapper.Map<ImageResponseDto>(existingProduct);
        }
    }
}
