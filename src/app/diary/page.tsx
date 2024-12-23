// /app/diary/page.tsx

'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Diary() {
  const [entry, setEntry] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEntry(event.target.value);
  };

  const handleSubmit = () => {
    // Here you could save the entry to a database or local storage
    alert("Diary entry saved!");
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center">📝 Your Diary</h2>
      
      <div className="flex flex-col items-center">
        <textarea
          value={entry}
          onChange={handleChange}
          placeholder="Write your thoughts..."
          className="p-4 border rounded w-full max-w-3xl h-60 mb-4"
        />
        <button
          onClick={handleSubmit}
          className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600"
        >
          Save Entry
        </button>
      </div>
    </motion.div>
  );
}
