using GenerateCV.DTO.CreateDto;
using GenerateCV.Model;

namespace GenerateCV.IRepository
{
    public interface ISkillRepository
    {
        Task<IEnumerable<Skill>> GetAllAsync();
        Task<Skill> GetByIdAsync(int id);
        Task<Skill> AddAsync(SkillDTO skillDTO);
        Task<Skill> UpdateAsync(int id ,Skill skill);
        Task<bool> DeleteAsync(int id);
    }
}
