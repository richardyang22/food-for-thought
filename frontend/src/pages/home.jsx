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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // Append the image to the FormData object

        try {
            const response = await fetch('http://127.0.0.1:5000/image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Success:', responseData);
                navigate('results', { state: { image: file, responseData } });
            } else {
                console.error('Error uploading image:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
