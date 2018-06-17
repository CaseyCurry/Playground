import React from "react";
import busFactory from "nh-browser-bus";
import AdditionPanel from "./components/Addition-Panel.jsx";
import List from "./components/List.jsx";
import "./styles/main.scss";

const App = class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [
        "Solomon Burke",
        "John Lennon",
        "Glenn Frey"
      ]
    };
    this.handleAddPatient = this.handleAddPatient.bind(this);
    this.bus = busFactory.create();
  }

  handleAddPatient(name) {
    if (!name) {
      return;
    }
    this.setState({
      patients: this.state.patients.concat(name)
    });
    this.bus.notify({
      eventName: "patient-added",
      message: {
        name: name
      }
    });
  }

  render() {
    return <div>
      <AdditionPanel addPatientHandler={this.handleAddPatient} />
      <List patients={this.state.patients} />
    </div>;
  }
};

export default App;
