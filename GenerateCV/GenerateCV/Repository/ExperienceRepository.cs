using GenerateCV.Data;
using GenerateCV.DTO.CreateDto;
using GenerateCV.IRepository;
using GenerateCV.Model;
using Microsoft.EntityFrameworkCore;

namespace GenerateCV.Repository
{
    public class ExperienceRepository : IExperienceRepository
    {
        private readonly DataContext _context;

        public ExperienceRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Experience>> GetAllAsync()
        {
            return await _context.Experiences.Include(e => e.User).ToListAsync();
        }

        public async Task<Experience> GetByIdAsync(String id)
        {
            return await _context.Experiences.Include(e => e.User).FirstOrDefaultAsync(e => e.UserId == id);
        }

        public async Task<Experience> AddAsync(ExperienceDTO experienceDTO)
        {
            var res = new Experience
            {
                UserId = experienceDTO.UserId,
                Company = experienceDTO.Company,
                Position = experienceDTO.Position,
                Responsibilities = experienceDTO.Responsibilities,
                StartDate = experienceDTO.StartDate,
                EndDate = experienceDTO.EndDate,
                IsCurrent = experienceDTO.IsCurrent,
                
            };
            _context.Experiences.Add(res);
            await _context.SaveChangesAsync();
            return res;
        }

        public async Task<Experience> UpdateAsync(Experience experience)
        {
            _context.Experiences.Update(experience);
            await _context.SaveChangesAsync();
            return experience;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var experience = await _context.Experiences.FindAsync(id);
            if (experience == null) return false;

            _context.Experiences.Remove(experience);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
