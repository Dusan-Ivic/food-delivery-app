using AutoMapper;
using FluentValidation;
using FoodDeliveryServer.Data.Contexts;
using FoodDeliveryServer.Data.Interfaces;
using FoodDeliveryServer.Core.Mapping;
using FoodDeliveryServer.Data.Models;
using FoodDeliveryServer.Data.Repositories;
using FoodDeliveryServer.Core.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Npgsql;
using Stripe;
using System.Text;
using Customer = FoodDeliveryServer.Data.Models.Customer;
using CustomerService = FoodDeliveryServer.Core.Services.CustomerService;
using Product = FoodDeliveryServer.Data.Models.Product;
using ProductService = FoodDeliveryServer.Core.Services.ProductService;
using FoodDeliveryServer.Core.Interfaces;
using FoodDeliveryServer.Core.Services;
using FoodDeliveryServer.Api.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "FoodDeliveryServer.Api", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme()
            {
                Reference = new OpenApiReference()
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWTSettings:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:SecretKey"]))
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowClientApplication", corsBuilder =>
    {
        var clientDomain = builder.Configuration["ClientSettings:ClientDomain"];

        corsBuilder
            .WithOrigins(clientDomain)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("VerifiedPartner", policy => policy.RequireClaim("Status", "Accepted"));
});

builder.Services.AddTransient<ExceptionMiddleware>();

builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IValidator<Admin>, AdminValidator>();

builder.Services.AddScoped<IPartnerService, PartnerService>();
builder.Services.AddScoped<IPartnerRepository, PartnerRepository>();
builder.Services.AddScoped<IValidator<Partner>, PartnerValidator>();

builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IValidator<Customer>, CustomerValidator>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IValidator<User>, UserValidator>();

builder.Services.AddScoped<IStoreService, StoreService>();
builder.Services.AddScoped<IStoreRepository, StoreRepository>();
builder.Services.AddScoped<IValidator<Store>, StoreValidator>();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IValidator<Product>, ProductValidator>();

builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IValidator<Order>, OrderValidator>();

builder.Services.AddScoped<IStripeService, StripeService>();

builder.Services.AddDbContext<FoodDeliveryDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("FoodDeliveryDbConnectionString"), npgsqlOptionsAction: options => options.UseNetTopologySuite()));

MapperConfiguration mapperConfig = new MapperConfiguration(config =>
{
    config.AddProfile(new AdminProfile());
    config.AddProfile(new PartnerProfile());
    config.AddProfile(new CustomerProfile());
    config.AddProfile(new AuthProfile());
    config.AddProfile(new StoreProfile());
    config.AddProfile(new ProductProfile());
    config.AddProfile(new OrderProfile());
    config.AddProfile(new CoordinateProfile());
});

builder.Services.AddSingleton(mapperConfig.CreateMapper());

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<FoodDeliveryDbContext>();
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

StripeConfiguration.ApiKey = builder.Configuration["StripeSettings:SecretKey"];

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();
app.UseCors("AllowClientApplication");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
