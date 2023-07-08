import {Link} from "react-router-dom"

export default function About() {
    return (
      <div className="about">
        <img src="./assets/roofsitter.png" className="about-img"></img>
        <div className="about-container">
          <h1 className="about-title">Don't squeeze in a sedan when you could relax in a van.</h1>
          <p className="about-p">Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
          (Hitch costs extra 😉)
          <br></br>
          <br></br>
          Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
          <div className="about-small-div">
            <h2 className="about-small-title">Your destination is waiting.<br></br>Your van is ready.</h2>
            <Link to="/vans" className="find-van-btn2">Explore our vans</Link>
          </div>
        </div>
      </div>
    )
}