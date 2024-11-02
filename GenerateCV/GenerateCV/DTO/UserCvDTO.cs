namespace GenerateCV.DTO
{
    public class UserCvDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public List<SkillDTO> Skills { get; set; }
        public List<EducationDTO> Education { get; set; }
        public List<ExperienceDTO> Experiences { get; set; }
        public List<CertificationDTO> Certifications { get; set; }
    }

    // DTO for storing the PDF data in the database
    public class UserCvStorageDTO
    {
        public string UserId { get; set; }
        public byte[] PdfData { get; set; }
    }
}
