import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER } from "../../utils/queries";
import "./home.css";
import AuthService from "../../utils/auth";

const Home = () => {
  const userId = AuthService.getProfile().data._id;
  const { loading, data } = useQuery(QUERY_USER);
  console.log(userId);
  console.log(data);

  const userQuery = data || {};
  const userData = AuthService.getProfile().data.username || {};
  
  console.log(userData);
  console.log(userQuery);

  // const userPokemon = userQuery.user.pokemon.pokemonImg
  
  // console.log(userPokemon)

  if (loading) {
    return <div>Loading...</div>;
  }

  
  
  if (!userData) {
    return (
      <div className="text">
        <h4>
          Hey, you can't ride your bike in here! <br></br>You need to be logged
          in to see this. Use the navigation links above to sign up or log in!
        </h4>
        <div className="img">
          <img
            className="prof"
            src="https://www.androidheadlines.com/wp-content/uploads/2020/02/Professor-Oak-Mew-Trailer-Screenshot.jpg"
            alt="professor-oak"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex-row justify-space-between mb-3">
        <Card className="col-10 col-md-6 col-sm-3 p-3 mb-5 profile">
          {/* <Card.Img src={userPokemon ? `${userPokemon}` : "placeholder"} /> */}
        </Card>
        <Card className="col-10 col-md-6 col-sm-3 p-3 mb-5">
          <Card.Body>
            <h2 className="welcome">
              WeLcOmE{" "}
              <span className="user">
                {userData ? `${userData}, ` : "your"}{" "}
              </span>
              To ThE WoRlD Of PoKeMoN DaTiNg!
            </h2>
          </Card.Body>
        </Card>
      </div>
      <div className="matches">
        <Button
          className="btn btn-light w-100 custom-card-btn"
          variant="primary"
          href="../../matches"
        >
          Poke Matches
        </Button>
      </div>
    </div>
  );
};



export default Home;
