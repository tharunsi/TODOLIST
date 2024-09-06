const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Todo = require('./models/Todo.js')
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URL)

app.post('/add', (req, res )=> {
    const task = req.body.task;
    Todo.create({
        task:task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/get', (req,res)=>{
    Todo.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req,res)=>
{
   const {id} = req.params;
   Todo.findByIdAndUpdate({_id: id}, {done:true})
   .then(result => res.json(result))
   .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    Todo.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
   .catch(err => res.json(err))
})

app.listen(port, () => {
    console.log("server is running")
})