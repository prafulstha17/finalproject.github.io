using System.ComponentModel.DataAnnotations;

namespace GenerateCV.Model
{
    public class User
    {
        
        public string Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string Phone { get; set; }

        [MaxLength(200)]
        public string Address { get; set; }

        public DateTime DateOfBirth { get; set; }

        public List<Education> Education { get; set; }

        public List<Experience> Experiences { get; set; }

        public List<Certification> Certifications { get; set; }

        public List<Skill> Skills { get; set; }




    }
}
