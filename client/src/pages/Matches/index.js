import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
// import { Link } from "react-router-dom";
import { QUERY_USERS } from "../../utils/queries";
import { CREATE_BATTLE } from "../../utils/mutations";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./matches.css";

const Matches = () => {
  const { loading, data } = useQuery(QUERY_USERS);

  const userArray = data?.users || [];
  console.log(userArray);

  const shuffleThenPickUsers = async (users) => {
    let randomUsers;

    if (users.length > 0) {
      // shuffle the data array
      users.sort(function (a, b) {
        return 0.5 - Math.random();
      });

      // grabs first 3 elements in array and puts them in randomUsers variable
      randomUsers = users.slice(0, 3);
    }

    return [...randomUsers];
  };

  // if (!loading) {
  //   shuffleThenPickUsers(userArray);
  // }

  // console.log(shuffleThenPickUsers(["A", "B", "C", "D", "E", "F"]))

  // this is for message input
  // const [input, setInput] = useState("");

  // const [createMessage, { error }] = useMutation(CREATE_MESSAGE);

  // changes the direction of the chat box depending on the user
  // const handleTextBoxDirection = (messageUser) => {
  //   if (messageUser === user1) {
  //     return "text-box-right";
  //   } else {
  //     return "text-box-left";
  //   }
  // };

  // handles message input change
  // const handleInputChange = (event) => {
  // setInput(event.target.value);
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("you picked this person");
    console.log(event.target.dataset.matchId);
  };

  return (
    <div className="battle-room">
      {loading ? (
        <div> loading... </div>
      ) : (
        <section className="container">
          {/* ************* Matches Title container************* */}
          <div className="battle-header mb-3">
            <h4>
              here are your three potential matches. Battle to see if this
              trainer joins you on an adventure
            </h4>
          </div>

          {/* ************* Matches container************* */}
          <div className="text-white">
            <ul className="message-list">
              {userArray.map((match) => {
                return (
                  <Card key={match.username} style={{ width: "18rem" }}>
                    <Card.Img
                      className="w-100"
                      variant="top"
                      src="https://lorempokemon.fakerapi.it/pokemon/200"
                    />
                    <Card.Body>
                      <Card.Title className="custom-card-title">{match.username}</Card.Title>
                      <Button
                        variant="primary"
                        onClick={handleFormSubmit}
                        className="btn btn-light w-100 custom-card-btn"
                        data-match-id={match.username}
                      >
                        Battle
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

export default Matches;
