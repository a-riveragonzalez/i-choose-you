import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

import Navigation from './Navigation';

const Header = () => {


  return (
    <header className="mb-4 pt-3 text-center">
      <div className="justify-space-between-lg justify-center align-center">

          <h1 className="page-title">I ChOoSe YoU!</h1>

      </div>
        <Navigation/>
    </header>
  );
};

export default Header;
