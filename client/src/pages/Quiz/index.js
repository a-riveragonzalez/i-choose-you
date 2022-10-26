import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_QUIZ } from "../../utils/queries";
import "./quiz.css";

const Quiz = () => {
  let currentQuestionIndex = 0;
  let firePoints = 0;
  let waterPoints = 0;
  let grassPoints = 0;

  const { loading, data } = useQuery(QUERY_QUIZ);

  // console.log(data);
  const quizArray = data?.quizzes || [];
  // const [currentQuestion, setCurrentQuestion] = useState(quizArray[currentQuestionIndex]);


  function generateQuestionDiv(quiz) {
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
  };

  // const storeAnswer = (event) => {
  //   event.stopPropagation();

  //   if (event.target === "li"){
      
  //     // currentQuestionIndex += 1
  //   }
  // };

  return (
    <div>
      {loading ? (
        <div> Loading... </div>
      ) : (
        <div className="questions-container m-1">
          {/* <button onClick={() => displayQuestions()}> Start Quiz</button> */}
          {generateQuestionDiv(quizArray[currentQuestionIndex])}
        </div>
      )}

      {/* <div className="card-body m-5">
        <h2>Here is a list of matchups you can vote on:</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="square">
            {matchupList.map((matchup) => {
              return (
                <li key={matchup._id}>
                  <Link to={{ pathname: `/matchup/${matchup._id}` }}>
                    {matchup.tech1} vs. {matchup.tech2}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="card-footer text-center m-3">
        <h2>Ready to create a new matchup?</h2>
        <Link to="/matchup">
          <button className="btn btn-lg btn-danger">Create Matchup!</button>
        </Link>
      </div> */}
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

*/
