import React from 'react';
import { useLocation } from 'react-router-dom';
import "./notFound.css";
import background from './assets/pikachu4k.png';

function NotFound() {
  let location = useLocation();
  return (
  <div className="custom-class" style={{ backgroundImage: `url(${background})` }}> 
    <div className="card bg-white card-rounded w-60">
      <div className="card-header bg-dark text-center">
        <h1>
          No match for <code>{location.pathname}</code>
        </h1>
      </div>
    </div>
  </div>
  );
}


export default NotFound;
