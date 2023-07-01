import { Routes, Route, Link } from "react-router-dom"
import Home from "./Home"
import Expenses from "./Expenses"
import Income from "./Income"
import Nav from "./Nav"
import './App.css'


function App() {

  return (
    <div>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/expenses">Expenses page</Link>
        <Link to="/income">Income page</Link>
      </Nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="income" element={<Income/>}/>
        <Route path="expenses" element={<Expenses/>}/>
      </Routes>
    </div>
  )
}

export default App
