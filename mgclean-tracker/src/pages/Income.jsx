import { incomeInDB, readToApp, writeToDB } from './firebase.jsx'
// import { getDatabase, ref, set, onValue } from 'firebase/database'
import { useState, useEffect } from "react"

export default function Income() {
    const [data, setData] = useState()

    useEffect(() => {
        readToApp(incomeInDB, setData)
    }, [])
    // Next function to work on: getting the writeToDB set up.
    // - check input for onChange or form for onSubmit
    const restructedData = data ? data.map(([id, item]) => ({id, ...item})) : null
    // Note: Do I truly need to create displayedData? Recheck work later.
    const displayedData = restructedData ? restructedData.map(item => {
        return (
            <div key={item.id} className="income-instance">
                <p className="income-provider">{item.name}</p>
                <p className="income-service">{item.type}</p>
                <p className="income-amount">${item.amount}</p>
            </div>
        )
    }) : <div><h1>Loading...</h1></div>
    
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
                {displayedData}
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