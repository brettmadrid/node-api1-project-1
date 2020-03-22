import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import UsersList from "./components/UsersList";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/users" component={UsersList} />
    </div>
  );
}

export default App;
