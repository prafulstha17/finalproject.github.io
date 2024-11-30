using GenerateCV.DTO.CreateDto.CV;
using GenerateCV.Model;

namespace GenerateCV.IRepository.CV
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
