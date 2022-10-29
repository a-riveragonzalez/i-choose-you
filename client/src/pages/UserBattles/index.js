import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { QUERY_BATTLES } from "../../utils/queries";
import Card from "react-bootstrap/Card";
import AuthService from "../../utils/auth";

import "./userBattles.css";

const UserBattles = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_BATTLES);
  const [userBattleArr, setUserBattleArr] = useState([]);

  let battleArray = data?.battles || [];
  console.log(battleArray);

  // finds logged in user's _id
  const userId = AuthService.getProfile().data._id;
  console.log(userId);

  // this creates three random matches from the user array
  useEffect(() => {
    if (battleArray.length > 0) {
      const getUserBattles = (battle) => {
        console.log("battle ", battle);
        let tempBattles = [];

        // todo for loop, if battles.userid === user's id then push it into temp arr then return temp arr
        for (let i = 0; i < battleArray.length; i++) {
          console.log("forloop : ");
          if (
            battle[i].user1_id._id === userId ||
            battle[i].user2_id._id === userId
          ) {
            console.log("if statment");
            tempBattles.push(battle[i]);
          }
        }

        console.log("tempBattles", tempBattles);
        return tempBattles;
      };

      const newBattleArray = getUserBattles(battleArray);
      console.log("newBattleArray : ", newBattleArray);

      setUserBattleArr(newBattleArray);
    }
  }, [battleArray]);

  //  handles input message and creates new message
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(event)

  //   navigate(`/battle/${--event.something--}`);
  // };

  return (
    <div>
      {loading ? (
        <div> loading </div>
      ) : (
        <section className="container">
          {/* ************* Battle Title container************* */}
          <div className="battle-header mb-3">
            <h4>Here are your current battles</h4>
          </div>

          {/* ************* Battle List container************* */}
          <div className="text-white">
            <section className="row">
              {userBattleArr &&
                userBattleArr.map((battles) => {
                  return (
                    <Card key={battles._id}>
                      <Card.Body className="text-danger">
                        {battles.user1_id.username} vs.{" "}
                        {battles.user2_id.username}
                      </Card.Body>
                      <Link to= {`/battle/${battles._id}`} >
                        <button class="btn btn-light continue-btn">
                          Continue Battle
                        </button>
                      </Link>
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

export default UserBattles;
