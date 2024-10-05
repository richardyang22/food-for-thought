import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <div>
                <h1>Food for Thought</h1>
                <div>Discover the carbon footprint of your next meal</div>
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload image</button>
        </div>
    );
}
