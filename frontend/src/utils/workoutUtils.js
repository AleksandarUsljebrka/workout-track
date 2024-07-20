import { startOfWeek, endOfWeek, isSameWeek } from 'date-fns';

export const groupWorkoutsByWeek = (workouts, month) => {
  const groupedWorkouts = {};

  workouts.forEach(workout => {
    const workoutDate = new Date(workout.date);
    if (workoutDate.getMonth() === month.getMonth() && workoutDate.getFullYear() === month.getFullYear()) {
      const startOfWeekDate = startOfWeek(workoutDate, { weekStartsOn: 1 });
      const endOfWeekDate = endOfWeek(workoutDate, { weekStartsOn: 1 });

      const weekKey = `${startOfWeekDate.toISOString()} - ${endOfWeekDate.toISOString()}`;

      if (!groupedWorkouts[weekKey]) {
        groupedWorkouts[weekKey] = [];
      }

      groupedWorkouts[weekKey].push(workout);
    }
  });

  return groupedWorkouts;
};

export const calculateWeekStats = (workouts) => {
  const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);
  const numberOfWorkouts = workouts.length;
  const averageIntensity = workouts.reduce((acc, workout) => acc + workout.intensity, 0) / numberOfWorkouts;
  const averageFatigue = workouts.reduce((acc, workout) => acc + workout.fatigue, 0) / numberOfWorkouts;

  return {
    totalDuration,
    numberOfWorkouts,
    averageIntensity,
    averageFatigue,
  };
};
