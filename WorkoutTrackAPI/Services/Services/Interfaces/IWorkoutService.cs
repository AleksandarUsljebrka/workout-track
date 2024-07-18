using Services.DTOs.Result;
using Services.DTOs.Workout;


namespace Services.Services.Interfaces
{
	public interface IWorkoutService
	{
		Task<IResult> Create(NewWorkoutDto newWorkoutDto);
		Task<IResult> GetAll(string token);

	}
}
