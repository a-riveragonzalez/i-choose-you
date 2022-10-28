import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
// import { Link } from "react-router-dom";
import { QUERY_USERS } from "../../utils/queries";
import { CREATE_BATTLE } from "../../utils/mutations";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./matches.css";

const Matches = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const [randomUsers, setRandomUsers] = useState([])

  let userArray = data?.users || [];
  console.log(userArray);

  useEffect(() => {
    if (userArray.length > 0) {
      const shuffleThenPickUsers = (users) => {
        console.log("users: ", users);
        let randomUsers= [];

        for (let i = 0; i < 3; i++) {
          randomUsers.push(users[Math.floor(Math.random() * users.length)])
        }

        console.log("randomUsers: ", randomUsers);
        return randomUsers;
      };

      const newUserArray = shuffleThenPickUsers(userArray);
      setRandomUsers(newUserArray);
    }
  }, [userArray]);

  // const shuffleThenPickUsers = async (users) => {
  //   let randomUsers;

  //   if (users.length > 0) {
  //     // shuffle the data array
  //     users.sort(function (a, b) {
  //       return 0.5 - Math.random();
  //     });

  //     // grabs first 3 elements in array and puts them in randomUsers variable
  //     randomUsers = users.slice(0, 3);
  //   }

  //   return randomUsers;
  // };

  // if (!loading) {
  //   shuffleThenPickUsers(userArray);
  // }

  // this is for creating a battle
  const [createBattle, { error }] = useMutation(CREATE_BATTLE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const matchId = event.target.dataset.matchId;

    try {
      await createBattle({
        // variables: { user1_id: id, user2_id: matchId },
      });

      // AuthService.login(data2.login.token);
    } catch (err) {
      console.error(err);
    }

    // navigate(`/battle/${data.createBattle._id}`);
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
              {randomUsers && randomUsers.map((match) => {
                return (
                  <Card key={match.username} style={{ width: "18rem" }}>
                    <Card.Img
                      className="w-100"
                      variant="top"
                      src="https://lorempokemon.fakerapi.it/pokemon/200"
                    />
                    <Card.Body>
                      <Card.Title className="custom-card-title">
                        {match.username}
                      </Card.Title>
                      <Button
                        variant="primary"
                        onClick={handleFormSubmit}
                        className="btn btn-light w-100 custom-card-btn"
                        data-match-id={match._id}
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
