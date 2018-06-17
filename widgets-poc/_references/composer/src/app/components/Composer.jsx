import React from "react";
import Widget from "./Widget.jsx";

const Composer = class Composer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="composer">
      <div>Widgets POC</div>
      <Widget source="http://localhost:9000" />
    </div>;
  }
};

Composer.propTypes = {};

export default Composer;
