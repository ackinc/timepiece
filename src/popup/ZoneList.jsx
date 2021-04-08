import PropTypes from "prop-types";
import React from "react";
import ZoneComponent from "./Zone";

function ZoneListComponent({ headerLabel, zones, onRemove }) {
  return (
    <div className="zone-list">
      {headerLabel ? <h2>{headerLabel}</h2> : null}
      {zones.map((zone) => (
        <ZoneComponent key={zone.name} zone={zone} onRemove={onRemove} />
      ))}
    </div>
  );
}

ZoneListComponent.propTypes = {
  headerLabel: PropTypes.string,
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
