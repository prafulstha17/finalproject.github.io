//// Cv.cs
//using GenerateCV.Model;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;

//namespace CvGenerator.Models
//{
//    public class Cv
//    {
//        [Key]
//        public int Id { get; set; }

//        public int UserId { get; set; }
//        public User User { get; set; }

//        public List<Experience> Experiences { get; set; }
//        public List<Education> Educations { get; set; }
//        public List<Skill> Skills { get; set; }
//        public List<Certification> Certifications { get; set; }

//        public string Summary { get; set; }

//        // Add this property to store the PDF as a byte array
//        public byte[] ? CvPdf { get; set; }
//    }
//}
