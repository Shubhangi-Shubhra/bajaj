// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(input);
      const res = await axios.post('YOUR_BACKEND_URL/bfhl', jsonData);
      setResponse(res.data);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes('Numbers') && <div>Numbers: {response.numbers.join(', ')}</div>}
        {selectedOptions.includes('Alphabets') && <div>Alphabets: {response.alphabets.join(', ')}</div>}
        {selectedOptions.includes('Highest lowercase alphabet') && <div>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</div>}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Backend Data Processor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="10"
          cols="30"
          placeholder='{"data": ["A", "C", "z"]}'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <select multiple onChange={handleSelectChange}>
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
}

export default App;
