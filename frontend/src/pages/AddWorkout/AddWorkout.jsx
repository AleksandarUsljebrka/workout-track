import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { createWorkout } from "../../services/api";

import Slider from "../../components/FormComponents/Slider/Slider";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";
import "./addWorkout.css";
import Select from "../../components/FormComponents/Select/Select";
import FormGroup from "../../components/FormComponents/FromGroup/FormGroup";

const AddWorkout = () => {
  const { userId, token } = useContext(AuthContext);

  const [workoutData, setWorkoutData] = useState({
    userId: userId,
    exerciseType: "",
    caloriesBurned: 0,
    intensity: 5,
    fatigue: 5,
    duration: 0,
    date: "",
  });

  const [addedWorkout, setAddedWorkout] = useState(false);
  const navigate = useNavigate();

  const handleSliderChange = (fieldName) => (value) => {
    setWorkoutData({ ...workoutData, [fieldName]: value });
  };
  const handleInputChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setWorkoutData({ ...workoutData, date: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(workoutData);
      await createWorkout(workoutData, token);
      setAddedWorkout(true);

      toast.success("Workout added successfully!");
    } catch (error) {
      setAddedWorkout(false);
      console.error("Error adding workout:", error);
      toast.error("Failed to add workout. Please try again.");
    }
  };

  useEffect(() => {
    if (!addedWorkout) {
      return;
    } else {
      navigate("/dashboard");
    }
  }, [addedWorkout]);

  const values = ["Cardio", "Strength Training", "Flexibility"];
  return (
    <div className="add-workout-form">
      <div className="title-form">
        <h2>Add New Workout</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <FormGroup label="Select Workout Type">
            <Select
              id="exerciseType"
              name="exerciseType"
              value={workoutData.exerciseType}
              onChange={handleInputChange}
              values={values}
              initialValue="Select Workout Type"
              required
            />
          </FormGroup>

          <FormGroup label="Duration (minutes):">
            <input
              onChange={handleInputChange}
              type="number"
              id="duration"
              name="duration"
              value={workoutData.duration}
              min="0"
              required
            />
          </FormGroup>

          <FormGroup label="Calories Burned:">
            <input
              onChange={handleInputChange}
              type="number"
              id="caloriesBurned"
              name="caloriesBurned"
              value={workoutData.caloriesBurned}
              min="0"
              required
            />
          </FormGroup>
        </div>
        <FormGroup label="Intesity:">
          <Slider
            value={workoutData.intensity}
            onChange={handleSliderChange("intensity")}
          />
          <span>{workoutData.intensity}</span>
        </FormGroup>

        <FormGroup label="Fatigue:">
          <Slider
            value={workoutData.fatigue}
            onChange={handleSliderChange("fatigue")}
          />
          <span>{workoutData.fatigue}</span>
        </FormGroup>

        <FormGroup label="Date:">
          <DatePicker
            selected={workoutData.date}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="yyyy-MM-dd h:mm aa"
            required
          />
        </FormGroup>

        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default AddWorkout;
