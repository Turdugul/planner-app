import Link from 'next/link';  // Import Next.js Link

export default function Home() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-center">Welcome to Planner!</h2>
      <p className="text-center mt-4">Set your goals, plan your days, and reflect on the season. Explore the app:</p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
        <Link
          className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
          href="/dashboard"
        >
          Go to Dashboard
        </Link>
        <Link
          className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
          href="/goals"
        >
          Set Your Goals
        </Link>
        <Link
          className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
          href="/planner"
        >
          Plan Your Days
        </Link>
        <Link
          className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
          href="/diary"
        >
          Your Diary
        </Link>
      </div>
    </div>
  );
}
