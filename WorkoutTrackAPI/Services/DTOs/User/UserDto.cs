using Services.DTOs.Workout;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs.User
{
	public class UserDto : IDTO
	{

		public string Email { get; set; }
		public string Username { get; set; }

		public ICollection<WorkoutDto> Workouts { get; set; }

	}
}
