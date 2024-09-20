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
	public class WorkoutRepository(ApplicationDbContext _context) : Repository<Workout>(_context), IWorkoutRepository
	{
		public async Task<(IEnumerable<Workout>, int count)> GetAllWithCondition(Expression<Func<Workout, bool>> filter, int pageNumber, int pageSize)
		{
			var query = _context.Set<Workout>().AsQueryable();
			query = query.Where(filter);

			var workouts = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
			var totalCount = await query.CountAsync();

			return (workouts, totalCount);
		}

	}
}
