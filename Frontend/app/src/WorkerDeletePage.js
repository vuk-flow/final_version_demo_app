import { useState } from "react";
import React from "react";
import './App.css'

const DeleteWorkerForm = () => {
    const [workerId, setWorkerId] = useState('')
    const [status, setStatus] = useState('')
   

    const handleSubmit = async (e) => {
        e.preventDefault()

        

        try {
            const response = await fetch(`http://localhost:8000/api/workers/delete/${workerId}`, {
                method: 'DELETE',
                
            });
            if (!response.ok){
                const errorData = await response.json()
                throw new Error(errorData.detail)
            }
            const updatedWorker = await response.json()
            setStatus(`Succesfull update ${JSON.stringify(updatedWorker)}`);
        } catch (error) {
            setStatus(`Error: ${error.message}`)
        }

    }

    return (
        <div class="edit-worker-container">
          <h2>Edit Worker</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label class="bigger-labels">Worker ID:</label> <br></br>
              <input class="wide" type="number" value={workerId} onChange={(e) => setWorkerId(e.target.value)} required />
            </div>
            
            <button class="wide" type="submit">Delete Worker</button>
          </form>
          <br></br>
          <br></br>
          <br></br>
          <a href="/add">Add Worker</a> <br></br> <br></br>
          <a href="/csv">Add with CSV</a> <br></br> <br></br>
          <a href="/edit">Edit user</a> <br></br> <br></br>
          <a href="/">List all user</a> <br></br> <br></br>
          {status && <p>{status}</p>}
        </div>
      );
    };
    
    export default DeleteWorkerForm;
