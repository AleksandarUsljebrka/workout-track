import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './graph.css';

const Graph = ({chartData, title, dataKey1, dataKey2, dataKeyX}) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label}`}</p>
                    <p className="intro">{`Total Duration: ${payload[0].payload.totalDuration} mins`}</p>
                    <p className="intro">{`Number of Workouts: ${payload[0].payload.numberOfWorkouts}`}</p>
                    <p className="intro">{`Average Intensity: ${payload[0].payload.averageIntensity}`}</p>
                    <p className="intro">{`Average Fatigue: ${payload[0].payload.averageFatigue}`}</p>
                </div>
            );
        }

        return null;
    };
  return (
    <div className="graph-container">
            <div className="line-chart-container">
                <h2>{title}</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid  strokeDasharray="3 3" />
                        <XAxis dataKey={dataKeyX} tickFormatter={(value) => `${value}`} 
                              tick={{ fill: '#39B3E3' }} 
                              axisLine={{ stroke: '#39B3E3' }}/>
                        <YAxis tick={{ fill: '#39B3E3' }} 
                              axisLine={{ stroke: '#39B3E3' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey={dataKey1} stroke="#FF5733" name="Average Fatigue"/>
                        <Line type="monotone" dataKey={dataKey2} stroke="#8884d8" name="Average Intensity"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>

           
        </div>
  )
}

export default Graph