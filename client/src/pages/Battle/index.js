import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_BATTLE, QUERY_USERS } from "../../utils/queries";
import Form from "react-bootstrap/Form";
import "./battle.css";

// battleId : 63599bed8d4594a72080fe11
const Battle = () => {
  let { id } = useParams();

  const { loading, data } = useQuery(QUERY_BATTLE, {
    variables: { id: id },
  });
  console.log(data);

  const messageArray = data?.battle.messages || [];
  const user1 = data?.battle.user1_id || [];
  const user2 = data?.battle.user2_id || [];

  console.log(messageArray);

  return (
    <div className="battle-room">
      {loading ? (
        <div> loading </div>
      ) : (
        <section className="container">
          {/* ************* Battle Title container************* */}
          <div className="text-danger">
            <h4>
              {user1} vs. {user2}
            </h4>
          </div>

          {/* ************* MessageList container************* */}
          <div className="text-white">
            <ul className="message-list">
              {messageArray.map((message) => {
                return (
                  <li key={message._id}>
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
                // onChange={handleInputChange}
                type="text"
                placeholder="message"
                className="form-control w-100"
                rows="3"
              />
              <button
              type="submit"
              // onClick={handleFormSubmit}
              className="btn btn-light"
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
