using System.ComponentModel.DataAnnotations;

namespace GenerateCV.DTO
{
    public class EducationDTO
    {
        public string UserId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Institution { get; set; }

        [Required]
        [MaxLength(100)]
        public string Degree { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsCurrent { get; set; }

    }
}
