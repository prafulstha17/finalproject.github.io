using System.ComponentModel.DataAnnotations;

namespace GenerateCV.Model
{
    public class UserCV
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public byte[] PdfData { get; set; }
    }
}
