// /app/planner/page.tsx

'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';  // Import Next.js Link

type Task = {
  id: number;
  time: string;
  task: string;
};

export default function Planner() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), time: timeSlot, task: newTask }]);
      setNewTask('');
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center">📅 Daily Planner</h2>

      <div className="flex justify-center space-x-4 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task..."
          className="p-2 border rounded"
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
          onClick={addTask}
          className="bg-rose-500 text-white p-2 rounded hover:bg-rose-600"
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            className="p-4 border rounded shadow-sm bg-rose-100"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-semibold">{task.time}</p>
            <p>{task.task}</p>
          </motion.div>
        ))}
      </div>

      {/* Link to go back to the Home page */}
      <div className="mt-6 text-center">
        <Link className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600" href="/">
         Back to Home
        </Link>
      </div>
    </motion.div>
  );
}
