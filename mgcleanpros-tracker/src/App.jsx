import About from "./About"
import Home from "./Home"
import Nav from "./Nav"
import Vans from "./Vans"
import Footer from "./Footer"
import {Routes, Route, Link} from "react-router-dom"
export default function App() {
    return (
      <div className="app">
        <Nav>
            <Link to="/" className="home-link">#VANLIFE</Link>
            <nav>
                <Link to="/about" className="about-link">About</Link>
                <Link to="/vans" className="vans-link">Vans</Link>
            </nav>
        </Nav>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/vans" element={<Vans/>} />
        </Routes>
        <Footer />
      </div>
    )
  }
  