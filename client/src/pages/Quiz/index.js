import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_QUIZ } from "../../utils/queries";
import { QUERY_POKEMONGOS } from "../../utils/queries";
import { UPDATE_USER_TYPE } from "../../utils/mutations";
import "./quiz.css";

let firePoints = {
  points: 0,
  pokemonType: "fire",
  color: "#F07F2F",
  description:
    "You are energetic and love to have fun with everybody. You tackle all obstacles in your way with stride. You may have a tendency to act before you think or get emotional easily. You only life once, so might as well make the most out of your life!",
};
let waterPoints = {
  points: 0,
  pokemonType: "water",
  color: "#6890F0",
  description:
    "You are level-headed and probably one of the most chill people on the planet. You don't like to be bothered and would prefer to keep a low profile. People may think of you as cold sometimes, but you're easy to talk to and are always down to vibe in silence.",
};
let grassPoints = {
  points: 0,
  pokemonType: "grass",
  color: "#78C750",
  description:
    "You are kind, caring, and serene. People may say your presence is soothing. You're probably a plant parent (if not, you might be in the future). You prefer relaxing at home than going out, but you might be socially awkward with other people.",
};

const Quiz = () => {
  // VARIABLES
  let currentQuestionIndex = 0; // key for mapping choices
  let speed = 50; // for typeWriter
  let i = 0; // for typeWriter
  // let j = 0;

  // QUERIES AND MUTATIONS
  const { loading, data } = useQuery(QUERY_QUIZ);
  const quizArray = data?.quizzes || [];

  const { loading: loading2, data: pokemonData } = useQuery(QUERY_POKEMONGOS);
  const pokemonArray = pokemonData?.pokemongos || [];

  const [updateUserType, { error: error1 }] = useMutation(UPDATE_USER_TYPE);
  
  // STATES TO BE USED
  const [currentQuestion, setCurrentQuestion] = useState(0); // index of current question (used in array)
  const [userType, setUserType] = useState(""); // user's pokemonType
  const [spanColor, setSpanColor] = useState({}); // pokemonType color
  const [personalityDescription, setPersonalityDescription] = useState(""); // user's personality result
  // states for the pokemon data
  const [firePokemonState, setFirePokemonState] = useState([]);
  const [waterPokemonState, setWaterPokemonState] = useState([]);
  const [grassPokemonState, setGrassPokemonState] = useState([]);

  let txt;
  // let txt2;

  useEffect(() => {
    // set the txt variable to the current question's text (used for typeWriter function)
    if (currentQuestion > 0 && currentQuestion < quizArray.length) {
      txt = quizArray[currentQuestion].question;
      // for (let i = 0; i<quizArray[currentQuestion].choices.length; i++){
      //   txt2 += quizArray[currentQuestion].choices[i].answer;
      // }
      typeWriter();
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (pokemonArray.length) {
      const firePokemon = pokemonArray.filter(function (pokemon) {
        // console.log(pokemon);
        return pokemon.pokemonType === "fire";
      });
      setFirePokemonState(firePokemon);

      const waterPokemon = pokemonArray.filter(function (pokemon) {
        // console.log(pokemon);
        return pokemon.pokemonType === "water";
      });
      setWaterPokemonState(waterPokemon);

      const grassPokemon = pokemonArray.filter(function (pokemon) {
        // console.log(pokemon);
        return pokemon.pokemonType === "grass";
      });
      setGrassPokemonState(grassPokemon);
    }
  }, [pokemonArray]);

  // useEffect(() => {
  //   console.log(firePokemonState, waterPokemonState, grassPokemonState);
  // }, [firePokemonState, waterPokemonState, grassPokemonState])

  // creates a typewriter animation for each question
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

  // when an option has been clicked for the question, grab the pokemonType from the choice and add it to each pokemon type object
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

    // if the currentQuestion index is 11, calculate how many points they have and assign them a type
    // set the corresponding states to be updated for the result div
    if (currentQuestion === 11) {
      // calculate points and choose pokemonType
      const result = calculateType();
      console.log(pokemonArray);

      // set states
      setUserType(result.pokemonType); // fire, grass, or water
      setSpanColor({ color: result.color });
      setPersonalityDescription(result.description);

      // updates the logged-in user's pokemonType
      try {
        let resultArray;
        switch (result.pokemonType) {
          case "fire":
            resultArray = firePokemonState;
            break;
          case "water":
            resultArray = waterPokemonState;
            break;
          case "grass":
            resultArray = grassPokemonState;
            break;
        }

        const randomIndex = Math.floor(Math.random() * resultArray.length);
        const randomPokemon = resultArray[randomIndex]._id;
        updateUserType({ variables: { pokemonType: result.pokemonType, pokemon: randomPokemon } });
      } catch (err) {
        console.log(err);
      }

    }

    // if the currentQuestion is less than the length of the quizArray (12)
    // add 1 to currentQuestion and update the state
    // clear the question text content and repeat the typeWriter() code
    if (currentQuestion < quizArray.length) {
      setCurrentQuestion(currentQuestion + 1);
      document.querySelector(".question").textContent = "";
    }
  };

  // function to calculate points and determine the user's pokemonType
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
            <div className="results text-box text-center">
              <div>
                <p>
                  You are a <span style={spanColor}>{userType}</span> type!
                </p>
                <p>{personalityDescription}</p>
              </div>
              <Link to="/">
                <button className="btn btn-light continue-btn">Continue</button>{" "}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
