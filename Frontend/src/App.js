import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      
      // FileReader's onload event handler
      reader.onload = (e) => {
        setFileContent(e.target.result); // Set the file content in state
      };
      
      reader.readAsText(file); // Read the file as text
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleClear = () => {
    setText("");
    setFileContent("");
    setFile("")
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);
    console.log("start")
    try {
      setLoading(true);
      const response = await axios.post('https://sqa-backend-dwb9y9rfu-soft2012-5b5ad68f.vercel.app/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setText(response.data.text)
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error uploading the file and text', error);
    }
  };

  return (
    <div className="App">
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
      <h1>AUTOMATIC TEST CASE GENERATION (DEMO)</h1>
      <form>
        <div style={{ display: 'flex', width: '100%' }}>
            <input type="file" onChange={handleFileChange} className="input" />
            <button type="submit" className="button" onClick={handleSubmit}>Start</button>
            <button type="submit" className="button" onClick={handleClear}>Clear</button>
        </div>
        <div className="form-group">
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '50%', paddingRight: '15px', textAlign: 'center'}}>
              PRD
              <label className="label">
                <textarea 
                  rows={20} 
                  value={fileContent} 
                  onChange={(e) => setFileContent(e.target.value)}
                  className="textarea" 
                  style={{ width: '100%' }} 
                />
              </label>
            </div>
            <div style={{ width: '50%', paddingLeft: '15px', textAlign: 'center'}}>
              Text Cases
              <label className="label">
                <textarea 
                  rows={20} 
                  value={text} 
                  onChange={handleTextChange} 
                  className="textarea" 
                  style={{ width: '100%' }} 
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;