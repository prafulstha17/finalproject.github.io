using GenerateCV.Model;

namespace GenerateCV.IRepository.CV
{
    public interface ICvRepository
    {
        Task<bool> GenerateAndSaveCvAsync(string userId);
        Task<UserCV> GetCvAsync(string userId);
    }
}
