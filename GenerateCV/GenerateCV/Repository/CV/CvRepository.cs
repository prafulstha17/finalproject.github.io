using GenerateCV.Data;
using GenerateCV.IRepository.CV;
using GenerateCV.Model;
using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.EntityFrameworkCore;

namespace GenerateCV.Repository.CV
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

                        // Header section
                        var header = new Paragraph($"Curriculum Vitae")
                            .SetTextAlignment(TextAlignment.CENTER)
                            .SetFontSize(20)
                            .SetBold()
                            .SetFontColor(ColorConstants.BLUE);
                        document.Add(header);

                        document.Add(new LineSeparator(new SolidLine()));

                        // User details
                        var personalDetails = new Table(2).UseAllAvailableWidth();
                        personalDetails.AddCell(CreateCell("Name:", user.Name));
                        personalDetails.AddCell(CreateCell("Email:", user.Email));
                        personalDetails.AddCell(CreateCell("Phone:", user.Phone));
                        personalDetails.AddCell(CreateCell("Address:", user.Address));
                        personalDetails.AddCell(CreateCell("Date of Birth:", user.DateOfBirth.ToShortDateString()));
                        document.Add(personalDetails);

                        document.Add(new Paragraph("\n").SetMarginBottom(10));

                        // Section: Skills
                        document.Add(CreateSectionHeader("Skills"));
                        foreach (var skill in user.Skills)
                        {
                            document.Add(new Paragraph($"- {skill.Name} (Proficiency: {skill.Proficiency}/5)"));
                        }

                        document.Add(new Paragraph("\n"));

                        // Section: Education
                        document.Add(CreateSectionHeader("Education"));
                        foreach (var edu in user.Education)
                        {
                            document.Add(new Paragraph($"- {edu.Institution}, {edu.Degree} ({edu.StartDate:yyyy} - {edu.EndDate?.ToString("yyyy") ?? "Present"})"));
                        }

                        document.Add(new Paragraph("\n"));

                        // Section: Experience
                        document.Add(CreateSectionHeader("Experience"));
                        foreach (var exp in user.Experiences)
                        {
                            document.Add(new Paragraph($"- {exp.Company} - {exp.Position} ({exp.StartDate:yyyy} - {exp.EndDate?.ToString("yyyy") ?? "Present"})"));
                            document.Add(new Paragraph($"  Responsibilities: {exp.Responsibilities}"));
                        }

                        document.Add(new Paragraph("\n"));

                        // Section: Certifications
                        document.Add(CreateSectionHeader("Certifications"));
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

        private Cell CreateCell(string label, string value)
        {
            var cell = new Cell().Add(new Paragraph($"{label} {value}"))
                .SetBorder(Border.NO_BORDER)
                .SetFontSize(10)
                .SetMarginBottom(5);
            return cell;
        }

        private Paragraph CreateSectionHeader(string title)
        {
            return new Paragraph(title)
                .SetBold()
                .SetFontSize(12)
                .SetFontColor(ColorConstants.BLACK)
                .SetMarginBottom(5);
        }

        public async Task<UserCV> GetCvAsync(string userId)
        {
            return await _context.UserCVs.FirstOrDefaultAsync(cv => cv.UserId == userId);
        }
    }
}
