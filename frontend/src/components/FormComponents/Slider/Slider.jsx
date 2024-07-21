import './slider.css'; 

const Slider = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(parseInt(e.target.value, 10)); 
  };

  return (
    <input
      type="range"
      min="1"
      max="10"
      value={value}
      onChange={handleChange}
      className="slider"
    />
  );
};

export default Slider;
