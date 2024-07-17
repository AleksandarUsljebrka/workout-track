using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
	public class Workout
	{
		public int Id { get; set; }
		public string UserId { get; set; }
		public User User { get; set; }
		public WorkoutType ExerciseType { get; set; }
		public int Duration { get; set; } 
		public int CaloriesBurned { get; set; }
		public int Intensity { get; set; } 
		public int Fatigue { get; set; } 
		public DateTime Date { get; set; }
	}
}
