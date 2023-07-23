
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

export async function incomeInstance(payee, amount, service) {
  try {
    const docRef = await addDoc(incomeCollection, {
      payee: payee,
      amount: amount,
      type: service
    })
    console.log("Document written with ID: ", docRef.id)
  } catch(e) {
    console.error("Error adding document: ", e)
  }
}
export async function getIncome() {
  const snapshot = await getDocs(incomeCollection)
  const income = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return income
}

export async function expenseInstance(expenseName, amount, date) {
  try {
    const docRef = await addDoc(expensesCollection, {
      name: expenseName,
      amount: amount,
      date: date
    })
    console.log("Document written with ID: ", docRef.id)
  } catch(e) {
    console.error("Error adding document: ", e)
  }
}
export async function getExpense() {
  const snapshot = await getDocs(expensesCollection)
  const expense = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return expense
}

// export const incomeInDB = ref(database, "income/")
// export const expensesInDB = ref(database, "expenses/")

// export function writeToDB(providerId, name, amount, service) {
//     set(ref(database, "income/" + providerId), {
//         name: name,
//         amount: amount,
//         type: service
//     })
// }

// export function readToApp(pathway, setData) {
//   onValue(pathway, (snapshot) => {
//     let data = Object.entries(snapshot.val())
//     setData(data)
//   })
// }

