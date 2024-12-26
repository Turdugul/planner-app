'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  addGoalToFirestore,
  getGoalsFromFirestore,
  toggleGoalCompletion,
  deleteGoalFromFirestore,
} from '@/firebase/firestoreGoalsServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch goals from Firestore when component mounts
  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedGoals = await getGoalsFromFirestore();
        setGoals(fetchedGoals);
       
      } catch (err) {
        console.error("Error fetching goals: ", err);
        setError('Failed to fetch goals. Please try again.');
        toast.error('Failed to load goals.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const addGoal = async () => {
    if (newGoal.trim()) {
      setError(null);
      try {
        const newGoalData = { text: newGoal, completed: false };
        const newGoalId = await addGoalToFirestore(newGoalData);
        if (newGoalId) {
          setGoals([...goals, { id: newGoalId, ...newGoalData }]);
          toast.success('Goal added successfully!');
        }
        setNewGoal('');
      } catch (err) {
        console.error("Error adding goal: ", err);
        setError('Failed to add goal. Please try again.');
        toast.error('Failed to add goal.');
      }
    } else {
      toast.warn('Please enter a goal.');
    }
  };

  const toggleGoal = async (id: string, completed: boolean) => {
    setError(null);
    try {
      await toggleGoalCompletion(id, completed); // Correctly save the new completed state
      setGoals(
        goals.map((goal) =>
          goal.id === id ? { ...goal, completed: !completed } : goal
        )
      );
      toast.info(`Goal marked as ${!completed ? 'completed' : 'incomplete'}.`);
    } catch (err) {
      console.error("Error toggling goal completion: ", err);
      setError('Failed to toggle goal. Please try again.');
      toast.error('Failed to toggle goal.');
    }
  };

  const deleteGoal = async (id: string) => {
    setError(null);
    try {
      await deleteGoalFromFirestore(id);
      setGoals(goals.filter((goal) => goal.id !== id));
      toast.success('Goal deleted successfully!');
    } catch (err) {
      console.error("Error deleting goal: ", err);
      setError('Failed to delete goal. Please try again.');
      toast.error('Failed to delete goal.');
    }
  };
  const completedGoals = goals.filter((goal) => goal.completed).length;
  const uncompletedGoals = goals.length - completedGoals;
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
        <div className="flex flex-row gap-6 justify-center space-x-4 py-4">
        <h2 className="text-3xl font-bold text-center">🎯 Your Goals</h2>
        <div className="flex text-xl py-1 rounded items-center space-x-2">
          <span className="text-green-500">✅ {completedGoals}</span>
          <span className="text-gray-500">❌ {uncompletedGoals}</span>
        </div>
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Loading state */}
      {loading && <div className="text-center text-gray-500">Loading goals...</div>}

      {/* Input for adding goals */}
      <div className="mb-6 flex justify-center space-x-4">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Add a new goal..."
          className="p-2 border rounded"
          aria-label="New goal input"
        />
        <button
          onClick={addGoal}
          className="bg-rose-500  text-white px-1 sm:px-4 py-2 rounded hover:bg-rose-600"
          aria-label="Add goal"
        >
          Add Goal
        </button>
        
      </div>

      {/* Goals list */}
      <ul className="space-y-4 sm:w-[60%] mx-auto">
        {goals.map((goal) => (
          <motion.li
            key={goal.id}
            className={`p-4 border rounded shadow-sm flex items-center justify-between ${
              goal.completed ? 'bg-gray-200 text-gray-500' : 'bg-rose-100'
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`flex-grow ${goal.completed ? 'line-through' : ''}`}>
              {goal.text}
            </span>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal.id, goal.completed)}
                className="cursor-pointer"
                aria-label={`Mark goal "${goal.text}" as ${
                  goal.completed ? 'incomplete' : 'complete'
                }`}
              />
              <button
                className="text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteGoal(goal.id);
                }}
                aria-label={`Delete goal: ${goal.text}`}
              >
                🗑️
              </button>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Add a link to navigate back to the Home page */}
      <div className="mt-6 text-center">
        <Link
          className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600"
          href="/"
        >
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}
