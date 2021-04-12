import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { IconButton } from "@material-ui/core";
import { format as dateFormat } from "date-fns-tz";
import PropTypes from "prop-types";
import React from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

function ZoneComponent({ zone, onRemove }) {
  const { name, time } = zone;

  return (
    <div
      className="zone"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div style={{ marginRight: "10px" }}>
        <Clock
          renderHourMarks={true}
          renderMinuteMarks={false}
          renderSecondHand={false}
          size={40}
          value={time}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
          {dateFormat(time, "dd MMM hh:mm aaa")}
        </div>
        <div>{name}</div>
      </div>
      <IconButton color="secondary" size="small" onClick={() => onRemove(name)}>
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
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
