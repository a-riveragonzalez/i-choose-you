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
          // if not (!) the token's user id matches with the random index ID
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
    console.log(matchId);

    try {
      console.log("I am in the try");
      const { data } = await createBattle({
        variables: { user2Id: matchId },
      });
      navigate(`/battle/${data.createBattle._id}`);
    } catch (err) {
      console.error(err);
    }

    console.log("I am outside the try");
  };

  return (
    <div className="battle-room">
      {loading ? (
        <div> loading... </div>
      ) : (
        <section className="container">
          {/* ************* Matches Title container************* */}
          <div className="matches-header mb-3 p-2">
            <h4 className="user">
              here are your three potential matches. Battle to see if this
              trainer joins you on an adventure
            </h4>
          </div>

          {/* ************* Matches container************* */}
          <div className="text-white">
            <section className="row justify-center">
              {randomUsers &&
                randomUsers.map((match) => {
                  return (
                    <Card key={match.username} style={{ width: "18rem" }} className= "bg-white match-cards">
                      <Card.Img
                        className="w-100"
                        variant="top"
                        src={match.pokemon.pokemonImg}
                      />
                      <Card.Body>
                        <Card.Title className="custom-card-title mb-3">
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
            </section>
          </div>
        </section>
      )}
    </div>
  );
};

export default Matches;
