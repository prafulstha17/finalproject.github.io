using GenerateCV.DTO;
using GenerateCV.Model;

namespace GenerateCV.IRepository
{
    public interface ICertificationRepository
    {
        Task<IEnumerable<Certification>> GetAllAsync();
        Task<Certification> GetByIdAsync(int id);
        Task<Certification> AddAsync(CertificationDTO certificationDTO);
        Task<Certification> UpdateAsync(Certification certification);
        Task<bool> DeleteAsync(int id);
    }
}
