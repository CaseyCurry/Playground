import React from "react";
import PropTypes from "prop-types";

const Patient = ({name}) => {
  return <div>{name}</div>;
};

Patient.propTypes = {
  name: PropTypes.string.isRequired
};

export default Patient;
