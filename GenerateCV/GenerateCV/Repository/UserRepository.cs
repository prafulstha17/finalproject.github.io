using GenerateCV.Data;
using GenerateCV.DTO;
using GenerateCV.IRepository;
using GenerateCV.Model;
using Microsoft.EntityFrameworkCore;
using System;

namespace GenerateCV.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetByIdAsync(string id)
        {
            return await _context.Users
                .Include(u => u.Education)
                .Include(u => u.Experiences)
                .Include(u => u.Certifications)
                .Include(u => u.Skills)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> AddAsync(userDTO userdto)
        {

            var user = new User
            {
                Id = userdto.Id,
                Name = userdto.Name,
                Email = userdto.Email,
                Address = userdto.Address,
                DateOfBirth = userdto.DateOfBirth,
                Phone = userdto.Phone,
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
