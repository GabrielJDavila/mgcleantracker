import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { signIn, auth } from "../pages/firebase"
import { onAuthStateChanged } from "firebase/auth"
import Header from "./Header"
import Footer from "./Footer"
export default function Layout() {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const monitorAuthState = async () => {
            onAuthStateChanged(auth, user => {
              if(user) {
                console.log(user)
                setIsLoggedIn(!!user)
              }
            })
        }
        monitorAuthState()
    }, [])

    function handleSignIn(e) {
        e.preventDefault()
        signIn(loginInfo.email, loginInfo.password)
    }

    function handleChange(e) {
        const {name, value} = e.target
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    if(!isLoggedIn) {
        return (
            <div className="login-background">
                <h1 className="app-title">M&G Clean Pros Income & Expense Tracker</h1>
                <form onSubmit={handleSignIn} className="login-form">
                    <h2>Login</h2>
                    <div className="logininput-container">
                        <label>Email:</label>
                        <input
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="example@gmail.com"
                            value={loginInfo.email}
                            className="login-item"
                            required
                        />
                    </div>
                    
                    <div className="logininput-container">
                        <label>Password:</label>
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="*****"
                            value={loginInfo.password}
                            className="login-item"
                            required
                        />
                    </div>
                    <button className="login-btn">submit</button>
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