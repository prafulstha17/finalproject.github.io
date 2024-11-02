using GenerateCV.DTO;
using GenerateCV.Model;

namespace GenerateCV.IRepository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetByIdAsync(string id);
        Task<User> AddAsync(userDTO user);
        Task<User> UpdateAsync(User user);
        Task<bool> DeleteAsync(string id);
    }
}
