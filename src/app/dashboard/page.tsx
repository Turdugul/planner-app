// Dashboard.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getGoalsFromFirestore } from '@/firebase/firestoreGoalsServices';
import { getTasksFromFirestore } from '@/firebase/firebasePlanService';
import { getDiaryEntries } from '@/firebase/firebaseDiaryService';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

interface Task {
  id: string;
  time: string;
  task: string;
}

// Update the DiaryEntry interface to use Date for the date field
interface DiaryEntry {
  id: string;
  date: Date;  // Change to Date type
  content: string;
}

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [goalsData, tasksData, diaryData] = await Promise.all([
          getGoalsFromFirestore(),
          getTasksFromFirestore(),
          getDiaryEntries(),
        ]);

        setGoals(goalsData);
        setTasks(tasksData);
        setDiaryEntries(diaryData);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate completed goals
  const completedGoals = goals.filter((goal) => goal.completed).length;

  if (loading) {
    return <div className="text-center text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center">📍 Dashboard</h2>

      {/* Goal Overview */}
      <section className="bg-rose-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Goals Overview</h3>
        <p className="mt-2">
          You have {goals.length} goals, {completedGoals} of which are completed.
        </p>
        <Link className="mt-4 inline-block bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600" href="/goals">
          View Your Goals
        </Link>
      </section>

      {/* Upcoming Tasks */}
      <section className="bg-rose-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Upcoming Tasks</h3>
        <ul className="mt-4 space-y-4">
          {tasks.slice(0, 3).map((task) => (
            <li key={task.id} className="flex justify-between items-center p-4 bg-white rounded shadow-sm">
              <p>
                {task.time}: {task.task}
              </p>
            </li>
          ))}
        </ul>
        <Link className="mt-4 inline-block bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600" href="/planner">
          View All Tasks
        </Link>
      </section>

      {/* Recent Diary Entries */}
      <section className="bg-rose-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Recent Diary Entries</h3>
        <ul className="mt-4 space-y-4">
          {diaryEntries.slice(0, 2).map((entry) => (
            <li key={entry.id} className="flex justify-between items-center p-4 bg-white rounded shadow-sm">
              <p>
                {/* Format date for display */}
                {entry.date.toLocaleDateString()} - {entry.content}
              </p>
            </li>
          ))}
        </ul>
        <Link className="mt-4 inline-block bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600" href="/diary">
          View All Diary Entries
        </Link>
      </section>

      {/* Add a link to navigate back to the Home page */}
      <div className="mt-6 text-center">
        <Link className="mt-4 inline-block bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600" href="/">
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}
