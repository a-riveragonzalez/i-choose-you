import React from 'react';
import "./footer.css";


const Footer = () => {
  return (
    <footer className="w-100 mt-auto p-1">
      <div className="text-center mb-1 ">
        <h4 className='footer-font'>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by Team <span className="rocket">R</span>ocket 
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
