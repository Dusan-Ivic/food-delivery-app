using FoodDeliveryApi.Enums;
using FoodDeliveryApi.Models;

namespace FoodDeliveryApi.Interfaces.Repositories
{
    public interface IPartnerRepository
    {
        public Task<bool> IsEmailTaken(string email);
        public Task<bool> IsUsernameTaken(string username);
        public Task<List<Partner>> GetAllPartners();
        public Task<List<Partner>> GetPartnersByStatus(PartnerStatus status);
        public Task<Partner?> GetPartnerById(long id);
        public Task<Partner> RegisterPartner(Partner partner);
        public Task<Partner> UpdatePartner(Partner partner);
    }
}
