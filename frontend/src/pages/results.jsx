import { PieChart } from '@mui/x-charts/PieChart';
import { useLocation } from 'react-router-dom';
import './results.css';

export function ResultsPage() {
    const { image } = useLocation().state;
    const data = [
        { label: 'Steak', value: 35 },
        { label: 'Potatoes', value: 3 },
        { label: 'Asparagus', value: 2 },
    ];
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    return (
        <div className='results'>
            <h1>Your Carbon Foodprint Results</h1>
            <div className="results-container">
                <img src={URL.createObjectURL(image)} width="400px" />
                <div className='stats'>
                    <PieChart
                        series={[
                            {
                            data: data,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { additionalRadius: -30, color: 'gray' },
                            //   arcLabel: params => params.label,
                            },
                        ]}
                        width={500}
                        height={300}
                        slotProps={{
                            legend: { hidden: false },
                        }}
                        sx={{
                            typography: 'Trebuchet MS',
                            color: 'primary.main',
                        }}
                    />

                    <table className="legend">
                        <tr>
                            <th title="The name of the food item">Food Item</th>
                            <th title="The carbon footprint of the food item in kg of CO2">kg of CO2</th>
                            <th title="The contribution of this food to the total CO2 of your meal">Percentage</th>
                        </tr>
                        {data.map(item => (
                            <tr key={item.label}>
                                <td>{item.label}</td>
                                <td>{item.value}</td>
                                <td>{(item.value / total) * 100}%</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}
