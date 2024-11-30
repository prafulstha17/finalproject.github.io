using System.ComponentModel.DataAnnotations;

namespace GenerateCV.DTO.CreateDto.CV
{
    public class ExperienceDTO
    {
        public string UserId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Company { get; set; }

        [Required]
        [MaxLength(100)]
        public string Position { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsCurrent { get; set; }

        [MaxLength(1000)]
        public string Responsibilities { get; set; }

    }
}
