import axios from 'axios';
import { baseUrl } from '../constants/url.constants';



export const register = (userData) => {
    return axios.post(`${baseUrl}/user/register`, userData);
};

export const login = (userData) => {
    return axios.post(`${baseUrl}/user/login`, userData);
};
export const createWorkout = (workoutData, token) =>{
    return axios.post(`${baseUrl}/workout/new-workout`, workoutData,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    );
}
export const getWorkouts = (token) =>{
    return axios.get(`${baseUrl}/workout/workouts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}