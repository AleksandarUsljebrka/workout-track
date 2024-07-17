using Data.Entities;
using Services.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Helpers.Interfaces
{
	public interface ITokenHelper
	{
		string GetClaim(string tokenStr, string type);
		Task<User> UserByToken(string token);
		string GenerateToken(UserSession user);


	}
}
