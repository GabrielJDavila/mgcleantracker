
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1ViovhILXn7KfrpgcPsxoTgubnvQhDKU",
  authDomain: "income-tracker-abfd1.firebaseapp.com",
  projectId: "income-tracker-abfd1",
  storageBucket: "income-tracker-abfd1.appspot.com",
  messagingSenderId: "887548477192",
  appId: "1:887548477192:web:dd4fa36cb9a7b6ee3276bd"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize database
export const database = getFirestore(app)
export const incomeCollection = collection(database, "income")
export const expensesCollection = collection(database, "expenses")

// firebase instance
export async function addFirebaseItem(name, amount, date, type, collectionType) {
  try {
    const docRef = await addDoc(collectionType, {
      name: name,
      amount: amount,
      date: date,
      type: type
    })
  } catch(e) {
    console.error("Error adding document: ", e)
  }
}
export async function getFirebaseItem(collectionType) {
  const snapshot = await getDocs(collectionType)
  const collections = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return collections
}

