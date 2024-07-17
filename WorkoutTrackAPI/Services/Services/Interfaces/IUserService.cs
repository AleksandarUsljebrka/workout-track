using Services.DTOs.Result;
using Services.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services.Interfaces
{
	public interface IUserService
	{
		Task<IResult> GetUser(string token);
		Task<IResult> CreateUser(RegisterDto userDto);
		Task<IResult> LoginUser(LoginDto loginDto);

	}
}
