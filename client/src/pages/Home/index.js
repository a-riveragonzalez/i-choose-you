import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-carousel-minimal";

import "./home.css";
import bulbasaurImg from "./bulbasaur-in-the-woods.png";
import pokemonGoImg from "./pokemon-go.png";
import pokemonSwitchImg from "./pokemon-switch.png";
import pokemonTCGImg from "./pokemon-tcg.png";
import plusleAndMinun from './plusle-minun.png';

const data = [
  { image: pokemonGoImg, caption: "" },
  { image: pokemonSwitchImg, caption: "" },
  { image: pokemonTCGImg, caption: "" },
  { image: bulbasaurImg, caption: "" },
];

const Home = () => {
  return (
    <>
      <div className="carousel-div">
        <Carousel
          className="carousel"
          data={data}
          time={5000}
          slideNumber={false}
          slideBackgroundColor="darkgrey"
          thumbnails={false}
          automatic={true}
          dots={true}
          width="100%"
          height="auto"
          radius="10px"
          showNavBtn={false}
        />
        <div className="slogan-div">
          <h1>
            BUILD A COMMUNITY<br></br> WITH POKEMON FANS
          </h1>
          <p>
            Need to trade Pokemon to fill your Pokedex? <br></br> Want to find
            someone to battle? <br></br>
            Looking for a group of friends with similar interests?
          </p>
          <p>
            I Choose You! is a Pokemon social media app that connects you with
            other people playing the same games! You can connect with people,
            chat with them, and build your own Pokemon community.
          </p>
          <p>Sign up and get started!</p>
          <Link to="/signup">
            <button className="sign-up-btn">SIGN UP NOW</button>
          </Link>
        </div>
      </div>

      <hr></hr>


        <div className="summary-flex">
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className="plusle-minun-container">
            <img src={plusleAndMinun} alt="pokemon pair"/>
          </div>
        </div>


      <hr></hr>

      <div className="features-container">
        <div class="starter-section">
          <div className="feature-box">PICS GO HERE</div>
          <div className="feature-desc">DESC GOES HERE</div>
        </div>
        <div class="chat-section">
          <div className="feature-desc">DESC GOES HERE</div>
          <div className="feature-box">PICS GO HERE</div>
          
        </div>
      </div>
    </>
  );
};

export default Home;

{
  /* <h4 className="oak-warning p-2">
          Hey, you can't ride your bike in here! <br></br>You need to be logged
          in to see this. Use the navigation links above to sign up or log in!
        </h4> */
}
{
  /* <img
            className=""
            src={bulbasaurImg}
            alt="bulbasaur"
          /> */
}

{
  /* <div className="img-container">
          <img
            src={imgList[counter]}
            alt="people playing Pokemon"
            className="home-img"
          ></img>
        </div> */
}
// const [counter, setCounter] = useState(0);

// useEffect(() => {
//   const intervalId = setInterval(() => {
//     if (counter === imgList.length - 1) {
//       setCounter(0);
//     } else {
//       setCounter(counter + 1);
//     }
//   }, 5000);

//   return () => clearInterval(intervalId);
// }, [counter]);
