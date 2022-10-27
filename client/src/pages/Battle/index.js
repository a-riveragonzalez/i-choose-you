import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_BATTLE} from "../../utils/queries";
import { CREATE_MESSAGE} from "../../utils/mutations";
import "./battle.css";

// battleId : 63599bed8d4594a72080fe11
const Battle = () => {
  let { id } = useParams();

  const { loading, data } = useQuery(QUERY_BATTLE, {
    variables: { id: id },
  });

  const messageArray = data?.battle.messages || [];
  const user1 = data?.battle.user1_id || [];
  const user2 = data?.battle.user2_id || [];

  // this is for message input 
  const [input, setInput] = useState(''); 

  const [createMessage, { error }] = useMutation(CREATE_MESSAGE);


  // changes the direction of the chat box depending on the user
  const handleTextBoxDirection = (messageUser) => {
    if (messageUser === user1){
      return "text-box-right"
    } else {
      return "text-box-left"
    }
  } 

  // handles message input change 
  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  // todo handles input message
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   const { data } = await createMessage({
    //     variables: { "id": id , "messageContent" : input },
    //   });

    //   navigate(`/matchup/${data.createMatchup._id}`);
    // } catch (err) {
    //   console.error(err);
    // }

    setInput("");
  }

  return (
    <div className="battle-room">
      {loading ? (
        <div> loading </div>
      ) : (
        <section className="container">
          {/* ************* Battle Title container************* */}
          <div className="battle-header mb-3">
            <h4>
              {user1} vs. {user2}
            </h4>
          </div>

          {/* ************* MessageList container************* */}
          <div className="text-white">
            <ul className="message-list">
              {messageArray.map((message) => {
                return (
                  <li key={message._id} className={`mb-3 text-box-message ${handleTextBoxDirection(message.user)}`}>
                    <div>{message.user}</div>
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
