import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface Task {
  id: string;
  time: string;
  task: string;
}

// Firestore tasks collection reference
const tasksCollection = collection(db, 'tasks');

// Create a new task
export const addTaskToFirestore = async (task: Omit<Task, 'id'>): Promise<string | undefined> => {
  try {
    const docRef = await addDoc(tasksCollection, task);
    return docRef.id;
  } catch (e) {
    console.error("Error adding task: ", e);
  }
};

// Get all tasks from Firestore
export const getTasksFromFirestore = async (): Promise<Task[]> => {
  try {
    const querySnapshot = await getDocs(tasksCollection);
    const tasks: Task[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Task, 'id'>;
      tasks.push({ ...data, id: doc.id });
    });

    return tasks;
  } catch (e) {
    console.error("Error fetching tasks: ", e);
    return [];
  }
};

// Update a task
export const updateTaskInFirestore = async (id: string, updatedData: Partial<Task>): Promise<void> => {
  try {
    const taskDoc = doc(db, 'tasks', id);
    await updateDoc(taskDoc, updatedData);
  } catch (e) {
    console.error("Error updating task: ", e);
  }
};

// Delete a task
export const deleteTaskFromFirestore = async (id: string): Promise<void> => {
  try {
    const taskDoc = doc(db, 'tasks', id);
    await deleteDoc(taskDoc);
  } catch (e) {
    console.error("Error deleting task: ", e);
  }
};
