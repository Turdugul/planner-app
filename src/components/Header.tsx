
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-rose-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">📍 Planner</h1>
        <ul className="flex space-x-4">
          {[
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/', label: 'Home' },
            { href: '/goals', label: 'Goals' },
            { href: '/planner', label: 'Planner' },
            { href: '/diary', label: 'Diary' },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? 'text-yellow-300 font-bold'
                    : 'text-white'
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
