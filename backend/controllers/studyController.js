import StudyTask from '../models/StudyTaskSchema.js';

// @desc    Create a new study task
// @route   POST /api/study
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ success: false, message: "Task description is required" });
    }

    const newTask = await StudyTask.create({
      user: req.user.id, // From 'protect' middleware
      task: task
    });

    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all of user's study tasks
// @route   GET /api/study
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const tasks = await StudyTask.find({ user: req.user.id }).sort({ isCompleted: 1, createdAt: 'desc' });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a task (e.g., mark as complete)
// @route   PUT /api/study/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const { isCompleted } = req.body;
    const task = await StudyTask.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    // Ensure the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    task.isCompleted = isCompleted;
    await task.save();

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a study task
// @route   DELETE /api/study/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await StudyTask.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    await task.deleteOne();
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};