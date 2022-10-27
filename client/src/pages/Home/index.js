import React, { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER } from "../../utils/queries";
import "./home.css";
import AuthService from "../../utils/auth";

const Home = () => {
  const { loading, data } = useQuery(QUERY_USER);
  console.log(data);

  const userData = data?.user || {};
  // navigate to personal profile page if username is yours
  // if (AuthService.loggedIn() && AuthService.getProfile().data.username === userParam) {
  //   return <Navigate to="/" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userData.username ? `${userData.username}'s` : "your"}{" "}
          profile.
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
