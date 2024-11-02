using GenerateCV.DTO;
using GenerateCV.Model;

namespace GenerateCV.IRepository
{
    public interface ISkillRepository
    {
        Task<IEnumerable<Skill>> GetAllAsync();
        Task<Skill> GetByIdAsync(int id);
        Task<Skill> AddAsync(SkillDTO skillDTO);
        Task<Skill> UpdateAsync(Skill skill);
        Task<bool> DeleteAsync(int id);
    }
}
