
import "./globals.css";

import Link from "next/link";


export const metadata = {
  title: 'Christmas Planner',
  description: 'Set your goals, plan your days, and reflect on the season!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body>
        <header className="bg-rose-600 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <h1 className="text-2xl font-bold"> 📍 Planner</h1>
            <ul className="flex space-x-4">
              {/* Add Dashboard link */}
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/goals">Goals</Link></li>
              <li><Link href="/planner">Planner</Link></li>
              <li><Link href="/diary">Diary</Link></li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}