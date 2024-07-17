using Data.Context;
using Data.Entities;
using Data.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
	public class UserRepository(ApplicationDbContext _context) : Repository<User>(_context), IUserRepository
	{


	}
}
