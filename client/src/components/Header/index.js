import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

import Navigation from './Navigation';

const Header = () => {


  return (
    <header className="mb-4 py-3 text-center">
      <div className="justify-space-between-lg justify-center align-center">
        <Link className="page-title" to="/">
          <h1 className="">I ChOoSe YoU!</h1>
        </Link>
      </div>
        <Navigation/>
    </header>
  );
};

export default Header;
