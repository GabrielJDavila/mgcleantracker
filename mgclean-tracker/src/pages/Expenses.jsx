import { useState, useEffect } from "react"
import { expenseInstance, getExpense } from "./firebase"

export default function Expenses() {
    const [expenseData, setExpenseData] = useState({
        name: "",
        amount: "",
        date: ""
    })
    const [dataFromFB, setDataFromFB] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getExpense()
                setDataFromFB(data)
            } catch(err) {
                setError(err)
            }
        }
        loadData()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        expenseInstance(expenseData.expense, expenseData.amount, expenseData.date)
    }
    function handleChange(e) {
        const {name, value} = e.target
        setExpenseData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const displayExpenseData = dataFromFB.map(item => {
        return (
            <div key={item.id} className="expense-instance">
                <p className="expense-provider">{item.name}</p>
                <p className="expense-service">{item.date}</p>
                <p className="expense-amount">{item.amount}</p>
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
                {/* <div className="expense-instance">
                    <p className="expense-provider">provider</p>
                    <p className="expense-amount">amount</p>
                </div>
                <div className="expense-instance">
                    <p className="expense-provider">provider</p>
                    <p className="expense-amount">amount</p>
                </div>
                <div className="expense-instance">
                    <p className="expense-provider">provider</p>
                    <p className="expense-amount">amount</p>
                </div>
                <div className="expense-instance">
                    <p className="expense-provider">provider</p>
                    <p className="expense-amount">amount</p>
                </div> */}
            </div>
        </div>
    )
}