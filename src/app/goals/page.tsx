// /app/goals/page.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Import Link from Next.js

type Goal = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
      setNewGoal('');
    }
  };

  const toggleGoal = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center">🎯 Your Goals</h2>

      <div className="mb-6 flex justify-center space-x-4">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Add a new goal..."
          className="p-2 border rounded"
        />
        <button
          onClick={addGoal}
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
        >
          Add Goal
        </button>
      </div>

      <ul className="space-y-4">
        {goals.map((goal) => (
          <motion.li
            key={goal.id}
            className={`p-4 border rounded shadow-sm ${goal.completed ? 'line-through text-gray-500' : 'bg-rose-100'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => toggleGoal(goal.id)}
          >
            {goal.text}
          </motion.li>
        ))}
      </ul>

      {/* Add a link to navigate back to the Home page */}
      <div className="mt-6 text-center">
        <Link className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600" href="/">
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}
