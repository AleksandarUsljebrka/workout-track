using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Helpers.Interfaces
{
	public interface IUserHelper
	{
		Task<User> GetUserByUsername(string username);
		Task<User> GetUserByEmail(string email);
	}
}
