


export default function Income() {
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
                </div>
                <div className="income-instance">
                    <p className="income-provider">provider</p>
                    <p className="income-amount">amount</p>
                </div>
            </div>
        </div>
    )
}