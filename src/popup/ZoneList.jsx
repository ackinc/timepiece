import PropTypes from "prop-types";
import React from "react";
import ZoneComponent from "./Zone";

function ZoneListComponent({ zones, onRemove }) {
  return (
    <div className="zone-list">
      {zones.map((zone) => (
        <ZoneComponent key={zone.name} zone={zone} onRemove={onRemove} />
      ))}
    </div>
  );
}

ZoneListComponent.propTypes = {
  zones: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      time: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  onRemove: PropTypes.func.isRequired,
};

ZoneListComponent.defaultProps = {
  zones: [],
};

export default ZoneListComponent;
