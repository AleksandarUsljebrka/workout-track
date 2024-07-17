using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository.Interfaces
{
	public interface IRepository<T> where T : class
	{
		Task<IEnumerable<T>> GetAll();
		IEnumerable<T> FindAll();
		Task<T> Get(Expression<Func<T, bool>> filter);
		Task Add(T entity);
		Task Remove(T entity);

	}
}
