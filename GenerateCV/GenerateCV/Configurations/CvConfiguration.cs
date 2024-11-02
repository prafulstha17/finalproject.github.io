//using GenerateCV.Model;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;
//using Microsoft.EntityFrameworkCore;
//using CvGenerator.Models;

//namespace GenerateCV.Configurations
//{

//    public class CvConfiguration : IEntityTypeConfiguration<Cv>
//    {
//        public void Configure(EntityTypeBuilder<Cv> builder)
//        {
//            builder.HasKey(e => e.Id);

//            builder.Property(e => e.Summary)
//                .HasMaxLength(1000);

//            builder.HasOne(c => c.User)
//                .WithOne()
//                .HasForeignKey<Cv>(c => c.UserId);

//            builder.HasMany(c => c.Experiences)
//                .WithOne(e => e.Cv)
//                .HasForeignKey(e => e.CvId);

//            builder.HasMany(c => c.Educations)
//                .WithOne(e => e.Cv)
//                .HasForeignKey(e => e.CvId);

//            builder.HasMany(c => c.Skills)
//                .WithOne(s => s.Cv)
//                .HasForeignKey(s => s.CvId);

//            builder.HasMany(c => c.Certifications)
//                .WithOne(cert => cert.Cv)
//                .HasForeignKey(cert => cert.CvId);
//        }
//    }
//}
