import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
// import { Link } from "react-router-dom";
import { QUERY_USERS } from "../../utils/queries";
import { CREATE_BATTLE } from "../../utils/mutations";
import "./matches.css";

const Matches = () => {
  const { loading, data } = useQuery(QUERY_USERS);

  const userArray = data?.users || [];
  console.log(userArray);

  const shuffleThenPickUsers = (users) => {
    let randomUsers;

    if (users.length > 0) {
      // shuffle the data array
      users.sort(function (a, b) {
        return 0.5 - Math.random();
      });

      // grabs first 3 elements in array and puts them in randomUsers variable
      randomUsers = users.slice(0, 3)      
    }

    return randomUsers;
  };

  console.log(shuffleThenPickUsers(["A", "B", "C", "D", "E", "F"]))

  // this is for message input
  // const [input, setInput] = useState("");

  // const [createMessage, { error }] = useMutation(CREATE_MESSAGE);

  // changes the direction of the chat box depending on the user
  // const handleTextBoxDirection = (messageUser) => {
  //   if (messageUser === user1) {
  //     return "text-box-right";
  //   } else {
  //     return "text-box-left";
  //   }
  // };

  // handles message input change
  // const handleInputChange = (event) => {
    // setInput(event.target.value);
  // };

  // const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // try {
    //   const { data } = await createMessage({
    //     variables: { id: id, messageContent: input },
    //   });
    //   navigate(`/matchup/${data.createMatchup._id}`);
    // } catch (err) {
    //   console.error(err);
    // }
    // setInput("");
  // };

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

          {/* ************* MessageList container************* */}
          <div className="text-white">
            <ul className="message-list">
              {shuffleThenPickUsers(userArray).map((match) => {
                return (
                  <li
                    key={match._id}
                    className= "mb-3 text-box-message"
                  >
                    <div>hello!</div>
                    {/* <div>{message.user.username}</div> */}
                    {/* <div>{message.messageContent}</div> */}
                  </li>
                );
              })}
            </ul>
          </div> 

          {/* ************* SendMessageForm container************* */}
          {/* <div className="text-white">
            <div className="form-group">
              <textarea
                name="message"
                value={input}
                onChange={handleInputChange}
                type="text"
                placeholder="message"
                className="form-control text-box-message"
                rows="3"
              />
              <button
                type="submit"
                onClick={handleFormSubmit}
                className="btn btn-light message-btn"
              >
                Send
              </button>
            </div>
          </div> */}
        </section>
      )}
    </div>
  );
};

export default Matches;
