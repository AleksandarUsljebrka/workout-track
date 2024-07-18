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
	public class WorkoutRepository(ApplicationDbContext _context):Repository<Workout>(_context), IWorkoutRepository
	{
		public async Task<IEnumerable<Workout>> GetAllWithCondition(Expression<Func<Workout, bool>> filter)
		{
			return await _context.Set<Workout>().Where(filter).ToListAsync();
		}

	}
}
