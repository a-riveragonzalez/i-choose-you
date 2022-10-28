import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { QUERY_USERS } from "../../utils/queries";
import { CREATE_BATTLE } from "../../utils/mutations";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./matches.css";

const Matches = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_USERS);
  const [randomUsers, setRandomUsers] = useState([]);

  let userArray = data?.users || [];
  console.log(userArray);

  // this creates three random matches from the user array
  useEffect(() => {
    if (userArray.length > 0) {
      const shuffleThenPickUsers = (users) => {
        console.log("users: ", users);
        let randomUsers = [];

        for (let i = 0; i < 3; i++) {
          randomUsers.push(users[Math.floor(Math.random() * users.length)]);
        }

        console.log("randomUsers: ", randomUsers);
        return randomUsers;
      };

      const newUserArray = shuffleThenPickUsers(userArray);
      setRandomUsers(newUserArray);
    }
  }, [userArray]);

  // this is for creating a battle
  const [createBattle, { error }] = useMutation(CREATE_BATTLE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const matchId = event.target.dataset.matchId;
    console.log(matchId)

    try {
      const { data1 } = await createBattle({
        variables: { user2_id: matchId },
      });
      navigate(`/battle/${data1.createBattle._id}`);
    } catch (err) {
      console.error(err);
    }
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
              {randomUsers &&
                randomUsers.map((match) => {
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
