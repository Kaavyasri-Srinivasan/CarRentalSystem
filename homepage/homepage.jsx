/*import React from 'react';
import './homepage.css';


const Homepage = () => {
    return (
    <div className="homepage-container">*/
           // {/* Navigation Bar */  //}
        //    <nav id="navbar">
        //        <div className='logo'>CarRental</div>
        //        <ul className='navLinks'>
        //            <li><a href="/login" className='link'>Login</a></li>
        //            <li><a href="/about" className='link'>About Us</a></li>
        //            <li><a href="/contact" className='link'>Contact Us</a></li>
        //        </ul>
        //    </nav>

 //          {/* Hero Section */}
 //          <section id="hero">
 //              <h1 className="hero-title">Welcome to CarRental</h1>
 //              <p className="hero-desc">Find the best cars for rent at affordable prices!</p>
 //          </section>

 //          {/* About Us Section */}
 //          <section className="about-section">
 //              <h2>About Us</h2>
 //              <p>
 //                  CarRental is dedicated to providing top-quality vehicles and excellent customer service.<br />
 //                  Whether you need a car for business or leisure, we have the perfect option for you.
 //              </p>
 //          </section>

 //          {/* Contact Us Section */}
 //          <section className="contact-section">
 //              <h2>Contact Us</h2>
 //              <p><strong>Email:</strong> support@carrental.com</p>
 //              <p><strong>Phone:</strong> +1 234 567 890</p>
 //          </section>

 //          {/* Footer */}
 //          <footer id="footer">
 //              <p>&copy; {new Date().getFullYear()} CarRental. All rights reserved.</p>
 //          </footer>
 //      </div>
 //   );
//};


//export default Homepage;

// homepage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './homepage.css';

const Homepage = () => {
    return (
    <div className="homepage-container">
            {/* Navigation Bar */}
            <nav id="navbar">
                <div className='logo'>CarRental</div>
                <ul className='navLinks'>
                    <li><Link to="/login" className='link'>Login</Link></li>
                    <li><Link to="/about" className='link'>About Us</Link></li>
                    <li><Link to="/contact" className='link'>Contact Us</Link></li>
                </ul>
            </nav>
            {/* Hero Section */}
            <section id="hero">
                <h1 className="hero-title">Welcome to CarRental</h1>
                <p className="hero-desc">Find the best cars for rent at affordable prices!</p>
            </section>
            {/* About Us Section */}
            <section className="about-section">
                <h2>About Us</h2>
                <p>
                    CarRental is dedicated to providing top-quality vehicles and excellent customer service.<br />
                    Whether you need a car for business or leisure, we have the perfect option for you.
                </p>
            </section>
            {/* Contact Us Section */}
            <section className="contact-section">
                <h2>Contact Us</h2>
                <p><strong>Email:</strong> support@carrental.com</p>
                <p><strong>Phone:</strong> +1 234 567 890</p>
            </section>
            {/* Footer */}
            <footer id="footer">
                <p>&copy; {new Date().getFullYear()} CarRental. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;