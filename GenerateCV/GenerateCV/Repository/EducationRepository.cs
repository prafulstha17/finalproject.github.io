using GenerateCV.Data;
using GenerateCV.DTO.CreateDto;
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

        public async Task<Education> UpdateAsync(int id ,EducationDTO education)
        {
            var existingUser = await _context.Educations.FindAsync(id);

            if (existingUser == null)

            {

                // Handle the case where the user does not exist

                throw new KeyNotFoundException("User  not found");

            }
            existingUser.Institution = education.Institution;
            existingUser.Degree = education.Degree;
            existingUser.StartDate = education.StartDate;
            existingUser.EndDate = education.EndDate;



            _context.Educations.Update(existingUser);
            await _context.SaveChangesAsync();
            return existingUser;
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
