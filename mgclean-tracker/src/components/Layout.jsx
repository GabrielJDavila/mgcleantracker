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
        // async function monitorAuthState() {
        //     try {
        //       const checkAuth = onAuthStateChanged(auth, user => {
        //         if(user) {
        //           console.log(user)
        //           setIsLoggedIn(!!user)
        //         }
        //       })
        //       return
        //     }
        //     catch(error) {
        //         console.log(error)
        //     }
            
        // }

        // const unsubscribe = onAuthStateChanged((user) => {
        //     setIsLoggedIn(!!user)
        // })
        // return () => unsubscribe()
    }, [])

    function handleClick(e) {
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
            <div>
                <form  className="login-form">
                    <h1>Login</h1>
                    <label> Email:
                    <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="example@gmail.com"
                        value={loginInfo.email}
                        required
                    />
                    </label>
                    <label> Password:
                    <input
                        name="password"
                        onChange={handleChange}
                        type="password"
                        placeholder="*****"
                        value={loginInfo.password}
                        required
                    />
                    </label>
                </form>
                <button onClick={handleClick}>submit</button>
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