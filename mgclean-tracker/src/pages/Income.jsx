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
            const sortedData = data.sort((a, b) => b.date.localeCompare(a.date))
            setDataFromFB(sortedData)
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
                <div>
                    <p className="income-provider">{item.name}</p>
                    <p className="income-service">{item.type}</p>
                    <p className="income-date">{item.date}</p>
                </div>
                <p className="income-amount">${item.amount}</p>
                <i id={item.id} onClick={handleClick} className="fa-solid fa-trash"></i>
            </div>
        )
    })
    
    return (
        <div>
            <h1>Income</h1>
            <form onSubmit={handleSubmit} className="new-form">
                <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    placeholder="payee"
                    value={incomeData.name}
                    className="input-item"
                    required
                />
                <input
                    name="service"
                    onChange={handleChange}
                    type="text"
                    placeholder="service"
                    value={incomeData.service}
                    className="input-item"
                    required
                />
                <input
                    name="amount"
                    onChange={handleChange}
                    type="text"
                    placeholder="new income"
                    value={incomeData.amount}
                    className="input-item"
                    required
                />
                <input
                    name="date"
                    onChange={handleChange}
                    type="date"
                    placeholder="date"
                    value={incomeData.date}
                    className="input-item"
                    required
                />
                <button className="submit-btn">submit</button>
            </form>
            <div className="income-instance-container">
                {dataFromFB ? displayedData : <h1>Loading...</h1>}
            </div>
        </div>
    )
}