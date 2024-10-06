import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';
import './home.css';

export function HomePage() {
    const navigate = useNavigate();
    const [file, setFile] = useState();

    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = () => {
        navigate('results', { state: { image: file } });
    };

    return (
        <div className='home'>
            <div className="background-image">
                <div>
                <h1>Food for Thought</h1>
                <p>Discover the carbon footprint of your next meal</p>
                <div className='file-div'>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleSubmit} id="uploadbtn">Upload image</button>
                </div>
                </div>
            </div>
        </div>
    );
}
