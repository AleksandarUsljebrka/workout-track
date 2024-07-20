import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { getWorkouts } from '../../services/api';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import { groupWorkoutsByWeek, calculateWeekStats } from '../../utils/workoutUtils';
import './weeklyProgress.css'

const WeeklyProgress = () => {
  const { userId, token, isLoggedIn } = useContext(AuthContext);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      if (!isLoggedIn || !token || !userId) return; 

      try {
        const response = await getWorkouts(token);
        const workouts = response.data.workoutList;
        setUserWorkouts(workouts); 
      } catch (error) {
        console.error('Error fetching user workouts:', error);
        alert('Error fetching user workouts:', error);
      }
    };
    fetchUserWorkouts();
  }, [userId, token, isLoggedIn]);

  const groupedWorkouts = groupWorkoutsByWeek(userWorkouts, selectedMonth);
  
  const hasWorkouts = Object.keys(groupedWorkouts).length > 0;

  return (
    <div className="weekly-progress-container">
      <h2 className="section-title">Weekly Progress</h2>
      <CustomDatePicker selectedMonth={selectedMonth} onChange={setSelectedMonth} />
     {hasWorkouts ? <div className="weeks-container">
        {Object.keys(groupedWorkouts).map(weekKey => {
          const weekWorkouts = groupedWorkouts[weekKey];
          const { totalDuration, numberOfWorkouts, averageIntensity, averageFatigue } = calculateWeekStats(weekWorkouts);

          return (
            <div key={weekKey} className="week-summary">
              <h3 className="week-title">
                Week of {new Date(weekKey.split(' - ')[0]).toLocaleDateString()} - {new Date(weekKey.split(' - ')[1]).toLocaleDateString()}
              </h3>
              <div className="stats-container">
                <div className="stat">
                  <span className="stat-label">Total Duration:</span>
                  <span className="stat-value">{totalDuration} min</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Number of Workouts:</span>
                  <span className="stat-value">{numberOfWorkouts}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Average Intensity:</span>
                  <span className="stat-value">{averageIntensity.toFixed(2)}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Average Fatigue:</span>
                  <span className="stat-value">{averageFatigue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>:
       <div className="no-workouts-message">
       <p>No workouts recorded for the selected month.</p>
     </div>}
    </div>
  );
};

export default WeeklyProgress;
