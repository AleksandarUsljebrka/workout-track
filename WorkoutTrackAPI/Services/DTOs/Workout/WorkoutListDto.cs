using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs.Workout
{
	public class WorkoutListDto:IDTO
	{
		public List<WorkoutDto> WorkoutList { get; set; }
	}
}
