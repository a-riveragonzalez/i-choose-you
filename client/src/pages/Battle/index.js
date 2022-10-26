import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_BATTLE } from "../../utils/queries";
import "./battle.css";

// battleId : 63599bed8d4594a72080fe11
const Battle = () => {
  let { id } = useParams();
  console.log(id);

  const { loading, data } = useQuery(QUERY_BATTLE, {
    variables: { _id: id },
  });

  console.log(data);

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Here is the battle!</h1>
      </div>
    </div>
  );
};

export default Battle;
