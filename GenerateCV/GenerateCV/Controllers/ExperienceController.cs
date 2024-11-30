using GenerateCV.DTO.CreateDto.CV;
using GenerateCV.IRepository.CV;
using GenerateCV.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GenerateCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly IExperienceRepository _experienceRepository;

        public ExperienceController(IExperienceRepository experienceRepository)
        {
            _experienceRepository = experienceRepository;
        }

        // GET: api/Experience
        [HttpGet]
        public async Task<ActionResult<BaseResponseModel<IEnumerable<Experience>>>> GetAllExperiences()
        {
            var experiences = await _experienceRepository.GetAllAsync();
            return Ok(new BaseResponseModel<IEnumerable<Experience>>
            {
                Code = "200",
                Message = "Experiences retrieved successfully",
                Status = "Success",
                Data = experiences
            });
        }

        // GET: api/Experience/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseModel<Experience>>> GetExperienceById(String id)
        {
            var experience = await _experienceRepository.GetByIdAsync(id);
            if (experience == null)
            {
                return NotFound(new BaseResponseModel<Experience>
                {
                    Code = "404",
                    Message = "Experience not found",
                    Status = "Error",
                    Data = null
                });
            }

            return Ok(new BaseResponseModel<Experience>
            {
                Code = "200",
                Message = "Experience retrieved successfully",
                Status = "Success",
                Data = experience
            });
        }

        // POST: api/Experience
        [HttpPost]
        public async Task<ActionResult<BaseResponseModel<Experience>>> CreateExperience(ExperienceDTO experienceDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new BaseResponseModel<Experience>
                {
                    Code = "400",
                    Message = "Invalid data",
                    Status = "Error",
                    Data = null
                });
            }

            var createdExperience = await _experienceRepository.AddAsync(experienceDTO);
            return CreatedAtAction(nameof(GetExperienceById), new { id = createdExperience.Id }, new BaseResponseModel<Experience>
            {
                Code = "201",
                Message = "Experience created successfully",
                Status = "Success",
                Data = createdExperience
            });
        }

        // PUT: api/Experience/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponseModel<Experience>>> UpdateExperience(int id, Experience experience)
        {
            if (id != experience.Id)
            {
                return BadRequest(new BaseResponseModel<Experience>
                {
                    Code = "400",
                    Message = "Experience ID mismatch",
                    Status = "Error",
                    Data = null
                });
            }

            var updatedExperience = await _experienceRepository.UpdateAsync(experience);
            return Ok(new BaseResponseModel<Experience>
            {
                Code = "200",
                Message = "Experience updated successfully",
                Status = "Success",
                Data = updatedExperience
            });
        }

        // DELETE: api/Experience/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponseModel<bool>>> DeleteExperience(int id)
        {
            var result = await _experienceRepository.DeleteAsync(id);
            if (!result)
            {
                return NotFound(new BaseResponseModel<bool>
                {
                    Code = "404",
                    Message = "Experience not found",
                    Status = "Error",
                    Data = false
                });
            }

            return Ok(new BaseResponseModel<bool>
            {
                Code = "200",
                Message = "Experience deleted successfully",
                Status = "Success",
                Data = true
            });
        }
    }
}
