using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using FoodDeliveryApi.Dto.Auth;
using FoodDeliveryApi.Dto.Product;
using FoodDeliveryApi.Exceptions;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Models;
using FoodDeliveryApi.Repositories;

namespace FoodDeliveryApi.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IStoreRepository _storeRepository;
        private readonly IValidator<Product> _validator;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IStoreRepository storeRepository, IValidator<Product> validator, IMapper mapper)
        {
            _productRepository = productRepository;
            _storeRepository = storeRepository;
            _validator = validator;
            _mapper = mapper;
        }

        public async Task<List<GetProductResponseDto>> GetProducts(long? storeId)
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

            return _mapper.Map<List<GetProductResponseDto>>(products);
        }

        public async Task<GetProductResponseDto> GetProduct(long id)
        {
            Product? product = await _productRepository.GetProductById(id);

            if (product == null)
            {
                throw new ResourceNotFoundException("Product with this id doesn't exist");
            }

            return _mapper.Map<GetProductResponseDto>(product);
        }

        public async Task<CreateProductResponseDto> CreateProduct(long partnerId, CreateProductRequestDto requestDto)
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

            try
            {
                product = await _productRepository.CreateProduct(product);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<CreateProductResponseDto>(product);
        }

        public async Task<UpdateProductResponseDto> UpdateProduct(long id, long partnerId, UpdateProductRequestDto requestDto)
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

            try
            {
                _mapper.Map(requestDto, product);
                product = await _productRepository.UpdateProduct(product);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<UpdateProductResponseDto>(product);
        }

        public async Task<DeleteProductResponseDto> DeleteProduct(long id, long partnerId)
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

            try
            {
                await _productRepository.UpdateProduct(product);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<DeleteProductResponseDto>(product);
        }

        public async Task<ImageResponseDto> UploadImage(long productId, long partnerId, IFormFile image)
        {
            if (image == null || image.Length == 0)
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

            using var memoryStream = new MemoryStream();
            image.CopyTo(memoryStream);

            byte[] imageData = memoryStream.ToArray();

            //existingProduct.ImageData = imageData;

            try
            {
                existingProduct = await _productRepository.UpdateProduct(existingProduct);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<ImageResponseDto>(existingProduct);
        }
    }
}
