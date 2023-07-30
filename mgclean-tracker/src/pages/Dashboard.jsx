import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { getFirebaseItem, expensesCollection, incomeCollection } from "./firebase"

export default function Dashboard() {
    const [income, setIncome] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [expensesDataFromFB, setExpensesDataFromFB] = useState([])
    const [incomeDataFromFB, setIncomeDataFromFB] = useState([])
    const [profit, setProfit] = useState(0)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    async function loadFBData() {
        try {
            const expensesData = await getFirebaseItem(expensesCollection)
            const incomeData = await getFirebaseItem(incomeCollection)
            setExpensesDataFromFB(expensesData)
            setIncomeDataFromFB(incomeData)
            
        } catch(err) {
            setError(err)
            setIsLoading(prev => !prev)
        }
    }

    useEffect(() => {
        loadFBData()
    }, [])

    useEffect(() => {
        const filteredExpensesData = expensesDataFromFB.filter(item => item.amount).map(item => ({
            ...item,
            amount: parseFloat(item.amount.replace('$', ''))
        }))
        const totalExpenseAmount = filteredExpensesData.reduce((total, item) => total + item.amount, 0)
        setExpenses(totalExpenseAmount)

        const filteredIncomeData = incomeDataFromFB.filter(item => item.amount).map(item => ({
            ...item,
            amount: parseFloat(item.amount.replace('$', ''))
        }))
        const totalIncomeAmount = filteredIncomeData.reduce((total, item) => total + item.amount, 0)
        setIncome(totalIncomeAmount)

        setProfit(totalIncomeAmount - totalExpenseAmount)
        setIsLoading(false)
        
    }, [expensesDataFromFB, incomeDataFromFB])


    if (isLoading) {
        return <div>Loading...</div>
    }
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
                <h3>Total Profits(pre-tax): ${profit}</h3>
            </div>
        </div>
    )
}