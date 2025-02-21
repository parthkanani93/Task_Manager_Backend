const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

// @route   POST /tasks
// @desc    Create a new task
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      status,
      dueDate
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /tasks
// @desc    Get all tasks for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    // Check if tasks array is empty and return appropriate message
    if (tasks.length === 0) {
      return res.status(200).json({
        message: "No tasks found",
        data: [],
        count: 0
      });
    }

    // Return tasks with count if tasks exist
    res.json({
      message: "Tasks retrieved successfully",
      data: tasks,
      count: tasks.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /tasks/:id
// @desc    Get a specific task
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    // Get only the fields that were sent in the request
    console.log("req.body=====>",req.body)
    const updates = req.body;
    
    let task = await Task.findById(req.params.id);

    console.log("task=====>",task)
    
    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }
    
    // Handle partial updates - only update fields that were provided
    // No need to check each field individually
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );
    
    res.json({
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;