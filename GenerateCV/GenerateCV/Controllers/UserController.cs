using GenerateCV.DTO.CreateDto.CV;
using GenerateCV.IRepository.CV;
using GenerateCV.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GenerateCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/User
        [HttpGet ("GetUsers")]
        public async Task<ActionResult<BaseResponseModel<IEnumerable<User>>>> GetAllUsers()
        {
            var users = await _userRepository.GetAllAsync();
            return Ok(new BaseResponseModel<IEnumerable<User>>
            {
                Code = "200",
                Message = "Users retrieved successfully",
                Status = "Success",
                Data = users
            });
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseModel<User>>> GetUserById(string id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound(new BaseResponseModel<User>
                {
                    Code = "404",
                    Message = "User not found",
                    Status = "Error",
                    Data = null
                });
            }

            return Ok(new BaseResponseModel<User>
            {
                Code = "200",
                Message = "User retrieved successfully",
                Status = "Success",
                Data = user
            });
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<BaseResponseModel<User>>> CreateUser(userDTO userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new BaseResponseModel<User>
                {
                    Code = "400",
                    Message = "Invalid data",
                    Status = "Error",
                    Data = null
                });
            }

            var createdUser = await _userRepository.AddAsync(userDto);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, new BaseResponseModel<User>
            {
                Code = "201",
                Message = "User created successfully",
                Status = "Success",
                Data = createdUser
            });
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponseModel<User>>> UpdateUser(string id, userDTO user)
        {
            if (id != user.Id)
            {
                return BadRequest(new BaseResponseModel<User>
                {
                    Code = "400",
                    Message = "User ID mismatch",
                    Status = "Error",
                    Data = null
                });
            }

            var updatedUser = await _userRepository.UpdateAsync(user);
            return Ok(new BaseResponseModel<User>
            {
                Code = "200",
                Message = "User updated successfully",
                Status = "Success",
                Data = updatedUser
            });
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponseModel<bool>>> DeleteUser(string id)
        {
            var result = await _userRepository.DeleteAsync(id);
            if (!result)
            {
                return NotFound(new BaseResponseModel<bool>
                {
                    Code = "404",
                    Message = "User not found",
                    Status = "Error",
                    Data = false
                });
            }

            return Ok(new BaseResponseModel<bool>
            {
                Code = "200",
                Message = "User deleted successfully",
                Status = "Success",
                Data = true
            });
        }
    }
}
