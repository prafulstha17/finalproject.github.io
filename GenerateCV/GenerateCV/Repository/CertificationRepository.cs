using GenerateCV.Data;
using GenerateCV.DTO.CreateDto;
using GenerateCV.IRepository;
using GenerateCV.Model;
using Microsoft.EntityFrameworkCore;

namespace GenerateCV.Repository
{
    public class CertificationRepository : ICertificationRepository
    {
        private readonly DataContext _context;

        public CertificationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Certification>> GetAllAsync()
        {
            return await _context.Certifications.Include(c => c.User).ToListAsync();
        }

        public async Task<Certification> GetByIdAsync(int id)
        {
            return await _context.Certifications.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Certification> AddAsync(CertificationDTO certificationDTO)
        {
            var res = new Certification
            {
                UserId = certificationDTO.UserId,
                IssuingOrganization = certificationDTO.IssuingOrganization,
                Title = certificationDTO.Title,
                DateIssued = certificationDTO.DateIssued

            };
            _context.Certifications.Add(res);
            await _context.SaveChangesAsync();
            return res;
            
        }

        public async Task<Certification> UpdateAsync(int id ,CertificationDTO certification)
        {
            
            var existingUser = await _context.Certifications.FindAsync(id);

            if (existingUser == null)
            {
                throw new KeyNotFoundException("User  not found");
            }

            existingUser.Title = certification.Title;
            existingUser.DateIssued = certification.DateIssued; 
            existingUser.IssuingOrganization = certification.IssuingOrganization;


            _context.Certifications.Update(existingUser);
            await _context.SaveChangesAsync();
            return existingUser;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var certification = await _context.Certifications.FindAsync(id);
            if (certification == null) return false;

            _context.Certifications.Remove(certification);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
