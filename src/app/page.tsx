// /app/page.tsx

import Link from 'next/link';  // Import Next.js Link

export default function Home() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center">Welcome to Planner!</h2>
      <p className="text-center mt-4">Set your goals, plan your days, and reflect on the season. Explore the app:</p>
      <div className="flex justify-center space-x-6 mt-6">
        <Link className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600" href="/dashboard">
Go to Dashboard
        </Link>
        <Link className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600" href="/goals">
        Set Your Goals
        </Link>
        <Link className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600" href="/planner">
        Plan Your Days
        </Link>
        <Link className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600" href="/diary">
        Your Diary
         
        </Link>
      </div>
    </div>
  );
}

