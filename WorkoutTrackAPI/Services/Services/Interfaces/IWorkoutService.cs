using Services.DTOs;
using Services.DTOs.Result;
using Services.DTOs.Workout;


namespace Services.Services.Interfaces
{
	public interface IWorkoutService
	{
		Task<IResult> Create(NewWorkoutDto newWorkoutDto);
		Task<IResult> GetWorkouts(string token, Query query);
		Task<IResult> GetAll(string token);

	}
}
