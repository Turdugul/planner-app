// /app/dashboard/page.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';  // Import Next.js Link

export default function Dashboard() {
  // Sample data for the dashboard (You can replace these with actual state or data fetched from a database)
  const goals = [
    { id: 1, text: 'Buy Christmas gifts', completed: false },
    { id: 2, text: 'Bake Christmas cookies', completed: true },
    { id: 3, text: 'Decorate the tree', completed: false },
  ];
  
  const tasks = [
    { id: 1, time: '09:00', task: 'Buy groceries for Christmas dinner' },
    { id: 2, time: '12:00', task: 'Wrap presents' },
  ];

  const diaryEntries = [
    { id: 1, date: '2024-12-20', content: 'Had a wonderful day shopping for gifts!' },
    { id: 2, date: '2024-12-21', content: 'Feeling excited for the upcoming holiday season!' },
  ];

  // Goal completion count
  const completedGoals = goals.filter(goal => goal.completed).length;

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
        <p className="mt-2">You have {goals.length} goals, {completedGoals} of which are completed.</p>
        <Link className="mt-4 inline-block bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600" href="/goals">
            View Your Goals
      
        </Link>
      </section>

      {/* Upcoming Tasks */}
      <section className="bg-rose-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Upcoming Tasks</h3>
        <ul className="mt-4 space-y-4">
          {tasks.slice(0, 3).map(task => (
            <li key={task.id} className="flex justify-between items-center p-4 bg-white rounded shadow-sm">
              <p>{task.time}: {task.task}</p>
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
          {diaryEntries.slice(0, 2).map(entry => (
            <li key={entry.id} className="flex justify-between items-center p-4 bg-white rounded shadow-sm">
              <p>{entry.date}: {entry.content}</p>
            </li>
          ))}
        </ul>
        <Link className="mt-4 inline-block bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600" href="/diary">
        
            View All Diary Entries
       
        </Link>
      </section>

      {/* Add a link to navigate back to the Home page */}
      <div className="mt-6 text-center">
        <Link href="/">
Back to Home
        </Link>
      </div>
    </motion.div>
  );
}
