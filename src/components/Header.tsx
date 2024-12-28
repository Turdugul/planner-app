'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LoginLogic } from './Login';

export default function Header() {
  const [user, setUser] = useState<{
    displayName: string | null;
    photoURL: string | null;
  } | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname for active link checking

  // Use the LoginLogic functions
  const { login, logout } = LoginLogic({
    onUserChange: (loggedInUser) => setUser(loggedInUser),
  });

  const menuLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/goals', label: 'Goals' },
    { href: '/planner', label: 'Planner' },
    { href: '/diary', label: 'Diary' },
  ];

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-rose-600 w-full text-white p-4">
      <nav className="container flex justify-between items-center">
        <h1 className="text-2xl font-bold">☘️ Planner</h1>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={handleToggleMenu}
          className="lg:hidden text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-4">
          {user ? (
            <>
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-white ${
                      pathname === link.href ? 'text-yellow-300 font-bold glow-effect' : 'hover:text-yellow-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="text-white">{`Hello, ${user.displayName}`}</li>
              <li>
                <button
                  onClick={logout}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:text-black hover:bg-yellow-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={login}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sign in with Google
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="lg:hidden absolute top-16 left-0 w-full bg-rose-600 p-4 space-y-4">
            {user ? (
              <>
                <li className="text-white">{`Hello, ${user.displayName}`}</li>
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={handleToggleMenu} // Close the menu when a link is clicked
                      className={`text-white ${
                        pathname === link.href ? 'text-yellow-300 font-bold glow-effect' : 'hover:text-yellow-300'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={logout}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={login}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Sign in with Google
                </button>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}
