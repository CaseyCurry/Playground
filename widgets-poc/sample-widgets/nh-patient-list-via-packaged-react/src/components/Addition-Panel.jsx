import React from "react";
import PropTypes from "prop-types";

const AdditionPanel = class AdditionPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    if (e.target.value === this.state.name) {
      return;
    }
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return <div>
      <input type="text" placeholder="enter patient name" onChange={(e) => this.handleNameChange(e)} value={this.state.name}/>
      <input type="button" value="+" onClick={() => this.props.addPatientHandler(this.state.name)} />
    </div>;
  }
};

AdditionPanel.propTypes = {
  addPatientHandler: PropTypes.func.isRequired
};

export default AdditionPanel;
