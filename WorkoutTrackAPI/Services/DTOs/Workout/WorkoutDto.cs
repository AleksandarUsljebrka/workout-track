using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs.Workout
{
	public class WorkoutDto:IDTO
	{
		public WorkoutType ExerciseType { get; set; }
		public int Duration { get; set; }
		public int CaloriesBurned { get; set; }
		public int Intensity { get; set; }
		public int Fatigue { get; set; }
		public DateTime Date { get; set; }
	}
}
