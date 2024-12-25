import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

// Define a type for new goals that do not yet have an ID
interface NewGoal {
  text: string;
  completed: boolean;
}

// The Firestore goals collection reference
const goalsCollection = collection(db, 'goals');

// Create a new goal
export const addGoalToFirestore = async (goal: NewGoal): Promise<string | undefined> => {
  try {
    const docRef = await addDoc(goalsCollection, goal);
    return docRef.id;
  } catch (e) {
    console.error("Error adding goal: ", e);
  }
};

// Get all goals from Firestore
export const getGoalsFromFirestore = async (): Promise<Goal[]> => {
  try {
    const querySnapshot = await getDocs(goalsCollection);
    const goals: Goal[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Goal, 'id'>; // Omit ID since it's not in Firestore data
      goals.push({ ...data, id: doc.id }); // Add the document ID separately
    });

    return goals;
  } catch (e) {
    console.error("Error getting goals: ", e);
    return [];
  }
};

// Toggle goal completion status
export const toggleGoalCompletion = async (id: string, completed: boolean): Promise<void> => {
  try {
    const goalDoc = doc(db, 'goals', id);
    await updateDoc(goalDoc, { completed: !completed });
  } catch (e) {
    console.error("Error toggling goal completion: ", e);
  }
};

// Delete a goal
export const deleteGoalFromFirestore = async (id: string): Promise<void> => {
  try {
    const goalDoc = doc(db, 'goals', id);
    await deleteDoc(goalDoc);
  } catch (e) {
    console.error("Error deleting goal: ", e);
  }
};
