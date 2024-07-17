using AutoMapper;
using Data.Entities;
using Services.DTOs.User;
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

			CreateMap<User, UserDto>().ReverseMap();

		}

	}
}
