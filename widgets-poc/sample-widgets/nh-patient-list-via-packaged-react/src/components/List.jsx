import React from "react";
import PropTypes from "prop-types";
import Patient from "./Patient.jsx";

const List = ({patients}) => {
  const listItems = patients.map(x => {
    return <li key={x}>
      <Patient name={x} />
    </li>;
  });
  return <ul>{listItems}</ul>;
};

List.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default List;
