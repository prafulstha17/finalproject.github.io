using GenerateCV.Data;
using GenerateCV.DTO;
using GenerateCV.IRepository;
using GenerateCV.Model;
using Microsoft.EntityFrameworkCore;

namespace GenerateCV.Repository
{
    public class EducationRepository : IEducationRepository
    {
        private readonly DataContext _context;

        public EducationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Education>> GetAllAsync()
        {
            return await _context.Educations.Include(e => e.User).ToListAsync();
        }

        public async Task<Education> GetByIdAsync(int id)
        {
            return await _context.Educations.Include(e => e.User).FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Education> AddAsync(EducationDTO educationDTO)
        {
            var res = new Education
            {
               UserId = educationDTO.UserId,
               Institution = educationDTO.Institution,
               Degree = educationDTO.Degree,
               StartDate = educationDTO.StartDate,
               EndDate = educationDTO.EndDate,
               IsCurrent = educationDTO.IsCurrent,
            };
            _context.Educations.Add(res);
            await _context.SaveChangesAsync();
            return res;
        }

        public async Task<Education> UpdateAsync(Education education)
        {
            _context.Educations.Update(education);
            await _context.SaveChangesAsync();
            return education;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var education = await _context.Educations.FindAsync(id);
            if (education == null) return false;

            _context.Educations.Remove(education);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
