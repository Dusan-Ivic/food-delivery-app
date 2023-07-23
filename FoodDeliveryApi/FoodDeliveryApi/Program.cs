using AutoMapper;
using FluentValidation;
using FoodDeliveryApi.Data;
using FoodDeliveryApi.Interfaces.Repositories;
using FoodDeliveryApi.Interfaces.Services;
using FoodDeliveryApi.Mapping;
using FoodDeliveryApi.Models;
using FoodDeliveryApi.Repositories;
using FoodDeliveryApi.Services;
using FoodDeliveryApi.Validators;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IValidator<Admin>, AdminValidator>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IValidator<User>, UserValidator>();

builder.Services.AddDbContext<FoodDeliveryDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("FoodDeliveryDbConnectionString")));

MapperConfiguration mapperConfig = new MapperConfiguration(config =>
{
    config.AddProfile(new AdminProfile());
    config.AddProfile(new AuthProfile());
});

builder.Services.AddSingleton(mapperConfig.CreateMapper());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
