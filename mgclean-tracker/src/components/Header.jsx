import { NavLink } from "react-router-dom"
import { logout } from "../pages/firebase"

export default function Nav() {
    const activeStyles = {
        background: "rgb(208, 68, 68)",
        color: "white",
        fontWeight: "600",
        margin: ".2rem"
    }

    function signOutUser() {
        console.log('works')
        logout()
        window.location.reload()
    }

    return (
        <header className="site-header">
            <div className="title-signout-container">
                <h2 className="site-title">M&G Clean Pros</h2>
                <div onClick={signOutUser} className="signout-container">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    {/* <p className="signout-text">Sign out</p> */}
                </div>
            </div>
            
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