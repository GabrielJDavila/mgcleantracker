import { useState, useEffect } from "react"
import { incomeCollection, addFirebaseItem, getFirebaseItem, deleteItem } from "./firebase"
import { doc, deleteDoc } from "firebase/firestore"

export default function Income() {
    const [incomeData, setIncomeData] = useState({
        name: "",
        amount: "",
        service: "",
        date: ""
    })
    const [dataFromFB, setDataFromFB] = useState([])
    const [error, setError] = useState(null)
    
    async function loadData() {
        try {
            const data = await getFirebaseItem(incomeCollection)
            setDataFromFB(data)
        } catch(err) {
            setError(err)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        addFirebaseItem(incomeData.name, incomeData.amount, incomeData.date, incomeData.service, incomeCollection)
        loadData()
    }
    function handleChange(e) {
        const {name, value} = e.target
        setIncomeData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    function handleClick(e) {
        const itemId = e.target.id
        deleteItem(incomeCollection, itemId)
        loadData()
    }

    const displayedData = dataFromFB.map(item => {
        return (
            <div key={item.id} className="income-instance">
                <p className="income-provider">{item.name}</p>
                <p className="income-service">{item.type}</p>
                <p className="income-service">{item.date}</p>
                <p className="income-amount">${item.amount}</p>
                <button id={item.id} className="delete-btn" onClick={handleClick}>remove</button>
            </div>
        )
    })
    
    return (
        <div>
            <h1>Income</h1>
            <form onSubmit={handleSubmit} className="new-income-form">
                <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    placeholder="payee"
                    value={incomeData.name}
                />
                <input
                    name="service"
                    onChange={handleChange}
                    type="text"
                    placeholder="service"
                    value={incomeData.service}
                />
                <input
                    name="amount"
                    onChange={handleChange}
                    type="text"
                    placeholder="new income"
                    value={incomeData.amount}
                />
                <input
                    name="date"
                    onChange={handleChange}
                    type="date"
                    placeholder="date"
                    value={incomeData.date}
                />
                <button>submit</button>
            </form>
            <div className="income-instance-container">
                {dataFromFB ? displayedData : <h1>Loading...</h1>}
            </div>
        </div>
    )
}