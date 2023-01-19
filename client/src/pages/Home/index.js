import React from "react";

import "./home.css";
import bulbasaurImg from "./bulbasaur-in-the-woods.png";

const Home = () => {
  const imgs = document.querySelectorAll(".home-img");
  const imgContainer = document.querySelector(".img-container");
  console.log(imgs);
  let idx = 0;

  const run = () => {
    idx++;
    changeImage();
  };

  const changeImage = () => {
    if (idx > imgs.length - 1) {
      idx = 0;
    } else if (idx < 0) {
      idx = imgs.length - 1;
    }

    imgContainer.style.transform = `translateX(${-idx * 500}px)`;
  };

  // let interval = setInterval(run, 5000);

  return (
    <>
      <div className="carousel">
        <div className="img-container">
          <img
            src="https://media.gq.com/photos/57b2026444afab8a05bf70f1/16:9/w_2560%2Cc_limit/pokemon-go-still-playing.jpg"
            alt="people playing Pokemon Go"
            className="home-img"
          ></img>
          <img
            src="https://metro.co.uk/wp-content/uploads/2021/03/DSC00180-3c36.jpg?quality=90&strip=all&zoom=1&resize=480%2C319"
            alt="pokemon tcg"
            className="home-img"
          ></img>
          <img
            src="https://i.insider.com/5d25d7a6a17d6c2e1b3b7a15"
            alt="pokemon on Switch Lite"
            className="home-img"
          ></img>
        </div>
      </div>
    </>
  );
};

export default Home;

/*

https://media.gq.com/photos/57b2026444afab8a05bf70f1/16:9/w_2560%2Cc_limit/pokemon-go-still-playing.jpg
https://metro.co.uk/wp-content/uploads/2021/03/DSC00180-3c36.jpg?quality=90&strip=all&zoom=1&resize=480%2C319
https://i.insider.com/5d25d7a6a17d6c2e1b3b7a15


*/
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
