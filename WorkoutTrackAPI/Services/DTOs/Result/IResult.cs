using Services.DTOs.Workout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs.Result
{
	public interface IResult
	{
		bool Successful { get; set; }
		string ErrorMess { get; set; }
		IDTO Dto { get; set; }
		ErrorCode ErrorCode { get; set; }
		string Token { get; set; }
		int PostId { get; set; }
		int Count { get; set; }
		WorkoutListDto WorkoutList {  get; set; }

	}
}
