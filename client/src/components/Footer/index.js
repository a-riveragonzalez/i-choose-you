import React from 'react';
import "./footer.css";


const Footer = () => {
  return (
    <footer className="w-100 mt-auto p-4">
      <div className="text-center mb-5 footer-font">
        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by Team Rocket 
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
