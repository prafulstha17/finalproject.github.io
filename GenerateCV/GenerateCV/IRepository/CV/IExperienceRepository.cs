using GenerateCV.DTO.CreateDto.CV;
using GenerateCV.Model;

namespace GenerateCV.IRepository.CV
{
    public interface IExperienceRepository
    {
        Task<IEnumerable<Experience>> GetAllAsync();
        Task<Experience> GetByIdAsync(string id);
        Task<Experience> AddAsync(ExperienceDTO experienceDTO);
        Task<Experience> UpdateAsync(Experience experience);
        Task<bool> DeleteAsync(int id);
    }
}
