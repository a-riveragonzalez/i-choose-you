import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Battle from "./pages/Battle";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Quiz from "./pages/Quiz";
import Header from "./components/Header";
import Footer from "./components/Footer";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Header />
          <div className="container">
            <Routes>
              {/* *********** Home Route *********** */}
              <Route path="/" element={<Home />} />

              {/* *********** Login Route *********** */}
              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />

              {/* *********** Quiz Route *********** */}
              <Route path="/quiz" element={<Quiz />} />

              {/* *********** Battle Route *********** */}
              <Route path="/battle/:id" element={<Battle />} />

              {/* ************************************************************ */}
              {/* <Route 
                path="/matchup/:id" 
                element={<Vote />}
              /> */}

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
