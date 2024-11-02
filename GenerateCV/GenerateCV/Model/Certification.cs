using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GenerateCV.Model
{
    public class Certification
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        //public int CvId { get; set; }

        //[JsonIgnore]
        //public Cv Cv { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        public DateTime DateIssued { get; set; }

        [MaxLength(100)]
        public string IssuingOrganization { get; set; }
    }
}
