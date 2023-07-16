import { Link, NavLink } from "react-router-dom"

export default function Nav() {
    const activeStyles = {
        textDecoration: "underline",
        color: "red",
        fontWeight: "600"
    }
    return (
        <header className="site-header">
            <h1 className="site-title">M&G Clean Pros Income & Expense Tracker</h1>
            <nav>
                <NavLink
                    to="/"
                    className="nav-item"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/income"
                    className="nav-item"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Income
                </NavLink>

                <NavLink
                    to="/expenses"
                    className="nav-item"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Expenses
                </NavLink>
            </nav>
        </header>
    )
}