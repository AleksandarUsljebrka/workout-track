using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs.Result
{
	public enum ErrorCode
	{
		BadRequest = 400,
		Unauthorized = 401,
		NotFound = 404,
		InternalServerError = 500,
		Conflict = 409
	}
}
