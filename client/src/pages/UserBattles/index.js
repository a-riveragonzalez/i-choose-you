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

  return (
    <div>
      {loading ? (
        <div> loading </div>
      ) : (
        <section className="container">
          {/* ************* Battle Title container************* */}
          <div className="battle-header mb-5 custom-battle-header">
            <h3 className="user pt-1">here are your current battles:</h3>
          </div>

          {/* ************* Battle List container************* */}
          <div className="text-white">
            <section>
              {userBattleArr &&
                userBattleArr.map((battles) => {
                  return (
                    <Card key={battles._id} className="battle-list-container row bg-white">
                      <Card.Body className="custom-battle-list col-8 text-center">
                        {battles.user1_id.username} vs.{" "}
                        {battles.user2_id.username}
                      </Card.Body>
                      <Link to= {`/battle/${battles._id}`} className="col-4 my-2 mobile-btn">
                        <button class="btn btn-light continue-battle-btn">
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
