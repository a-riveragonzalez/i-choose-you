import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link, useNavigate } from "react-router-dom";
import { QUERY_BATTLE } from "../../utils/queries";
import { CREATE_MESSAGE } from "../../utils/mutations";

import "./battle.css";

// battleId : 635c8b4b473aa9387400fe2e
const Battle = () => {
  let { id } = useParams();

  const { loading, data } = useQuery(QUERY_BATTLE, {
    variables: { id: id },
  });

  const messageArray = data?.battle.messages || [];
  const user1 = data?.battle.user1_id._id || [];
  const user1Name = data?.battle.user1_id.username || [];
  const user2 = data?.battle.user2_id._id || [];
  const user2Name = data?.battle.user2_id.username || [];

  // this is for message input
  const [input, setInput] = useState("");

  const [createMessage, { error }] = useMutation(CREATE_MESSAGE);

  // changes the direction of the chat box depending on the user
  const handleTextBoxDirection = (messageUser) => {
    if (messageUser === user1) {
      return "text-box-right";
    } else {
      return "text-box-left";
    }
  };

  // handles message input change
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  //  handles input message and creates new message
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createMessage({
        variables: { battleId: id, messageContent: input },
      });

    } catch (err) {
      console.error(err);
    }

    setInput("");
    window.location.reload()
  };

  return (
    <div className="battle-room">
      {loading ? (
        <div> loading </div>
      ) : (
        <section className="container">
          {/* ************* Battle Title container************* */}
          <div className="battle-header mb-3">
            <h4>
              {user1Name} vs. {user2Name}
            </h4>
          </div>

          {/* ************* MessageList container************* */}
          <div className="text-white">
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
          </div>

          {/* ************* SendMessageForm container************* */}
          <div className="text-white">
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
          </div>
        </section>
      )}
    </div>
  );
};

export default Battle;
