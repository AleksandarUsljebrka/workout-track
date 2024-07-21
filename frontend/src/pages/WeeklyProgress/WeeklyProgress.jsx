import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";
import { getWorkouts } from "../../services/api";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import {
  groupWorkoutsByWeek,
  calculateWeekStats,
} from "../../utils/workoutUtils";

import ReactSwitch from "react-switch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./weeklyProgress.css";
import Graph from "../../components/Graph/Graph";

const WeeklyProgress = () => {
  const { userId, token, isLoggedIn } = useContext(AuthContext);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const [isGraph, setIsGraph] = useState(false);

  const handleToggleView = () => {
    setIsGraph((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      if (!isLoggedIn || !token || !userId) return;

      try {
        const response = await getWorkouts(token);
        const workouts = response.data.workoutList;
        setUserWorkouts(workouts);
      } catch (error) {
        console.error("Error fetching user workouts:", error);
        toast.error("Error fetching user workouts!");
      }
    };
    fetchUserWorkouts();
  }, [userId, token, isLoggedIn]);

  const groupedWorkouts = groupWorkoutsByWeek(userWorkouts, selectedMonth);

  const hasWorkouts = Object.keys(groupedWorkouts).length > 0;
  const sortedWeekKeys = Object.keys(groupedWorkouts).sort(
    (a, b) => new Date(a.split(" - ")[0]) - new Date(b.split(" - ")[0])
  );

  const chartData = sortedWeekKeys.map((weekKey) => {
    const weekWorkouts = groupedWorkouts[weekKey];
    const {
      totalDuration,
      numberOfWorkouts,
      averageIntensity,
      averageFatigue,
    } = calculateWeekStats(weekWorkouts);
    return {
      week: `Week${sortedWeekKeys.indexOf(weekKey) + 1}`,
      totalDuration,
      numberOfWorkouts,
      averageIntensity,
      averageFatigue,
    };
  });
  return (
    <>
      <div className="weekly-progress-container">
        <div className="header-progress">
          <h2 className="section-title">Weekly Progress</h2>
          <CustomDatePicker
            selectedMonth={selectedMonth}
            onChange={setSelectedMonth}
          />
          <div className="graph-toggle">
            <p>Graph</p>
            <ReactSwitch checked={isGraph} onChange={handleToggleView} />
          </div>
        </div>

        {!isGraph ? (
          <>
            {hasWorkouts ? (
              <div className="weeks-container">
                {sortedWeekKeys.map((weekKey) => {
                  const weekWorkouts = groupedWorkouts[weekKey];
                  const {
                    totalDuration,
                    numberOfWorkouts,
                    averageIntensity,
                    averageFatigue,
                  } = calculateWeekStats(weekWorkouts);

                  return (
                    <div key={weekKey} className="week-summary">
                      <h3 className="week-title">
                        Week of{" "}
                        {new Date(weekKey.split(" - ")[0]).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(weekKey.split(" - ")[1]).toLocaleDateString()}
                      </h3>
                      <div className="stats-container">
                        <div className="stat">
                          <span className="stat-label">Total Duration:</span>
                          <span className="stat-value">
                            {totalDuration} min
                          </span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">
                            Number of Workouts:
                          </span>
                          <span className="stat-value">{numberOfWorkouts}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Average Intensity:</span>
                          <span className="stat-value">
                            {averageIntensity.toFixed(2)}
                          </span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Average Fatigue:</span>
                          <span className="stat-value">
                            {averageFatigue.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-workouts-message">
                <p>No workouts recorded for the selected month.</p>
              </div>
            )}
          </>
        ) : (
          <div className="chart-container">
            <Graph
              chartData={chartData}
              title="Week Stats: Average Fatigue and Average Intensity"
              dataKey1="averageFatigue"
              dataKey2="averageIntensity"
              dataKeyX="week"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default WeeklyProgress;
