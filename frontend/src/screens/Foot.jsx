import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faInstagram, faTwitter, faGithub, faDribbble } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import "../style/Footer.css";

function Foot() {
  return (
    <div className="App">
      <footer className="footer">
        <div className="container">
          <div className="footer-section">
            <img src="https://storage.googleapis.com/a1aa/image/jNsNXIOahEdblCbVVOgQ9xvW0h1PhUwRnvGkeDuEkKk.jpg" alt="Company Logo" className="logo" />
            <p className="description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa cum itaque neque.
            </p>
            {/* <div className="social-icons">
              <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faDribbble} /></a>
            </div> */}
          </div>
          <div className="footer-section">
            <h3>About Us</h3>
            <ul>
              <li><a href="#">Company History</a></li>
              <li><a href="#">Meet the Team</a></li>
              <li><a href="#">Employee Handbook</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Our Services</h3>
            <ul>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Marketing</a></li>
              <li><a href="#">Google Ads</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Helpful Links</h3>
            <ul>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Live Chat</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              {/* <li><FontAwesomeIcon icon={faEnvelope} /> john@doe.com</li>
              <li><FontAwesomeIcon icon={faPhone} /> 0123456789</li>
              <li><FontAwesomeIcon icon={faMapMarkerAlt} /> 213 Lane, London, United Kingdom</li> */}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Foot;