using Data.Context;
using Data.Entities;
using Data.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
	public class UserRepository(ApplicationDbContext _context) : Repository<User>(_context), IUserRepository
	{

		public async Task<User> GetUserWithWorkouts(Expression<Func<User, bool>> filter)
		{
			return await _context.Set<User>().Where(filter).Include(u => u.Workouts).FirstOrDefaultAsync();
		}
	}
}
