using AutoMapper;
using Data.Entities;
using Services.DTOs.User;
using Services.DTOs.Workout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Mapping
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{

			CreateMap<Workout, WorkoutDto>().ReverseMap();
			CreateMap<Workout, NewWorkoutDto>().ReverseMap();
			
			CreateMap<User, UserDto>()
				.ForMember(dest => dest.Workouts, opt => opt.MapFrom(src => src.Workouts));


		}

	}
}
