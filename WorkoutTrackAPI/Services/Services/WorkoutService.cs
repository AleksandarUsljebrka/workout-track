using AutoMapper;
using Data.Entities;
using Data.Repository.Interfaces;
using Microsoft.AspNetCore.Identity;
using Services.DTOs.Result;
using Services.DTOs.Workout;
using Services.Helpers.Interfaces;
using Services.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class WorkoutService(ITokenHelper _tokenHelper, IUnitOfWork _unitOfWork,  IMapper _mapper) : IWorkoutService
	{
        public async Task<IResult> Create(NewWorkoutDto newWorkoutDto)
        {
            if (newWorkoutDto is null) return new Result(false, ErrorCode.BadRequest);

            var workout = _mapper.Map<Workout>(newWorkoutDto);

            await _unitOfWork.WorkoutRepository.Add(workout);
            await _unitOfWork.SaveChanges();

            return new Result(true);
        }

        public async Task<IResult> GetAll(string token)
        {
            var user = await _tokenHelper.UserByToken(token);
            if (user is null) return new Result(false, ErrorCode.Unauthorized);

            var workoutsOfUser = await _unitOfWork.WorkoutRepository.GetAllWithCondition(w => w.UserId == user.Id);

            WorkoutListDto workoutsDto = new WorkoutListDto()
            {
                WorkoutList = _mapper.Map<List<WorkoutDto>>(workoutsOfUser)
            };

            return new Result(true, workoutsDto);
        }
    }
}
