import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

export const render = (container) => {
  ReactDOM.render(<App/> , container);
};

export const metadata = {
  title: "Patient List Via Packaged React",
  defaultSize: {
    height: 3,
    width: 3
  }
};
