FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /src
COPY ["FoodDeliveryServer.Api/FoodDeliveryServer.Api.csproj", "FoodDeliveryServer.Api/"]
COPY ["FoodDeliveryServer.Common/FoodDeliveryServer.Common.csproj", "FoodDeliveryServer.Common/"]
COPY ["FoodDeliveryServer.Core/FoodDeliveryServer.Core.csproj", "FoodDeliveryServer.Core/"]
COPY ["FoodDeliveryServer.Data/FoodDeliveryServer.Data.csproj", "FoodDeliveryServer.Data/"]

RUN dotnet restore "FoodDeliveryServer.Api/FoodDeliveryServer.Api.csproj"
COPY . .

WORKDIR "/src/FoodDeliveryServer.Api"
RUN dotnet build "FoodDeliveryServer.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FoodDeliveryServer.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FoodDeliveryServer.Api.dll"]