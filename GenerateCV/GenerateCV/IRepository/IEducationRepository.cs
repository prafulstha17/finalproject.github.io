using GenerateCV.DTO.CreateDto;
using GenerateCV.Model;

namespace GenerateCV.IRepository
{
    public interface IEducationRepository
    {
        Task<IEnumerable<Education>> GetAllAsync();
        Task<Education> GetByIdAsync(int id);
        Task<Education> AddAsync(EducationDTO educationDTO);
        Task<Education> UpdateAsync(int id ,EducationDTO education);
        Task<bool> DeleteAsync(int id);
    }
}
