using GenerateCV.Model;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace GenerateCV.Configurations
{
 
        public class UserConfiguration : IEntityTypeConfiguration<User>
        {
            public void Configure(EntityTypeBuilder<User> builder)
            {
                

                builder.Property(u => u.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                builder.Property(u => u.Email)
                    .IsRequired()
                    .HasMaxLength(100);

                builder.Property(u => u.Phone)
                    .HasMaxLength(20);

                builder.Property(u => u.Address)
                    .HasMaxLength(200);

                builder.Property(u => u.DateOfBirth)
                    .IsRequired();
            }
        }
    
}
