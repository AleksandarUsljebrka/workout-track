using Data.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.DTOs.User;
using Services.DTOs.Workout;
using Services.Services.Interfaces;

namespace WorkoutTrackAPI.Controllers
{
	[ApiController]
	[Route("workout")]

	public class WorkoutController(IWorkoutService _workoutService) : Controller
	{
		[HttpGet]
		[Route("workouts")]
		[Authorize]
		public async Task<IActionResult> GetAll()
		{
			string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
			var result = await _workoutService.GetAll(token);

			if (!result.Successful) return StatusCode((int)result.ErrorCode, result.ErrorMess);
			return Ok(result.Dto);
		}


		[HttpPost]
		[Route("new-workout")]
		public async Task<IActionResult> CreateWorkout(NewWorkoutDto newWorkoutDto)
		{
			var response = await _workoutService.Create(newWorkoutDto);

			if (!response.Successful) return StatusCode((int)response.ErrorCode, response.ErrorMess);

			return Ok(response);

		}
	}
}
