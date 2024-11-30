using GenerateCV.IRepository.CV;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GenerateCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCvController : ControllerBase
    {
        private readonly ICvRepository _cvRepository;

        public UserCvController(ICvRepository cvRepository)
        {
            _cvRepository = cvRepository;
        }

        [HttpPost("{userId}/generate-cv")]
        public async Task<IActionResult> GenerateAndSaveCv(string userId)
        {
            var result = await _cvRepository.GenerateAndSaveCvAsync(userId);
            if (!result)
            {
                return NotFound(new { Message = "User not found or unable to generate CV." });
            }

            return Ok(new { Message = "CV generated and saved successfully." });
        }

        [HttpGet("{userId}/download-cv")]
        public async Task<IActionResult> DownloadCv(string userId)
        {
            var userCv = await _cvRepository.GetCvAsync(userId);

            if (userCv == null || userCv.PdfData == null)
            {
                return NotFound(new { Message = "CV not found for the specified user." });
            }

            return File(userCv.PdfData, "application/pdf", $"{userId}_CV.pdf");
        }
    }
}
