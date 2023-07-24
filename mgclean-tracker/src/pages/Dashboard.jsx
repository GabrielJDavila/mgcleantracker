import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { getFirebaseItem, expensesCollection, incomeCollection } from "./firebase"

export default function Dashboard() {
    const [income, setIncome] = useState(3543)
    const [expenses, setExpenses] = useState(1322)
    const [expensesDataFromFB, setExpensesDataFromFB] = useState([])
    const [incomeDataFromFB, setIncomeDataFromFB] = useState([])
    const [profit, setProfit] = useState(0)
    const [error, setError] = useState(null)

    const trueProfit = income - expenses
    console.log(expensesDataFromFB, incomeDataFromFB)
    

    async function loadFBData() {
        try {
            const expensesData = await getFirebaseItem(expensesCollection)
            const incomeData = await getFirebaseItem(incomeCollection)
            setExpensesDataFromFB(expensesData)
            setIncomeDataFromFB(incomeData)
        } catch(err) {
            setError(err)
        }
    }

    // function addData() {
        
    // }

    useEffect(() => {
        setProfit(trueProfit)
        loadFBData()
    }, [])

    return (
        <div className="dashboard">

            <h1 className="dashboard-title">Overview</h1>
        
            <div className="dash-item">
                <h3 className="dash-item-title">Total Income: ${income}</h3>
                <Link to="income" className="income-preview">+</Link>
            </div>

            <div className="dash-item">
                <h3 className="dash-item-title">Total Expenses: ${expenses}</h3>
                <Link to="expenses" className="expenses-preview">+</Link>
            </div>

            <div className="profits-preview">
                <h3>Total Profits(pre-tax): ${trueProfit}</h3>
            </div>
        </div>
    )
}