using System.ComponentModel.DataAnnotations;

namespace GenerateCV.DTO.CreateDto
{
    public class userDTO
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
    }
}
