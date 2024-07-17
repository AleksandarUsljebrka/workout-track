using Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Data.Context
{
	public class ApplicationDbContext : IdentityDbContext<User>
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Workout> Workouts { get; set; }

		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Workout>()
				.Property(w => w.ExerciseType)
				.HasConversion<string>();
		}
	}
}
