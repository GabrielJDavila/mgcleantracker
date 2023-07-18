import { database, incomeInDB, expensesInDB, writeToDB, readToApp } from './firebase.jsx'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import { useState, useEffect } from "react"

export default function Income() {
    const [data, setData] = useState()
    const [arrayData, setArrayData] = useState()

    
    console.log(arrayData)

    useEffect(() => {
        readToApp(incomeInDB, setData)
        setArrayData(data)
    }, [])
    

    return (
        <div>
            <h1>Income</h1>
            <form>
                <input
                    type="text"
                    name="income"
                    placeholder="new income"
                />
                <button>submit</button>
            </form>
            <div className="income-instance-container">
                
                {/* <div className="income-instance">
                    <p className="income-provider">provider</p>
                    <p className="income-amount">amount</p>
                </div>
                <div className="income-instance">
                    <p className="income-provider">provider</p>
                    <p className="income-amount">amount</p>
                </div>
                <div className="income-instance">
                    <p className="income-provider">provider</p>
                    <p className="income-amount">amount</p>
                </div>
                <div className="income-instance">
                    <p className="income-provider">provider</p>
                    <p className="income-amount">amount</p>
                </div> */}
            </div>
        </div>
    )
}