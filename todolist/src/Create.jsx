import React, {useState} from 'react'
import './App.css'
import axios from 'axios'

const Create = () => {

    const [task,setTask] = useState()
    const handleAdd = () => {
       axios.post('http://localhost:3001/add', {task: task})
       .then(result => location.reload())
       .catch(err => console.log(err))
    }
  return (
    <div className='create_form'>
      <input type="text" placeholder="Enter Task" onChange={(e) => setTask(e.target.value)}></input>
      <button type="button" onClick={handleAdd}>ADD</button>
    </div>
  )
}

export default Create
