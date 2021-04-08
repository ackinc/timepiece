import DeleteIcon from "@material-ui/icons/Delete";
import { utcToZonedTime, format as dateFormat } from "date-fns-tz";
import { Set as ImmutableSet } from "immutable";
import React, { useEffect, useState } from "react";
import CountrySelectionComponent from "./CountrySelection";
import storage from "../common/storage";
import { tzmap } from "../common/tzutils";

const AppComponent = () => {
  const [zones, setZones] = useState(new ImmutableSet());

  useEffect(() => {
    (async () => {
      const { selectedZones = [] } = await storage.get("selectedZones");
      setZones(new ImmutableSet(selectedZones));
    })();
  }, []);

  const now = new Date();

  return (
    <div className="container">
      <CountrySelectionComponent onSelect={addZone} />
      {zones.map((name) => (
        <div
          key={name}
          className="zone"
          style={{ padding: "10px", marginBottom: "20px", width: "300px" }}
        >
          {dateFormat(utcToZonedTime(now, tzmap[name]), "dd MMM hh:mm aaa")}{" "}
          {name}
          <button onClick={() => removeZone(name)}>
            <DeleteIcon color="action" fontSize="small" />
          </button>
        </div>
      ))}
    </div>
  );

  function addZone(zone) {
    return updateZones(zones.add(zone));
  }

  function removeZone(zone) {
    return updateZones(zones.delete(zone));
  }

  async function updateZones(newZones) {
    await storage.set({ selectedZones: Array.from(newZones) });
    setZones(newZones);
  }
};

export default AppComponent;
