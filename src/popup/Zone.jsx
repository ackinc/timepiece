import DeleteIcon from "@material-ui/icons/Delete";
import { format as dateFormat } from "date-fns-tz";
import PropTypes from "prop-types";
import React from "react";

function ZoneComponent({ zone, onRemove }) {
  const { name, time } = zone;

  return (
    <div
      className="zone"
      style={{
        padding: "10px",
      }}
    >
      {dateFormat(time, "dd MMM hh:mm aaa")} {name}
      <button onClick={() => onRemove(name)}>
        <DeleteIcon color="action" fontSize="small" />
      </button>
    </div>
  );
}

ZoneComponent.propTypes = {
  zone: PropTypes.shape({
    name: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ZoneComponent;
