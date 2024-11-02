using System.ComponentModel.DataAnnotations;

namespace GenerateCV.DTO
{
    public class CertificationDTO
    {
        public string UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        public DateTime DateIssued { get; set; }

        [MaxLength(100)]
        public string IssuingOrganization { get; set; }
    }
}
