import React from 'react';
import {Link} from 'react-router-dom';
import '../style2.css';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">

            <li className="nav-item active">
            <Link to="/Home" class="nav-link active"><img src="http://localhost/630_Project/Assets/laptop.jpg" width="40" height="50" alt="laptop"></img></Link>
            </li>

            <li className="nav-item active">
            <Link to="/" class="nav-link active">Home</Link>
            </li>
      
            <li className="nav-item">
            <Link to="/Register" class="nav-link active">Register</Link>
            </li>
      
            <li className="nav-item">
            <Link to="/Login" class="nav-link active">Login</Link>
            </li>
            
            <li className="nav-item">
            <Link to="/ElectronicList" class="nav-link active">Shop</Link>
            </li>

            <li className="nav-item">
            <Link to="/Services" class="nav-link active">Types of Services</Link>
            </li>

            <li className="nav-item">
            <Link to="/Reviews" class="nav-link active">Reviews</Link>
            </li>

            <li className="nav-item">
            <Link to="/Contact" class="nav-link active">Contact Us</Link>
            </li>
            
            <li className="nav-item">
            <Link to="/About" class="nav-link active">About Us</Link>
            </li>

        </ul>
        <span className="navbar-text">
          
        </span>
      </div>
    </nav>
    )
}

export default Header;