using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
	public class User:IdentityUser
	{
		[Required(ErrorMessage = "First name is required!")]
		[MinLength(2)]
		public string FirstName { get; set; }

		[Required(ErrorMessage = "Last name is required!")]
		[MinLength(2)]
		public string LastName { get; set; }
		public ICollection<Workout> Workouts { get; set; }
	}
}
