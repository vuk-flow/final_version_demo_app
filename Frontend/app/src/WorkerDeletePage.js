import { useState } from "react";
import React from "react";
import './App.css'
import { url } from "./WorkerListPage";
import axios from 'axios'

const DeleteWorkerForm = () => {
    const [workerId, setWorkerId] = useState('')
    const [status, setStatus] = useState('')
   

    const handleSubmit = async (e) => {
        e.preventDefault()

        

        try {
            const response = await axios.delete(`${url}/api/workers/delete/${workerId}`);
            setStatus("Successful deletion!")
        } catch (error) {
          if(error.response){
            const errorData = error.response.data;
            if (Array.isArray(errorData.detail)){
      
              setStatus(`Error occured during deletion!\n${errorData.detail.join('\n')}`);
            } else {
              setStatus(`Error occured during deletion!\n${errorData.detail}`);
            }
      
          } else {
            setStatus('Error occured during deletion!');
          }
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
