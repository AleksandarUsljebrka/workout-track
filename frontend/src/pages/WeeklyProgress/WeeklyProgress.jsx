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
import WeekSummary from "../../components/WeekSummary/WeekSummary";

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
                    <WeekSummary
                      weekKey={weekKey}
                      totalDuration={totalDuration}
                      numberOfWorkouts={numberOfWorkouts}
                      averageIntensity={averageIntensity}
                      averageFatigue={averageFatigue}
                    />
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
