using GenerateCV.Data;
using GenerateCV.DTO.CreateDto.CV;
using GenerateCV.IRepository.CV;
using GenerateCV.Model;
using Microsoft.EntityFrameworkCore;
using System;

namespace GenerateCV.Repository.CV
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

        public async Task<User> UpdateAsync(userDTO userDto)
        {
            var existingUser = await _context.Users.FindAsync(userDto.Id);

            if (existingUser == null)

            {

                // Handle the case where the user does not exist

                throw new KeyNotFoundException("User  not found");

            }
            existingUser.Name = userDto.Name;

            existingUser.Email = userDto.Email;

            existingUser.Phone = userDto.Phone;

            existingUser.Address = userDto.Address;

            existingUser.DateOfBirth = userDto.DateOfBirth;


            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();
            return existingUser;
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
