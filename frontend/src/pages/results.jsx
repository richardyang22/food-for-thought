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
        <div className="results-container">
            <img src={URL.createObjectURL(image)} width="400px" />
            <PieChart
                series={[
                    {
                        data: data,
                        arcLabel: params => params.label,
                    },
                ]}
                width={500}
                height={300}
                slotProps={{
                    legend: { hidden: true },
                }}
            />
            <table className="legend">
                <tr>
                    <th>Food Item</th>
                    <th>kg of CO2</th>
                    <th>Percentage</th>
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
    );
}
