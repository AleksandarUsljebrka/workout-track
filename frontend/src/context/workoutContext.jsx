
import React, { createContext, useState, useContext } from 'react';
// import { addWorkout as apiAddWorkout } from '../services/WorkoutService'; // Pretpostavka funkcije za dodavanje treninga

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = async (newWorkoutData) => {
    try {
    //   const addedWorkout = await apiAddWorkout(newWorkoutData); // Pozivamo API funkciju za dodavanje treninga
    //   setWorkouts([...workouts, addedWorkout]); // Dodajemo novi trening u lokalni state
    } catch (error) {
      console.error('Error adding Workout:', error);
      // Handle error
    }
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;
