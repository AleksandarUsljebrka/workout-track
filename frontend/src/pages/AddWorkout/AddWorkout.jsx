
import React, { useState } from 'react';
// import  WorkoutContext from '../../context/workoutContext';
import Slider from '../../components/Slider/Slider';
import './addWorkout.css';
const AddWorkout = () => {

  const [workoutData, setWorkoutData] = useState({
    exerciseType:'',
    caloriesBurned:0,
    intesity:5,
    fatigue:5,
    duration: 0,
  });
  const handleSliderChange = (fieldName) => (value) => {
    setWorkoutData({ ...workoutData, [fieldName]: value });
  };
  const handleInputChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   await addWorkout(workoutData);
    //   alert('Workout added successfully!');
    //   setNewWorkout({ name: '', description: '', duration: 0 });
    } catch (error) {
      console.error('Error adding workout:', error);
      alert('Failed to add workout. Please try again.');
    }
  };
return(
  <div className="add-workout-form">
     <div className='title-form'>
      <h2>Add New Workout</h2>
      </div> 
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Workout Type:</label>
            <select
              id="type"
              name="type"
              value={workoutData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Workout Type</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength Training</option>
              <option value="Flexibility">Flexibility</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={workoutData.duration}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="caloriesBurned">Calories Burned:</label>
            <input
              type="number"
              id="caloriesBurned"
              name="caloriesBurned"
              value={workoutData.caloriesBurned}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="intensity">Intensity:</label>
          <Slider value={workoutData.intensity} onChange={handleSliderChange('intensity')} />
          <span>{workoutData.intensity}</span>
        </div>
        <div className="form-group">
          <label htmlFor="fatigue">Fatigue:</label>
          <Slider value={workoutData.fatigue} onChange={handleSliderChange('fatigue')} />
          <span>{workoutData.fatigue}</span>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={workoutData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Workout</button>
      </form>
    </div>
);
  // re turn (
  //   <div className='.wrapper'>
  //     <h2>Add New Workout</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label htmlFor="type">Workout Type:</label>
  //         <select
  //           id="type"
  //           name="type"
  //           value={workoutData.type}
  //           onChange={handleInputChange}
  //           required
  //         >
  //           <option value="">Select Workout Type</option>
  //           <option value="Cardio">Cardio</option>
  //           <option value="Strength">Strength Training</option>
  //           <option value="Flexibility">Flexibility</option>

  //         </select>
  //       </div>
  //       <div>
  //         <label htmlFor="duration">Duration (minutes):</label>
  //         <input
  //           type="number"
  //           id="duration"
  //           name="duration"
  //           value={workoutData.duration}
  //           onChange={handleInputChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="caloriesBurned">Calories Burned:</label>
  //         <input
  //           type="number"
  //           id="caloriesBurned"
  //           name="caloriesBurned"
  //           value={workoutData.caloriesBurned}
  //           onChange={handleInputChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="intensity">Intensity:</label>
  //         <Slider value={workoutData.intensity} onChange={handleSliderChange('intensity')} />
  //         <span>{workoutData.intensity}</span>
  //       </div>
  //       <div>
  //         <label htmlFor="fatigue">Fatigue:</label>
  //         <Slider value={workoutData.fatigue} onChange={handleSliderChange('fatigue')} />
  //         <span>{workoutData.fatigue}</span>
  //       </div>        <div>
  //         <label htmlFor="date">Date:</label>
  //         <input
  //           type="date"
  //           id="date"
  //           name="date"
  //           value={workoutData.date}
  //           onChange={handleInputChange}
  //           required
  //         />
  //       </div>
  //       <button type="submit">Add Workout</button>
  //     </form>
  //   </div>
  // );
};

export default AddWorkout;
