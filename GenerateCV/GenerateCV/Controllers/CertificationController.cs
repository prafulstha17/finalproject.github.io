using GenerateCV.DTO.CreateDto.CV;
using GenerateCV.IRepository.CV;
using GenerateCV.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GenerateCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificationController : ControllerBase
    {
        private readonly ICertificationRepository _certificationRepository;

        public CertificationController(ICertificationRepository certificationRepository)
        {
            _certificationRepository = certificationRepository;
        }

        // GET: api/Certification
        [HttpGet]
        public async Task<ActionResult<BaseResponseModel<IEnumerable<Certification>>>> GetAllCertifications()
        {
            var certifications = await _certificationRepository.GetAllAsync();
            return Ok(new BaseResponseModel<IEnumerable<Certification>>
            {
                Code = "200",
                Message = "Certifications retrieved successfully",
                Status = "Success",
                Data = certifications
            });
        }

        // GET: api/Certification/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseModel<Certification>>> GetCertificationById(int id)
        {
            var certification = await _certificationRepository.GetByIdAsync(id);
            if (certification == null)
            {
                return NotFound(new BaseResponseModel<Certification>
                {
                    Code = "404",
                    Message = "Certification not found",
                    Status = "Error",
                    Data = null
                });
            }

            return Ok(new BaseResponseModel<Certification>
            {
                Code = "200",
                Message = "Certification retrieved successfully",
                Status = "Success",
                Data = certification
            });
        }

        // POST: api/Certification
        [HttpPost]
        public async Task<ActionResult<BaseResponseModel<Certification>>> CreateCertification(CertificationDTO certificationDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new BaseResponseModel<Certification>
                {
                    Code = "400",
                    Message = "Invalid data",
                    Status = "Error",
                    Data = null
                });
            }

            var createdCertification = await _certificationRepository.AddAsync(certificationDTO);
            return CreatedAtAction(nameof(GetCertificationById), new { id = createdCertification.Id }, new BaseResponseModel<Certification>
            {
                Code = "201",
                Message = "Certification created successfully",
                Status = "Success",
                Data = createdCertification
            });
        }

        // PUT: api/Certification/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponseModel<Certification>>> UpdateCertification(int id, CertificationDTO certification)
        {
            

            var updatedCertification = await _certificationRepository.UpdateAsync(id ,certification);
            return Ok(new BaseResponseModel<Certification>
            {
                Code = "200",
                Message = "Certification updated successfully",
                Status = "Success",
                Data = updatedCertification
            });
        }

        // DELETE: api/Certification/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponseModel<bool>>> DeleteCertification(int id)
        {
            var result = await _certificationRepository.DeleteAsync(id);
            if (!result)
            {
                return NotFound(new BaseResponseModel<bool>
                {
                    Code = "404",
                    Message = "Certification not found",
                    Status = "Error",
                    Data = false
                });
            }

            return Ok(new BaseResponseModel<bool>
            {
                Code = "200",
                Message = "Certification deleted successfully",
                Status = "Success",
                Data = true
            });
        }
    }
}
