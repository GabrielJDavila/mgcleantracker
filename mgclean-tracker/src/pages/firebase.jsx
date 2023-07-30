
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, addDoc, doc, deleteDoc, getDocs, query, orderBy } from "firebase/firestore"
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

// Initialize app and other references
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getFirestore(app)
export const incomeCollection = collection(database, "income")
export const expensesCollection = collection(database, "expenses")

// create an instance of authentication
export async function signIn(email, password) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCred)
  }
  catch(error) {
    console.log(error)
    alert(error)
  }
  
}

// const monitorAuthState = async () => {
//   onAuthStateChanged(auth, user => {
//     if(user) {
//       console.log(user)
//     }
//   })
// }
// monitorAuthState()

// add to firebase instance
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

// get item from firebase
export async function getFirebaseItem(collectionType) {
  const q = query(collectionType, orderBy("date"))
  const snapshot = await getDocs(q)
  const collections = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return collections
}

// delete item from firebase
export async function deleteItem(collectionType, itemId) {
  try {
    const itemRef = doc(collectionType, itemId)
    await deleteDoc(itemRef)
  } catch (error) {
    console.log("error: ", error)
  }
  
}

