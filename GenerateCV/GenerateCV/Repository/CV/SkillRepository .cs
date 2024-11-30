using GenerateCV.Data;
using GenerateCV.DTO.CreateDto.CV;
using GenerateCV.IRepository.CV;
using GenerateCV.Model;
using Microsoft.EntityFrameworkCore;

namespace GenerateCV.Repository.CV
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

        public async Task<Skill> UpdateAsync(int id, Skill skill)
        {
            var existingUser = await _context.Skills.FindAsync(id);

            if (existingUser == null)

            {

                // Handle the case where the user does not exist

                throw new KeyNotFoundException("User  not found");

            }
            existingUser.Proficiency = skill.Proficiency;
            existingUser.Name = skill.Name;



            _context.Skills.Update(existingUser);
            await _context.SaveChangesAsync();
            return existingUser;

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
