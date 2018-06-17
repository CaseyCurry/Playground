import React from "react";
import PropTypes from "prop-types";

const Widget = class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <iframe src={this.props.source} />;
  }
};

Widget.propTypes = {
  source: PropTypes.string.isRequired
};

export default Widget;
