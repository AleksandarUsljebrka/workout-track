using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository.Interfaces
{
	public interface IUnitOfWork
	{
		public IUserRepository UserRepository { get; set; }
		public IWorkoutRepository WorkoutRepository { get; set; }
		Task SaveChanges();
	}
}
