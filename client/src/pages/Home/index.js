import React, { useState, useEffect } from "react";

import "./home.css";
import bulbasaurImg from "./bulbasaur-in-the-woods.png";
import pokemonGoImg from './pokemon-go.png';
import pokemonSwitchImg from './pokemon-switch.png';
import pokemonTCGImg from './pokemon-tcg.png';
const imgList = [pokemonGoImg, pokemonSwitchImg, pokemonTCGImg, bulbasaurImg];

const Home = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {

      if (counter === imgList.length - 1) {
        setCounter(0);
      } else {
        setCounter(counter + 1);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <>
      <div className="carousel">
        <div className="img-container">
          <img
            src={imgList[counter]}
            alt="people playing Pokemon"
            className="home-img"
          ></img>
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
