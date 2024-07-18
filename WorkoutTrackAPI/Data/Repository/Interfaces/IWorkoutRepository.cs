using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository.Interfaces
{
	public interface IWorkoutRepository:IRepository<Workout>
	{
		Task<IEnumerable<Workout>> GetAllWithCondition(Expression<Func<Workout, bool>> filter);
	}
}
