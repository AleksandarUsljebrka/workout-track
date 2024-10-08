﻿using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository.Interfaces
{
	public interface IUserRepository : IRepository<User>
	{

		Task<User> GetUserWithWorkouts(Expression<Func<User, bool>> filter);
	}
}
