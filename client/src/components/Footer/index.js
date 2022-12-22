import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="w-100 mt-auto p-1">
      <div className="text-center mb-1 ">
        {/* <h4 className='footer-font'>
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
        </h4> */}
        <p className="footer-font my-1">
          Team <span className="rocket">R</span>ocket | Copyright <span>&copy;</span> 2022 | <a href="https://github.com/a-riveragonzalez/i-choose-you">
          <i class="fa-brands fa-github fa-lg"></i> 
        </a>
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;
