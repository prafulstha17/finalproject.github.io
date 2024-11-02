using GenerateCV.Model;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace GenerateCV.Configurations
{
    public class ExperienceConfiguration : IEntityTypeConfiguration<Experience>
    {
        public void Configure(EntityTypeBuilder<Experience> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.Company)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(e => e.Position)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(e => e.StartDate)
                .IsRequired();

            builder.Property(e => e.Responsibilities)
                .HasMaxLength(1000);

            builder.Property(e => e.IsCurrent)
                .HasDefaultValue(false);
        }
    }
}
