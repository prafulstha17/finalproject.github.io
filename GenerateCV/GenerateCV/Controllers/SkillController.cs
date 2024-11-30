using GenerateCV.DTO.CreateDto.CV;
using GenerateCV.IRepository.CV;
using GenerateCV.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GenerateCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly ISkillRepository _skillRepository;

        public SkillController(ISkillRepository skillRepository)
        {
            _skillRepository = skillRepository;
        }

        // GET: api/Skill
        [HttpGet]
        public async Task<ActionResult<BaseResponseModel<IEnumerable<Skill>>>> GetAllSkills()
        {
            var skills = await _skillRepository.GetAllAsync();
            return Ok(new BaseResponseModel<IEnumerable<Skill>>
            {
                Code = "200",
                Message = "Skills retrieved successfully",
                Status = "Success",
                Data = skills
            });
        }

        // GET: api/Skill/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseModel<Skill>>> GetSkillById(int id)
        {
            var skill = await _skillRepository.GetByIdAsync(id);
            if (skill == null)
            {
                return NotFound(new BaseResponseModel<Skill>
                {
                    Code = "404",
                    Message = "Skill not found",
                    Status = "Error",
                    Data = null
                });
            }

            return Ok(new BaseResponseModel<Skill>
            {
                Code = "200",
                Message = "Skill retrieved successfully",
                Status = "Success",
                Data = skill
            });
        }

        // POST: api/Skill
        [HttpPost]
        public async Task<ActionResult<BaseResponseModel<Skill>>> CreateSkill(SkillDTO skillDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new BaseResponseModel<Skill>
                {
                    Code = "400",
                    Message = "Invalid data",
                    Status = "Error",
                    Data = null
                });
            }

            var createdSkill = await _skillRepository.AddAsync(skillDTO);
            return CreatedAtAction(nameof(GetSkillById), new { id = createdSkill.Id }, new BaseResponseModel<Skill>
            {
                Code = "201",
                Message = "Skill created successfully",
                Status = "Success",
                Data = createdSkill
            });
        }

        // PUT: api/Skill/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponseModel<Skill>>> UpdateSkill(int id, Skill skill)
        {
            

            var updatedSkill = await _skillRepository.UpdateAsync( id ,skill);
            return Ok(new BaseResponseModel<Skill>
            {
                Code = "200",
                Message = "Skill updated successfully",
                Status = "Success",
                Data = updatedSkill
            });
        }

        // DELETE: api/Skill/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponseModel<bool>>> DeleteSkill(int id)
        {
            var result = await _skillRepository.DeleteAsync(id);
            if (!result)
            {
                return NotFound(new BaseResponseModel<bool>
                {
                    Code = "404",
                    Message = "Skill not found",
                    Status = "Error",
                    Data = false
                });
            }

            return Ok(new BaseResponseModel<bool>
            {
                Code = "200",
                Message = "Skill deleted successfully",
                Status = "Success",
                Data = true
            });
        }
    }
}
