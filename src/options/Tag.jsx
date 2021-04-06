import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import React from "react";

function TagComponent({ value, onRemove, styles }) {
  return (
    <span
      style={{
        ...styles,
        backgroundColor: "gray",
        borderRadius: "5px",
        padding: "10px 3px",
      }}
    >
      <span style={{ marginRight: "5px" }}>{value}</span>
      <button onClick={() => onRemove(value)}>
        <DeleteIcon color="action" fontSize="small" />
      </button>
    </span>
  );
}

TagComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  styles: PropTypes.shape({}),
};

TagComponent.defaultProps = {
  onRemove: () => undefined,
  styles: {},
};

export default TagComponent;
