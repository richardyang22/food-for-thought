import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { useLocation } from 'react-router-dom';
import './results.css';
import axios from 'axios';

export function ResultsPage() {
    const navigate = useNavigate();
    const { image, responseData } = useLocation().state;
    const [data, setData] = useState([]);

    const handleClick = () => {
        navigate('../');
    };    

    useEffect(() => {
        const fetchData = async () => {
            const results = [];
            try {
                // Loop through each food class in responseData.classes
                for (const food of responseData.classes) {
                    const options = {
                        method: 'GET',
                        url: `https://foodprint.p.rapidapi.com/api/foodprint/name/${food}`,
                        headers: {
                          'x-rapidapi-key': '0c5073e51cmsh553414bb801bfb7p182e8ejsnc44540977818',
                          'x-rapidapi-host': 'foodprint.p.rapidapi.com'
                        }
                    };
                    const response = await axios.request(options);
                    console.log(response.data);
                    const value = response.data[0].footprint;
                    results.push({ label: food, value: value });
                }
                setData(results); // Update state with the final data
            } catch (error) {
                console.error('Error fetching food values:', error);
            }
        };

        fetchData(); // Call the fetch function
    }, []);

    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    return (
        <>
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
            <button onClick={handleClick} id="backbutton">Go Back</button>
        </div>
        </>
    );
}
