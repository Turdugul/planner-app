'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    return () => setIsClient(false); // Cleanup on unmount
  }, []);

  if (!isClient) return <div>Loading...</div>; // Display a loading message

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: -50 }}  // Initial state of the page
      animate={{ opacity: 1, x: 0 }}    // Animated state of the page
      exit={{ opacity: 0, x: 50 }}      // Exit state of the page
      transition={{ opacity: { duration: 0.4 }, x: { duration: 0.5 }}} // Transition duration
    >
      <main className="container mx-auto p-4 mb-16">{children}</main>
    </motion.div>
  );
}
