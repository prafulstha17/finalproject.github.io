using GenerateCV.Data;
using GenerateCV.IRepository;
using GenerateCV.Model;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using Microsoft.EntityFrameworkCore;

namespace GenerateCV.Repository
{
    public class CvRepository : ICvRepository
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;

        public CvRepository(DataContext context, IUserRepository userRepository)
        {
            _context = context;
            _userRepository = userRepository;
        }

        public async Task<bool> GenerateAndSaveCvAsync(string userId)
        {
            // Fetch user data using the UserRepository
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return false;

            // Check if CV already exists for the user and delete if found
            var existingCv = await _context.UserCVs.FirstOrDefaultAsync(cv => cv.UserId == userId);
            if (existingCv != null)
            {
                _context.UserCVs.Remove(existingCv);
            }

            // Generate PDF
            byte[] pdfData;
            using (var ms = new MemoryStream())
            {
                using (var writer = new PdfWriter(ms))
                {
                    using (var pdf = new PdfDocument(writer))
                    {
                        var document = new Document(pdf);

                        // Add user details
                        document.Add(new Paragraph($"Name: {user.Name}"));
                        document.Add(new Paragraph($"Email: {user.Email}"));
                        document.Add(new Paragraph($"Phone: {user.Phone}"));
                        document.Add(new Paragraph($"Address: {user.Address}"));
                        document.Add(new Paragraph($"Date of Birth: {user.DateOfBirth.ToShortDateString()}"));

                        // Add user skills
                        document.Add(new Paragraph("\nSkills:"));
                        foreach (var skill in user.Skills)
                        {
                            document.Add(new Paragraph($"- {skill.Name} (Proficiency: {skill.Proficiency}/5)"));
                        }

                        // Add education details
                        document.Add(new Paragraph("\nEducation:"));
                        foreach (var edu in user.Education)
                        {
                            document.Add(new Paragraph($"- {edu.Institution}, {edu.Degree} ({edu.StartDate:yyyy} - {edu.EndDate?.ToString("yyyy") ?? "Present"})"));
                        }

                        // Add experience details
                        document.Add(new Paragraph("\nExperience:"));
                        foreach (var exp in user.Experiences)
                        {
                            document.Add(new Paragraph($"- {exp.Company} - {exp.Position} ({exp.StartDate:yyyy} - {exp.EndDate?.ToString("yyyy") ?? "Present"})"));
                            document.Add(new Paragraph($"  Responsibilities: {exp.Responsibilities}"));
                        }

                        // Add certifications
                        document.Add(new Paragraph("\nCertifications:"));
                        foreach (var cert in user.Certifications)
                        {
                            document.Add(new Paragraph($"- {cert.Title} ({cert.DateIssued:yyyy}) - Issued by {cert.IssuingOrganization}"));
                        }
                    }
                }
                pdfData = ms.ToArray();
            }

            // Save PDF to database
            var userCv = new UserCV
            {
                UserId = userId,
                PdfData = pdfData
            };

            _context.UserCVs.Add(userCv);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UserCV> GetCvAsync(string userId)
        {
            return await _context.UserCVs.FirstOrDefaultAsync(cv => cv.UserId == userId);
        }
    }
}
