import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { getWorkouts } from '../../services/api';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './dashboard.css';

const Dashboard = () => {
  const { userId, token, isLoggedIn } = useContext(AuthContext);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const workoutsPerPage = 8;

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      if (!isLoggedIn || !token || !userId) return;

      try {
        const response = await getWorkouts(token, currentPage, workoutsPerPage);
        const workouts = response.data.workouts.workoutList;
        setUserWorkouts(workouts);
        setTotalWorkouts(response.data.count);
      } catch (error) {
        console.error('Error fetching user workouts:', error);
        toast.error('Error fetching user workouts!');
      }
    };
    fetchUserWorkouts();
  }, [userId, token, isLoggedIn, currentPage]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalWorkouts / workoutsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const hasWorkouts = userWorkouts.length>0;
  return (
    <div className="user-workouts-container">
      <div className="title-table">
        <h2>User Workouts</h2>
      </div>
      <div className="table-container">
      {hasWorkouts ?<table className="user-workouts-table">
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
                <td>{workout.caloriesBurned} kcal</td>
                <td>{workout.intensity}</td>
                <td>{workout.fatigue}</td>
                <td>{formatDateTime(workout.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>:
        <div className="no-workouts-message">
        <p>No workouts yet.</p>
      </div>
        }
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} id={number} onClick={handleClick} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

const formatDateTime = (datetimeStr) => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(datetimeStr).toLocaleString(undefined, options);
};
