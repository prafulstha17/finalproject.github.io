using GenerateCV.DTO.CreateDto.CV;
using GenerateCV.Model;

namespace GenerateCV.IRepository.CV
{
    public interface ICertificationRepository
    {
        Task<IEnumerable<Certification>> GetAllAsync();
        Task<Certification> GetByIdAsync(int id);
        Task<Certification> AddAsync(CertificationDTO certificationDTO);
        Task<Certification> UpdateAsync(int id, CertificationDTO certification);
        Task<bool> DeleteAsync(int id);
    }
}
