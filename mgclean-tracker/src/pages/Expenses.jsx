import { useState, useEffect } from "react"
import { expensesCollection, addFirebaseItem, getFirebaseItem, deleteItem } from "./firebase"

export default function Expenses() {
    const [expenseData, setExpenseData] = useState({
        expense: "",
        amount: "",
        date: "",
        type: ""
    })
    const [dataFromFB, setDataFromFB] = useState([])
    const [error, setError] = useState(null)

    async function loadData() {
        try {
            const data = await getFirebaseItem(expensesCollection)
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
        addFirebaseItem(expenseData.expense, expenseData.amount, expenseData.date, expenseData.type, expensesCollection)
        loadData()
    }
    function handleChange(e) {
        const {name, value} = e.target
        setExpenseData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    function handleClick(e) {
        const itemId = e.target.id
        deleteItem(expensesCollection, itemId)
        loadData()
    }


    const displayExpenseData = dataFromFB.map(item => {
        return (
            <div key={item.id} className="expense-instance">
                <p className="expense-provider">{item.name}</p>
                <p className="expense-provider">{item.type}</p>
                <p className="expense-service">{item.date}</p>
                <p className="expense-amount">${item.amount}</p>
                <button id={item.id} className="delete-btn" onClick={handleClick}>remove</button>
            </div>
        )
    })
    return (
        <div>
            <h1>Expenses</h1>
            <form onSubmit={handleSubmit} className="new-expense-form">
                <input
                    name="expense"
                    onChange={handleChange}
                    type="text"
                    placeholder="expense"
                    value={expenseData.expense}
                />
                <input
                    name="type"
                    onChange={handleChange}
                    type="text"
                    placeholder="item type"
                    value={expenseData.type}
                />
                <input
                    name="amount"
                    onChange={handleChange}
                    type="text"
                    placeholder="expense amount"
                    value={expenseData.amount}
                />
                <input
                    name="date"
                    onChange={handleChange}
                    type="text"
                    placeholder="date"
                    value={expenseData.date}
                />
                <button>submit</button>
            </form>
            <div className="expense-instance-container">
                {dataFromFB ? displayExpenseData : <h1>Loading...</h1>}
            </div>
        </div>
    )
}