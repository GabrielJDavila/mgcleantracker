// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase, ref, set, onValue } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEgjW6J6plXYSmg74qSkpvOv71Al5s9MI",
  authDomain: "mgclean-tracker.firebaseapp.com",
  databaseURL: "https://mgclean-tracker-default-rtdb.firebaseio.com",
  projectId: "mgclean-tracker",
  storageBucket: "mgclean-tracker.appspot.com",
  messagingSenderId: "31135312625",
  appId: "1:31135312625:web:bcb0f21af070b3979c1750"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize RealtimeDatabase
export const database = getDatabase(app)
export const incomeInDB = ref(database, "income/")
export const expensesInDB = ref(database, "expenses/")

export function writeToDB(providerId, name, amount) {
    set(ref(database, "income/" + providerId), {
        name: name,
        amount: amount
    })
}

export function readToApp(pathway, setData) {
  onValue(pathway, (snapshot) => {
    let data = Object.entries(snapshot.val())
    setData(data)
  })
}

