import React, { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER } from "../../utils/queries";
import "./home.css";
import AuthService from "../../utils/auth";

const Home = () => {
  const { loading, data } = useQuery(QUERY_USER);
  ;
  const userId = AuthService.getProfile().data._id;
  console.log(userId)

  const userData = AuthService.getProfile().data.username || {};
  // navigate to personal profile page if username is yours
  // if (AuthService.loggedIn() && AuthService.getProfile().data.username === userParam) {
  //   return <Navigate to="/" />;
  // }
  console.log(userData)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return (
      <div className="text">
        <h4>
          Hey, you can't ride your bike in here! <br></br>You need to be logged in to see this. Use the navigation links above
          to sign up or log in!
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
      <div className="flex-row justify-center mb-3">
        <div>

        </div>
        <h2 className="col-12 col-md-10 welcome p-3 mb-5">
          WeLcOmE <span className="user">{userData ? `${userData}, ` : "your"}{" "} </span>
          To ThE WoRlD Of PoKeMoN DaTiNg!
        </h2>

        <div className="col-12 col-md-10 mb-5">
          {/* <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
