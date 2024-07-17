using Data.Entities;
using Data.Repository.Interfaces;
using Services.Helpers.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Helpers
{
	public class UserHelper(IUnitOfWork _unitOfWork) : IUserHelper
	{
		public async Task<User> GetUserByEmail(string email)
		{
			return await _unitOfWork.UserRepository.Get(u => u.Email == email);
		}

		public async Task<User> GetUserByUsername(string username)
		{
			var user = await _unitOfWork.UserRepository.Get(u => u.UserName == username);
			return user;
		}
	}
}
