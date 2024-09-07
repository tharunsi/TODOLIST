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

// app.post('/add', (req, res )=> {
//     const task = req.body.task;
//     Todo.create({
//         task:task
//     }).then(result => res.json(result))
//     .catch(err => res.json(err))
// })

// app.get('/get', (req,res)=>{
//     Todo.find()
//     .then(result => res.json(result))
//     .catch(err => res.json(err))
// })

// app.put('/update/:id', (req,res)=>
// {
//    const {id} = req.params;
//    Todo.findByIdAndUpdate({_id: id}, {done:true})
//    .then(result => res.json(result))
//    .catch(err => res.json(err))
// })

// app.delete('/delete/:id', (req,res) => {
//     const {id} = req.params;
//     Todo.findByIdAndDelete({_id: id})
//     .then(result => res.json(result))
//    .catch(err => res.json(err))
// })

app.get('/get', async (req, res) => {
    try {
        const todos = await Todo.find(); // Fetch all todos from the database
        res.json(todos); // Send the todos as a JSON response
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
});


app.post('/add', async (req, res) => {
    try {
        const task = req.body.task;
        const newTask = await Todo.create({ task });
        res.json(newTask); // Respond with the newly created task
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});

app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Task not found" });
        }
        todo.done = !todo.done; // Toggle the `done` field
        const updatedTodo = await todo.save();
        res.json(updatedTodo); // Respond with the updated task
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(deletedTodo); // Respond with the deleted task
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});

app.listen(port, () => {
    console.log("server is running")
})