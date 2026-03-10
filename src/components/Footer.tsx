import React from 'react';
import { Heart, Droplets, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand-section">
          <div className="footer-brand">
            <div className="footer-logo-icon">
              <Droplets size={24} />
            </div>
            <h2 className="footer-title">
              Life<span>Link</span>
            </h2>
          </div>
          <p className="footer-desc">
            LifeLink is a dedicated platform for blood donation and emergency response. We connect donors and recipients in real-time to save lives.
          </p>
        </div>

        <div className="footer-links-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/" className="footer-link">Home</a></li>
            <li><a href="/find-blood" className="footer-link">Find Blood</a></li>
            <li><a href="/donate" className="footer-link">Donate</a></li>
            <li><a href="/about" className="footer-link">About Us</a></li>
          </ul>
        </div>

        <div className="footer-contact-section">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-links">
            <li className="footer-contact">
              <Mail size={16} className="footer-contact-icon" /> contact@lifelink.com
            </li>
            <li className="footer-contact">
              <Phone size={16} className="footer-contact-icon" /> +91 98765 43210
            </li>
            <li className="footer-contact">
              <MapPin size={16} className="footer-contact-icon" /> Hyderabad, India
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 LifeLink. All rights reserved.
        </p>
        <p className="footer-credit">
          Designed with <Heart size={16} className="footer-credit-icon" /> by <a href="#">Gujjula Ravithreni</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
