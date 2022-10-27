import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
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
  // let j = 0;

  const { loading, data } = useQuery(QUERY_QUIZ);
  const quizArray = data?.quizzes || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  let txt;
  // let txt2;
  
  useEffect(() => {
    if (currentQuestion > 0) {
      txt = quizArray[currentQuestion].question;
      // for (let i = 0; i<quizArray[currentQuestion].choices.length; i++){
      //   txt2 += quizArray[currentQuestion].choices[i].answer;
      // }
      typeWriter();
      console.log("State updated");
    }
  }, [currentQuestion]);

  // console.log(data);

  function typeWriter() {
    let timer;
    let timer2;
    if (i < txt.length) {
      console.log(i, txt.length);
      document.querySelector(".question").textContent += txt.charAt(i);
      i++;
      timer = setTimeout(typeWriter, speed);
    } else{
      clearTimeout(timer);
     
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
    // typeWriter();
    // console.log(firePoints, waterPoints, grassPoints);

    if (currentQuestion < quizArray.length) {
      setCurrentQuestion(currentQuestion + 1);
      document.querySelector(".question").textContent = "";
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
            <div className="question">
              
            </div>
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
