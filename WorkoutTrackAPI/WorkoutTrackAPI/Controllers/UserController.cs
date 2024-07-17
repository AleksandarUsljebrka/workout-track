using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.DTOs.User;
using Services.Services.Interfaces;

namespace WorkoutTrackAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]

	public class UserController(IUserService _userService) : Controller
	{
		[HttpGet]
		[Route("user")]
		[Authorize]
		public async Task<IActionResult> GetUser()
		{
			string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
			var result = await _userService.GetUser(token);

			if (!result.Successfull) return StatusCode((int)result.ErrorCode, result.ErrorMess);
			return Ok(result.Dto);
		}

	
		[HttpPost]
		[Route("register")]
		public async Task<IActionResult> Register(RegisterDto userDto)
		{
			var response = await _userService.CreateUser(userDto);

			if (!response.Successfull) return StatusCode((int)response.ErrorCode, response.ErrorMess);

			return Ok(response);
			
		}
		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDto loginDTO)
		{
			var response = await _userService.LoginUser(loginDTO);
			if (!response.Successfull) return StatusCode((int)response.ErrorCode, response.ErrorMess);

			return Ok(response);
		}
	}
}
