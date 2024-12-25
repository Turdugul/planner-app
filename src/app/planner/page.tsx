'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  addTaskToFirestore,
  getTasksFromFirestore,
  updateTaskInFirestore,
  deleteTaskFromFirestore,
} from '@/firebase/firebasePlanService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Task {
  id: string;
  time: string;
  task: string;
}

export default function Planner() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedTasks = await getTasksFromFirestore();
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Error fetching tasks: ', err);
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addOrUpdateTask = async () => {
    if (!newTask.trim()) return;

    setError(null);
    try {
      if (editingTask) {
        const updatedTask = { ...editingTask, time: timeSlot, task: newTask };
        await updateTaskInFirestore(editingTask.id, updatedTask);
        setTasks(tasks.map((task) => (task.id === editingTask.id ? updatedTask : task)));
        setEditingTask(null);
        toast.success('Task updated successfully!');
      } else {
        const taskData = { time: timeSlot, task: newTask };
        const newTaskId = await addTaskToFirestore(taskData);
        if (newTaskId) {
          setTasks([...tasks, { id: newTaskId, ...taskData }]);
          toast.success('Task added successfully!');
        }
      }
      setNewTask('');
    } catch (err) {
      console.error('Error saving task: ', err);
      setError('Failed to save task. Please try again.');
      toast.error('Error saving task. Please try again.');
    }
  };

  const startEditingTask = (task: Task) => {
    setEditingTask(task);
    setNewTask(task.task);
    setTimeSlot(task.time);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setNewTask('');
    setTimeSlot('09:00');
  };

  const deleteTask = async (id: string) => {
    setError(null);
    try {
      await deleteTaskFromFirestore(id);
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (err) {
      console.error('Error deleting task: ', err);
      setError('Failed to delete task. Please try again.');
      toast.error('Error deleting task. Please try again.');
    }
  };

  return (
    <motion.div
      className="space-y-6 px-4 sm:px-6 md:px-10 lg:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center">📅 Daily Planner</h2>

      {/* Error message */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Loading state */}
      {loading && <div className="text-center text-gray-500">Loading tasks...</div>}

      {/* Input for adding/updating tasks */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task..."
          className="flex-grow md:flex-grow-0 w-full md:w-auto p-2 border rounded"
        />
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
        </select>
        <button
          onClick={addOrUpdateTask}
          className={`bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600`}
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button
            onClick={cancelEditing}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Tasks grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            className="p-4 border rounded w-full shadow-sm bg-rose-100"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-semibold">{task.time}</p>
            <p>{task.task}</p>
            <div className="flex justify-between mt-2">
              <button
                className="text-green-500"
                onClick={() => startEditingTask(task)}
              >
                Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Link to go back to the Home page */}
      <div className="mt-6 text-center">
        <Link className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600" href="/">
          Back to Home
        </Link>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </motion.div>
  );
}
