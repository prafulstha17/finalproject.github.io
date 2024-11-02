using GenerateCV.Data;
using GenerateCV.DTO;
using GenerateCV.IRepository;
using GenerateCV.Model;
using Microsoft.EntityFrameworkCore;

namespace GenerateCV.Repository
{
    public class SkillRepository : ISkillRepository
    {
        private readonly DataContext _context;

        public SkillRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Skill>> GetAllAsync()
        {
            return await _context.Skills.Include(s => s.User).ToListAsync();
        }

        public async Task<Skill> GetByIdAsync(int id)
        {
            return await _context.Skills.Include(s => s.User).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Skill> AddAsync(SkillDTO skillDTO)
        {
            var res = new Skill
            {
                UserId = skillDTO.UserId,
                Name = skillDTO.Name,
                Proficiency = skillDTO.Proficiency,
              
            };
            _context.Skills.Add(res);
            await _context.SaveChangesAsync();
            return res;
        }

        public async Task<Skill> UpdateAsync(Skill skill)
        {
            _context.Skills.Update(skill);
            await _context.SaveChangesAsync();
            return skill;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null) return false;

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
