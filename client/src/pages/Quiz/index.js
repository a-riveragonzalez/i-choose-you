import React, { useState } from "react";
// import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import { useQuery } from "@apollo/client";
import { QUERY_QUIZ } from "../../utils/queries";
import "./quiz.css";

let firePoints = 0;
let waterPoints = 0;
let grassPoints = 0;

const Quiz = () => {
  let currentQuestionIndex = 0;
  let speed = 50;
  let i = 0;

  const { loading, data } = useQuery(QUERY_QUIZ);

  // console.log(data);
  const quizArray = data?.quizzes || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function typeWriter() {
    let txt = document.querySelector(".text-box").innerHTML;
    if (i < txt.length) {
      document.querySelector(".text-box").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
 
   const handleOptionClick = (pokemonType) => {
    switch (pokemonType) {
      case "fire":
        firePoints += 1;
        break;
      case "water":
        waterPoints += 1;
        break;
      case "grass":
        grassPoints += 1;
        break;
    }

    // console.log(firePoints, waterPoints, grassPoints);

    if (currentQuestion < quizArray.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("You're done!");
      //calculate their type via a different function and update the User
    }
  };
//  typeWriter();
  

  return (
    <div>
      {loading ? (
        <div> Loading... </div>
      ) : (
        <div className="questions-container m-1">
          <div className="text-box">
            {quizArray[currentQuestion].question}
            <ListGroup>
              {quizArray[currentQuestion].choices.map((choice) => (
                <ListGroup.Item
                  className="option"
                  onClick={() => handleOptionClick(choice.pokemonType)}
                  key={(currentQuestionIndex += 1)}
                >
                  <span className="arrow">{">  "}</span>{choice.answer}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;

/*

return (
      <div className="text-box">
        <h5>{quiz.question}</h5>
        <ul>
          <li className="option">{quiz.choices[0].answer}</li>
          <li className="option">{quiz.choices[1].answer}</li>
          <li className="option">{quiz.choices[2].answer}</li>
        </ul>
      </div>
    );


      // const displayQuestions = () => {
  //   const quiz = quizArray[currentQuestionIndex];
  //   console.log(quiz);

  //   generateQuestionDiv(quiz);

  //   if (currentQuestionIndex === quizArray.length - 1) {
  //     currentQuestionIndex = 0;
  //     // show quiz result
  //   } else {
  //     currentQuestionIndex += 1;
  //   }
  // };


  // function generateQuestionDiv(quiz) {
  //   return (
  //     <div className="text-box">
  //       <h5>{quiz.question}</h5>
  //       <ul>
  //         <li className="option">{quiz.choices[0].answer}</li>
  //         <li className="option">{quiz.choices[1].answer}</li>
  //         <li className="option">{quiz.choices[2].answer}</li>
  //       </ul>
  //     </div>
  //   );
  // };

  // const storeAnswer = (event) => {
  //   event.stopPropagation();

  //   if (event.target === "li"){
      
  //     // currentQuestionIndex += 1
  //   }
  // };*/
