import React, { useState } from 'react';

function App() {
  const [area, setArea] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Make a POST request to the Flask backend
    const response = await fetch('http://127.0.0.1:5000/get_density', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ area: area }),
    });

    const data = await response.json(); 
    setResponseText(data.density);
  };

  return (
    <div className="App">
      <h1>Food for Thought</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Enter your area"
        />
        <button type="submit">Submit</button>
      </form>
      {responseText && <h2>{responseText}</h2>} {/* Display the response */}
    </div>
  );
}

export default App;
