import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { QUERY_BATTLES } from "../../utils/queries";

import "./userBattles.css";

// battleId : 635c8b4b473aa9387400fe2e
const UserBattles = () => {

  const { loading, data } = useQuery(QUERY_BATTLES);

  let battleArray = data?.battles || [];
  console.log(battleArray)


  //  handles input message and creates new message
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     await createMessage({
  //       variables: { battleId: id, messageContent: input },
  //     });

  //   } catch (err) {
  //     console.error(err);
  //   }

  //   setInput("");
  //   window.location.reload()
  // };

  return (
    <div>
      {loading ? (
        <div> loading </div>
      ) : (
        <section className="container">
          {/* ************* Battle Title container************* */}
          <div className="battle-header mb-3">
            <h4>
              Here are your current battles
            </h4>
          </div>

          {/* ************* MessageList container************* */}
          {/* <div className="text-white">
            <ul className="message-list">
              {messageArray.map((message) => {
                return (
                  <li
                    key={message._id}
                    className={`mb-3 text-box-message ${handleTextBoxDirection(
                      message.user._id
                    )}`}
                  >
                    <div>{message.user.username}</div>
                    <div>{message.messageContent}</div>
                  </li>
                );
              })}
            </ul>
          </div> */}

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

export default UserBattles;
