using GenerateCV.DTO.CreateDto;
using GenerateCV.Model;

namespace GenerateCV.IRepository
{
    public interface IExperienceRepository
    {
        Task<IEnumerable<Experience>> GetAllAsync();
        Task<Experience> GetByIdAsync(String id);
        Task<Experience> AddAsync(ExperienceDTO experienceDTO);
        Task<Experience> UpdateAsync(Experience experience);
        Task<bool> DeleteAsync(int id);
    }
}
