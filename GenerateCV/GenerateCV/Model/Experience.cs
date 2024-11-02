using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GenerateCV.Model
{
    public class Experience
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; } 

        public User User { get; set; }

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
