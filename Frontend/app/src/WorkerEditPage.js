import { useState } from "react";
import React from "react";
import axios from 'axios'

import './App.css'
import { url } from "./WorkerListPage";

const EditWorkerForm = () => {
    const [workerId, setWorkerId] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataToUpdate = {}
        if (name) dataToUpdate.name = name 
        if (email) dataToUpdate.email = email 

        
        try {
          const response = await axios.patch(`${url}/api/workers/edit/${workerId}`, dataToUpdate)
          setStatus("Succsessful edit new")
        } catch (error){
          if(error.response){
            const errorData = error.response.data;
            if (Array.isArray(errorData.detail)){

              setStatus(`Error while editing worker!\n${errorData.detail.join('\n')}`);
            } else {
              setStatus(`Error while editing worker!\n${errorData.detail}`);
            }

          } else {
            setStatus('Error ocurred')
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
            <div>
              <label class="bigger-labels">New Name:</label> <br></br>
              <br></br>
              <input  class="wide" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label class="bigger-labels">New Email:</label> <br></br>
              <input class="wide" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div> <br></br>
            <button class="wide" type="submit">Update Worker</button>
          </form>
          <br></br>
          <a href="/add">Add worker</a> <br></br> <br></br>
          <a href="/csv">Add with CSV</a> <br></br> <br></br>
          <a href="/delete">Delete user</a> <br></br> <br></br>
          <a href="/">List all user</a> <br></br> <br></br>

          {status && <p>{status}</p>}
        </div>
      );
    };
    
    export default EditWorkerForm;
