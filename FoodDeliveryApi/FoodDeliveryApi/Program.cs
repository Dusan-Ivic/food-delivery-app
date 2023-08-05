using AutoMapper;
using FluentValidation;
using FoodDeliveryApi.Data;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Mapping;
using FoodDeliveryApi.Middleware;
using FoodDeliveryApi.Models;
using FoodDeliveryApi.Repositories;
using FoodDeliveryApi.Services;
using FoodDeliveryApi.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "FoodDeliveryApi", Version = "v1" });

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
        ValidIssuer = builder.Configuration["JWTSettings:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:SecretKey"]))
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: builder.Configuration["CorsSettings:Name"], corsBuilder =>
    {
        var clientSettings = builder.Configuration.GetSection("ClientSettings");
        var clientAddress = clientSettings.GetValue<string>("Address");
        var clientPort = clientSettings.GetValue<int>("Port");

        corsBuilder
            .WithOrigins($"{clientAddress}:{clientPort}")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("VerifiedPartner", policy => policy.RequireClaim("Status", "Accepted"));
});

builder.Services.AddSingleton<IAuthorizationMiddlewareResultHandler, CustomAuthMiddlewareResultHandler>();

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

builder.Services.AddDbContext<FoodDeliveryDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("FoodDeliveryDbConnectionString")));

MapperConfiguration mapperConfig = new MapperConfiguration(config =>
{
    config.AddProfile(new AdminProfile());
    config.AddProfile(new PartnerProfile());
    config.AddProfile(new CustomerProfile());
    config.AddProfile(new AuthProfile());
    config.AddProfile(new StoreProfile());
    config.AddProfile(new ProductProfile());
    config.AddProfile(new OrderProfile());
});

builder.Services.AddSingleton(mapperConfig.CreateMapper());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseFileServer(new FileServerOptions()
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), builder.Configuration["FileServerSettings:FolderName"])),
    RequestPath = $"/{builder.Configuration["FileServerSettings:FolderName"]}",
    EnableDefaultFiles = true,
    EnableDirectoryBrowsing = true,
});

app.UseHttpsRedirection();
app.UseCors(builder.Configuration["CorsSettings:Name"]);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
