// routes/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const authMiddleware = require('../middleware/authMiddleware');

// Create task
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description, user: req.userId });
        await task.save();
        res.status(201).send('Task created successfully');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Error creating task');
    }
});

// Get all tasks
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Error fetching tasks');
    }
});

// Other CRUD operations for tasks can be implemented similarly

module.exports = router;
