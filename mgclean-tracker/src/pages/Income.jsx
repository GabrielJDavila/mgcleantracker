import { useState, useEffect } from "react"
import { incomeInstance, getIncome } from "./firebase"

export default function Income() {
    const [incomeData, setIncomeData] = useState({
        name: "",
        amount: "",
        service: ""
    })
    const [dataFromFB, setDataFromFB] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getIncome()
                setDataFromFB(data)
            } catch(err) {
                setError(err)
            }
        }
        loadData()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        incomeInstance(incomeData.name, incomeData.amount, incomeData.service)
    }
    function handleChange(e) {
        const {name, value} = e.target
        setIncomeData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // useEffect(() => {
    //     incomeInstance("dan", 200, "construction clean")
    // }, [])

    // Next function to work on: getting the writeToDB set up.
    // - check input for onChange or form for onSubmit
    // const restructedData = data ? data.map(([id, item]) => ({id, ...item})) : null
    // Note: Do I truly need to create displayedData? Recheck work later.
    
    const displayedData = dataFromFB.map(item => {
        return (
            <div key={item.id} className="income-instance">
                <p className="income-provider">{item.payee}</p>
                <p className="income-service">{item.type}</p>
                <p className="income-amount">${item.amount}</p>
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
                    name="amount"
                    onChange={handleChange}
                    type="text"
                    placeholder="new income"
                    value={incomeData.amount}
                />
                <input
                    name="service"
                    onChange={handleChange}
                    type="text"
                    placeholder="service"
                    value={incomeData.service}
                />
                <button>submit</button>
            </form>
            <div className="income-instance-container">
                {dataFromFB ? displayedData : <h1>Loading...</h1>}
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