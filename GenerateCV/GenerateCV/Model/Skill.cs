
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GenerateCV.Model
{
    public class Skill
    {
        [Key]
        public int Id { get; set; }


        public string UserId { get; set; }
        public User User { get; set; }
        //public int CvId { get; set; }

        //[JsonIgnore]
        //public Cv Cv { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Range(1, 5)]
        public int Proficiency { get; set; } // 1 = Beginner, 5 = Expert
    }
}
