using System.ComponentModel.DataAnnotations;

namespace GenerateCV.DTO.CreateDto.CV
{
    public class SkillDTO
    {
        public string UserId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Range(1, 5)]
        public int Proficiency { get; set; } // 1 = Beginner, 5 = Expert
    }
}
