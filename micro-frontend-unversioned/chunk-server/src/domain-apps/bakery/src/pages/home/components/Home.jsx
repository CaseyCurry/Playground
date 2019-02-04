import React from "react";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Bakery App</h1>
        <div>waiting on order...</div>
      </div>
    );
  }
}

export default HomeComponent;
