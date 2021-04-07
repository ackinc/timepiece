import { Chip } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Set as ImmutableSet } from "immutable";
import storage from "../common/storage";
import CountrySelectionComponent from "./CountrySelection";

function AppComponent() {
  const [selectedZones, setSelectedZones] = useState(new ImmutableSet());

  useEffect(() => {
    (async () => {
      const { selectedZones } = await storage.get("selectedZones");
      setSelectedZones(new ImmutableSet(selectedZones));
    })();
  }, []);

  function updateSelectedZones(selected) {
    setSelectedZones(selected);
    return storage.set({ selectedZones: Array.from(selected) });
  }

  async function removeZone(zone) {
    const newSelection = selectedZones.remove(zone);
    await updateSelectedZones(newSelection);
  }

  async function addZone(zone) {
    const newSelection = selectedZones.add(zone);
    await updateSelectedZones(newSelection);
  }

  return (
    <div className="container">
      <CountrySelectionComponent onSelect={addZone} />
      <div className="selected-zones">
        {selectedZones.map((zone) => (
          <Chip key={zone} label={zone} onDelete={() => removeZone(zone)} />
        ))}
      </div>
    </div>
  );
}

export default AppComponent;
