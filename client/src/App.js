import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import Profile from './pages/Profile';
import Battle from "./pages/Battle";
import Matches from "./pages/Matches";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Quiz from "./pages/Quiz";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserBattles from "./pages/UserBattles";
import "./background.css"

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

function App() {
  

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh main">
          <Header/>
          <div className="container">
            <Routes>
              {/* *********** Home Route *********** */}
              <Route path="/" element={<Home />} />
              
              {/* *********** Profile Route *********** */}
              <Route path="/profile" element={<Profile />} />

              {/* *********** Login Route *********** */}
              <Route path="/login" element={<Login />} />

              {/* *********** Quiz Route *********** */}
              <Route path="/quiz" element={<Quiz />} />

              {/* *********** All User Battle Routes *********** */}
              <Route path="/battles" element={<UserBattles />} />

              {/* *********** Matches Route *********** */}
              <Route path="/matches" element={<Matches />} />

              {/* *********** Signup Route *********** */}
              <Route path="/signup" element={<Signup />} />

              {/* *********** Battle Route *********** */}
              <Route path="/battle/:id" element={<Battle />} />

              {/* *********** Wild Card Route *********** */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
