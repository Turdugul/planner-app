'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-rose-600 w-full text-white p-4">
      <nav className="container flex justify-between items-center">
        <h1 className="text-2xl font-bold"> ☘️ Planner</h1>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={handleToggleMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-4">
          {[{ href: '/dashboard', label: 'Dashboard' },
            { href: '/', label: 'Home' },
            { href: '/goals', label: 'Goals' },
            { href: '/planner', label: 'Planner' },
            { href: '/diary', label: 'Diary' }].map((link) => (
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="lg:hidden absolute top-16 left-0 w-full bg-rose-600 p-4 space-y-4">
            {[{ href: '/dashboard', label: 'Dashboard' },
              { href: '/', label: 'Home' },
              { href: '/goals', label: 'Goals' },
              { href: '/planner', label: 'Planner' },
              { href: '/diary', label: 'Diary' }].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleCloseMenu}  // Close the menu when a link is clicked
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
        )}
      </nav>
    </header>
  );
}
