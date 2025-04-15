import React, { useState } from 'react';

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a CSV file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); 

    try {
      const response = await fetch('http://127.0.0.1:8000/api/workers/csv/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setStatus('Upload successful! ');
        console.log('Server response:', result);
      } else {
        setStatus('Upload failed ');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatus('Error occurred during upload ');
    }
  };

  return (
    <div  class="edit-worker-container" style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2> Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleUpload}>Upload</button>
      <br /><br />
      <div>{status}</div><br></br>
        
        <a href="/add">Add Worker</a> <br></br> <br></br>
        <a href="/csv">Add with CSV</a> <br></br> <br></br>
        <a href="/edit">Edit user</a> <br></br> <br></br>
        <a href="/">List all user</a> <br></br> <br></br>

    </div>
  );
};

export default FileUploadPage;
