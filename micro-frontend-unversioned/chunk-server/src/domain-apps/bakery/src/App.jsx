import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomeComponent from "./pages/home/components/Home";
import "./styles/main";

const App = () => {
  return (
    <BrowserRouter>
      <div className="fluid-container">
        <Route path="/" component={HomeComponent} />
      </div>
    </BrowserRouter>
  );
};

export default App;
