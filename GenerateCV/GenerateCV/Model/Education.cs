using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GenerateCV.Model
{
    public class Education
    {

        [Key]
        public int Id { get; set; }

        public string UserId { get; set; } 

        public User User { get; set; }

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
