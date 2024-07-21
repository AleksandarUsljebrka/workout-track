
import React from 'react';

const WeekSummary = ({ weekKey, totalDuration, numberOfWorkouts, averageIntensity, averageFatigue }) => {
  const startDate = new Date(weekKey.split(" - ")[0]);
  const endDate = new Date(weekKey.split(" - ")[1]);

  return (
    <div className="week-summary">
      <h3 className="week-title">
        Week of {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
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
};

export default WeekSummary;
