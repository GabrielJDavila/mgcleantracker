import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
export default function Layout() {
    const auth = false

    if(!auth) {
        return (
            <div>
                <form className="login-form">
                    <h1>Login</h1>
                    <label> Email:
                    <input
                        type="text"
                    />
                    </label>
                    <label> Password:
                    <input
                        type="text"
                    />
                    </label>
                </form>
            </div>
        )
    }
    return (
        <div className="site-wrapper">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}