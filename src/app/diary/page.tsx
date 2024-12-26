'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDiaryEntry, getDiaryEntries, updateDiaryEntry, deleteDiaryEntry } from '@/firebase/firebaseDiaryService';
import Link from 'next/link';

interface DiaryEntry {
  id: string;
  content: string;
  date: Date;  // Ensure this is a Date object
}

export default function Diary() {
  const [entry, setEntry] = useState('');
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [editing, setEditing] = useState<string | null>(null); // To track which entry is being edited
  const [editedEntry, setEditedEntry] = useState('');

  // Fetch diary entries from Firestore
  const fetchDiaryEntries = async () => {
    try {
      const entries = await getDiaryEntries();
      setDiaryEntries(entries);
    } catch (error) {
      console.error('Failed to load diary entries:', error);
      toast.error('Failed to load diary entries.');
    }
  };

  // Handle adding a new diary entry
  const handleSubmit = async () => {
    if (entry.trim()) {
      try {
        await addDiaryEntry(entry);
        setEntry('');
        fetchDiaryEntries(); // Refresh entries after adding
      } catch (error) {
        console.error('Failed to save entry:', error);
        toast.error('Failed to save entry.');
      }
    } else {
      toast.warn('Please write something before saving.');
    }
  };

  // Handle editing a diary entry
  const handleEdit = (id: string, currentContent: string) => {
    setEditing(id);
    setEditedEntry(currentContent);
  };

  const handleUpdate = async (id: string) => {
    if (editedEntry.trim()) {
      try {
        await updateDiaryEntry(id, editedEntry);
        setEditing(null);
        setEditedEntry('');
        fetchDiaryEntries(); // Refresh entries after updating
      } catch (error) {
        console.error('Failed to update entry:', error);
        toast.error('Failed to update entry.');
      }
    } else {
      toast.warn('Please write something before updating.');
    }
  };

  // Handle deleting a diary entry
  const handleDelete = async (id: string) => {
    try {
      await deleteDiaryEntry(id);
      fetchDiaryEntries(); // Refresh entries after deleting
    } catch (error) {
      console.error('Failed to delete entry:', error);
      toast.error('Failed to delete entry.');
    }
  };

  // Fetch diary entries when the component is mounted
  useEffect(() => {
    fetchDiaryEntries();
  }, []);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center">📝 Your Diary</h2>

      {/* Entry input */}
      <div className="flex flex-col items-center">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts..."
          className="p-4 border rounded w-full max-w-3xl h-60 mb-4"
        />
        <button
          onClick={handleSubmit}
          disabled={!entry.trim()}
          className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600 disabled:bg-gray-400"
        >
          Save Entry
        </button>
      </div>

      {/* Display existing diary entries */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Your Diary Entries</h3>
        <div className="space-y-4">
          {diaryEntries.map((entry) => (
            <div key={entry.id} className="border p-4 rounded shadow-md space-y-2">
              {/* Displaying Date */}
              <p className="text-sm text-gray-500">{entry.date.toLocaleString()}</p>
              {editing === entry.id ? (
                <div>
                  <textarea
                    value={editedEntry}
                    onChange={(e) => setEditedEntry(e.target.value)}
                    className="p-4 border rounded w-full max-w-3xl h-20 mb-4"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleUpdate(entry.id)}
                      disabled={!editedEntry.trim()}
                      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                      Update Entry
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{entry.content}</p>
                  <div className="flex justify-end gap-3 mt-2">
                    <button
                      onClick={() => handleEdit(entry.id, entry.content)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
      <div className="mt-6 text-center">
        <Link
          className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600"
          href="/"
        >
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}
