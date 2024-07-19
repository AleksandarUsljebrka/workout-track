import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { getWorkouts } from '../../services/api';

import './dashboard.css';

const Dashboard = () => {
  const { userId, token, isLoggedIn } = useContext(AuthContext);
  const [userWorkouts, setUserWorkouts] = useState([]);

  console.log(token)
  useEffect(() => {
    const fetchUserWorkouts = async () => {
      if (!isLoggedIn || !token || !userId) return; 

      try {
        const response = await getWorkouts(token);
        const workouts = response.data.workoutList;
        console.log(workouts);
        setUserWorkouts(workouts); 
      } catch (error) {
        console.error('Error fetching user workouts:', error);
        alert('Error fetching user workouts:', error);
      }
    };
    fetchUserWorkouts();
  }, [userId]);
  return (
    <div className="user-workouts-container">
      <div className="title-table">
        <h2>User Workouts</h2>
      </div>
      <div className="table-container">
        <table className="user-workouts-table">
          <thead>
            <tr>
              <th>Workout Type</th>
              <th>Duration (min)</th>
              <th>Calories Burned</th>
              <th>Intensity</th>
              <th>Fatigue</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {userWorkouts.map((workout) => (
              <tr key={workout.id}>
                <td>{workout.exerciseType}</td>
                <td>{workout.duration} min</td>
                <td>{workout.caloriesBurned}kcal</td>
                <td>{workout.intensity}</td>
                <td>{workout.fatigue}</td>
                <td>{formatDateTime(workout.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

const formatDateTime = (datetimeStr) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(datetimeStr).toLocaleString(undefined, options); // undefined za lokalizaciju zadržava lokalno podešavanje
};