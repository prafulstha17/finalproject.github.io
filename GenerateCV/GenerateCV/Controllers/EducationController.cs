using GenerateCV.DTO;
using GenerateCV.IRepository;
using GenerateCV.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GenerateCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationController : ControllerBase
    {
        private readonly IEducationRepository _educationRepository;

        public EducationController(IEducationRepository educationRepository)
        {
            _educationRepository = educationRepository;
        }

        // GET: api/Education
        [HttpGet]
        public async Task<ActionResult<BaseResponseModel<IEnumerable<Education>>>> GetAllEducations()
        {
            var educations = await _educationRepository.GetAllAsync();
            return Ok(new BaseResponseModel<IEnumerable<Education>>
            {
                Code = "200",
                Message = "Education records retrieved successfully",
                Status = "Success",
                Data = educations
            });
        }

        // GET: api/Education/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseModel<Education>>> GetEducationById(int id)
        {
            var education = await _educationRepository.GetByIdAsync(id);
            if (education == null)
            {
                return NotFound(new BaseResponseModel<Education>
                {
                    Code = "404",
                    Message = "Education record not found",
                    Status = "Error",
                    Data = null
                });
            }

            return Ok(new BaseResponseModel<Education>
            {
                Code = "200",
                Message = "Education record retrieved successfully",
                Status = "Success",
                Data = education
            });
        }

        // POST: api/Education
        [HttpPost]
        public async Task<ActionResult<BaseResponseModel<Education>>> CreateEducation(EducationDTO educationDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new BaseResponseModel<Education>
                {
                    Code = "400",
                    Message = "Invalid data",
                    Status = "Error",
                    Data = null
                });
            }

            var createdEducation = await _educationRepository.AddAsync(educationDTO);
            return CreatedAtAction(nameof(GetEducationById), new { id = createdEducation.Id }, new BaseResponseModel<Education>
            {
                Code = "201",
                Message = "Education record created successfully",
                Status = "Success",
                Data = createdEducation
            });
        }

        // PUT: api/Education/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponseModel<Education>>> UpdateEducation(int id, Education education)
        {
            if (id != education.Id)
            {
                return BadRequest(new BaseResponseModel<Education>
                {
                    Code = "400",
                    Message = "Education ID mismatch",
                    Status = "Error",
                    Data = null
                });
            }

            var updatedEducation = await _educationRepository.UpdateAsync(education);
            return Ok(new BaseResponseModel<Education>
            {
                Code = "200",
                Message = "Education record updated successfully",
                Status = "Success",
                Data = updatedEducation
            });
        }

        // DELETE: api/Education/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponseModel<bool>>> DeleteEducation(int id)
        {
            var result = await _educationRepository.DeleteAsync(id);
            if (!result)
            {
                return NotFound(new BaseResponseModel<bool>
                {
                    Code = "404",
                    Message = "Education record not found",
                    Status = "Error",
                    Data = false
                });
            }

            return Ok(new BaseResponseModel<bool>
            {
                Code = "200",
                Message = "Education record deleted successfully",
                Status = "Success",
                Data = true
            });
        }
    }
}
