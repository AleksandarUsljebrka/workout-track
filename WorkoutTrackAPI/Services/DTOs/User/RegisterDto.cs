﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs.User
{
	public class RegisterDto : IDTO
	{
		[EmailAddress]
		[Required]
		public string Email { get; set; }

		[Required]
		public string Username { get; set; }


		[Required]
		[DataType(DataType.Password)]
		public string Password { get; set; }
	}
}
