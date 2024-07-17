using Data.Context;
using Data.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
	public class UnitOfWork : IUnitOfWork
	{
		private ApplicationDbContext _context;

		public IUserRepository UserRepository { get; set; }

		public UnitOfWork(ApplicationDbContext context)
		{
			_context = context;
			UserRepository = new UserRepository(_context);


		}
		public async Task SaveChanges()
		{
			await _context.SaveChangesAsync();
		}
	}
}
