import React, { useState, useEffect } from "react";
import { Set } from "immutable";
import storage from "../common/storage";
import Tag from "./Tag";

console.log(0);

function AppComponent() {
  const [selectedZones, setSelectedZones] = useState(new Set());
  console.log(1);

  useEffect(() => {
    (async () => {
      console.log(2);
      const { selectedZones } = await storage.get("selectedZones");
      setSelectedZones(selectedZones);
    })();
  }, []);

  function updateSelectedZones(selected) {
    setSelectedZones(selected);
    return storage.set({ selectedZones: selected });
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
      <div className="selected-zones">
        {selectedZones.map((zone) => (
          <Tag
            key={zone}
            value={zone}
            style={{ marginRight: "20px" }}
            onRemove={removeZone}
          />
        ))}
      </div>
    </div>
  );
}

export default AppComponent;
