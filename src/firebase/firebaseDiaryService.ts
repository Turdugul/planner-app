// firebaseDiaryService.ts

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from './firebaseConfig';

// Define the DiaryEntry interface
interface DiaryEntry {
  id: string;
  content: string;
  date: Date;  // Ensure date is a Date object
}

// Add a new diary entry
export const addDiaryEntry = async (entry: string) => {
  try {
    const newDocRef = await addDoc(collection(db, 'diaryEntries'), {
      content: entry,
      date: Timestamp.now(),  // Save the current time as Firestore Timestamp
    });
    toast.success('Diary entry saved!');
    return newDocRef.id;  // Optionally return the ID of the newly added document
  } catch (error) {
    console.error('Error saving entry: ', error);
    toast.error('There was an error saving your diary entry.');
    return null;
  }
};

// Get all diary entries
export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'diaryEntries'));
    const entries: DiaryEntry[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Check if the date field is a valid Firestore Timestamp
      let date = data.date;
      if (date && date.toDate) {
        date = date.toDate();  // Convert Firestore Timestamp to JavaScript Date
      } else {
        date = new Date();  // Default to current date if it's not a valid Timestamp
      }

      entries.push({
        id: doc.id,
        content: data.content,
        date: date,  // Use the converted Date
      });
    });
    return entries;
  } catch (error) {
    console.error('Error fetching entries: ', error);
    toast.error('There was an error fetching diary entries.');
    return [];
  }
};

// Update a diary entry by ID
export const updateDiaryEntry = async (id: string, content: string) => {
  try {
    const docRef = doc(db, 'diaryEntries', id);
    await updateDoc(docRef, { content });
    toast.success('Diary entry updated!');
  } catch (error) {
    console.error('Error updating entry: ', error);
    toast.error('There was an error updating your diary entry.');
  }
};

// Delete a diary entry by ID
export const deleteDiaryEntry = async (id: string) => {
  try {
    const docRef = doc(db, 'diaryEntries', id);
    await deleteDoc(docRef);
    toast.success('Diary entry deleted!');
  } catch (error) {
    console.error('Error deleting entry: ', error);
    toast.error('There was an error deleting your diary entry.');
  }
};
