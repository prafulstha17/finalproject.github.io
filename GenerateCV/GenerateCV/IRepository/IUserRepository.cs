using GenerateCV.DTO.CreateDto;
using GenerateCV.Model;

namespace GenerateCV.IRepository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetByIdAsync(string id);
        Task<User> AddAsync(userDTO user);
        Task<User> UpdateAsync(userDTO userDto);
        Task<bool> DeleteAsync(string id);
    }
}
