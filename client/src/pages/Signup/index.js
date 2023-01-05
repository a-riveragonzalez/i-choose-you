import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POKEMONGOS } from "../../utils/queries";
import { CREATE_USER } from "../../utils/mutations";
import "./signup.css";
import AuthService from "../../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    pokemon: ""
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);
  // const [userState, setUserState] = useState(false);

    // every user will now be a substitute upon signing up
    const {loading, data: pokemonData} = useQuery(QUERY_POKEMONGOS);
    const pokemonArray = pokemonData?.pokemongos || [];
    const substitute = pokemonArray[pokemonArray.length - 1];
    console.log(substitute);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      pokemon: substitute._id,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      AuthService.login(data.createUser.token);
      // setUserState(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card bg-light">
          <h4 className="card-head p-2">S i G n U p</h4>
          <div className="card-body">
            {data ? (
              <Navigate to="/quiz"></Navigate>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <h6 className="login-toggle">Already have an account? Log in <Link to="/login">here</Link>!</h6>
    </main>
  );
};

export default Signup;
