import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import pokeballimg from "./smallpokeball.png";

import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="mb-4 pt-3 text-center ">
      <div className="justify-space-between justify-center align-center row">
        <div className="col-12 col-md-5">
          <h1 className="row justify-center">
            <img
              src={pokeballimg}
              alt="pokeball icon"
              className="nav-icon "
            ></img>{" "}
            <p className="page-title ">I ChOoSe YoU!</p>
          </h1>
        </div>
        <div className="col-12 col-md-5">
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
