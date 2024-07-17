using Data.Context;
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
	public class Repository<T> : IRepository<T> where T : class
	{
		protected readonly ApplicationDbContext _context;
		internal DbSet<T> dbSet;
		public Repository(ApplicationDbContext context)
		{
			_context = context;
			dbSet = _context.Set<T>();
		}
		public async Task Add(T entity)
		{
			await dbSet.AddAsync(entity);
		}

		public IEnumerable<T> FindAll()
		{
			throw new NotImplementedException();
		}

		public async Task<T> Get(Expression<Func<T, bool>> filter)
		{
			return await dbSet.Where(filter).FirstOrDefaultAsync();
		}

		public async Task<IEnumerable<T>> GetAll()
		{
			return await dbSet.ToListAsync();
		}

		public async Task Remove(T entity)
		{
			dbSet.Remove(entity);
		}


	}
}
