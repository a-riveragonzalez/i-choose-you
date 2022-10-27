import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_QUIZ } from "../../utils/queries";
import { UPDATE_USER_TYPE } from "../../utils/mutations";
import "./quiz.css";

let firePoints = { points: 0, pokemonType: "fire" };
let waterPoints = { points: 0, pokemonType: "water" };
let grassPoints = { points: 0, pokemonType: "grass" };

const Quiz = () => {
  let currentQuestionIndex = 0;
  let speed = 50;
  let i = 0;
  // let j = 0;

  const { loading, data } = useQuery(QUERY_QUIZ);
  const [updateUserType, { error }] = useMutation(UPDATE_USER_TYPE);
  const quizArray = data?.quizzes || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userType, setUserType] = useState("");

  let txt;
  // let txt2;

  useEffect(() => {
    if (currentQuestion > 0 && currentQuestion < quizArray.length) {
      txt = quizArray[currentQuestion].question;
      // for (let i = 0; i<quizArray[currentQuestion].choices.length; i++){
      //   txt2 += quizArray[currentQuestion].choices[i].answer;
      // }
      typeWriter();
    }
  }, [currentQuestion]);

  function typeWriter() {
    let timer;
    // let timer2;
    if (i < txt.length) {
      document.querySelector(".question").textContent += txt.charAt(i);
      i++;
      timer = setTimeout(typeWriter, speed);
    } else {
      clearTimeout(timer);
    }
  }

  const handleOptionClick = (pokemonType) => {
    switch (pokemonType) {
      case "fire":
        firePoints.points += 1;
        break;
      case "water":
        waterPoints.points += 1;
        break;
      case "grass":
        grassPoints.points += 1;
        break;
    }
    // console.log(firePoints, waterPoints, grassPoints);
    if (currentQuestion === 11) {
      setUserType(calculateType().pokemonType);
      console.log(userType);
      // updateUserType(userType);
      //TODO: calculate their type via a different function and update the User (may need to make a new mutation)
    }
    if (currentQuestion < quizArray.length) {
      setCurrentQuestion(currentQuestion + 1);
      document.querySelector(".question").textContent = "";
    }
  };

  const calculateType = () => {
    let possibleTypes = [];
    let pokemonType;

    if (
      firePoints.points !== grassPoints.points &&
      firePoints.points !== waterPoints.points
    ) {
      if (
        firePoints.points > grassPoints.points &&
        firePoints.points > waterPoints.points
      ) {
        pokemonType = firePoints;
      } else if (
        grassPoints.points > firePoints.points &&
        grassPoints.points > waterPoints.points
      ) {
        pokemonType = grassPoints;
      } else if (
        waterPoints.points > firePoints.points &&
        waterPoints.points > grassPoints.points
      ) {
        pokemonType = waterPoints;
      }
    } else if (
      firePoints.points === grassPoints.points &&
      firePoints.points !== waterPoints.points
    ) {
      possibleTypes = [firePoints, grassPoints];
      pokemonType =
        possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
    } else if (
      firePoints.points === waterPoints.points &&
      firePoints.points !== grassPoints.points
    ) {
      possibleTypes = [firePoints, waterPoints];
      pokemonType =
        possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
    } else if (
      grassPoints.points === waterPoints.points &&
      firePoints.points !== grassPoints.points
    ) {
      possibleTypes = [grassPoints, waterPoints];
      pokemonType =
        possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
    }

    return pokemonType;
  };

  return (
    <div>
      {loading ? (
        <div> Loading... </div>
      ) : (
        <div className="questions-container m-1">
          {console.log(currentQuestion)}
          {currentQuestion < quizArray.length ? (
            <div className="text-box">
              <div className="question"></div>
              <ListGroup className="choices">
                {quizArray[currentQuestion].choices.map((choice) => (
                  <ListGroup.Item
                    className="option"
                    onClick={() => handleOptionClick(choice.pokemonType)}
                    key={(currentQuestionIndex += 1)}
                  >
                    <span className="arrow">{"> "}</span>
                    {choice.answer}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          ) : (
            <div className="results text-box">
              <div>You are most likely to be a {userType} type!</div>
              <button>Continue</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
