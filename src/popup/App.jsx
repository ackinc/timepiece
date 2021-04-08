import { ButtonGroup, Button } from "@material-ui/core";
import { utcToZonedTime, format as dateFormat } from "date-fns-tz";
import { Set as ImmutableSet } from "immutable";
import React, { useEffect, useState } from "react";
import AddZoneComponent from "./AddZone";
import ZoneListComponent from "./ZoneList";
import storage from "../common/storage";
import { zonesMap } from "../common/zones";

const AppComponent = () => {
  const [zones, setZones] = useState(new ImmutableSet());
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    (async () => {
      const { selectedZones = [] } = await storage.get("selectedZones");
      setZones(new ImmutableSet(selectedZones));
    })();
  }, []);

  const now = new Date();
  const zoneData = zones.map((zone) => ({
    name: zone,
    time: utcToZonedTime(now, zonesMap[zone].tzName),
  }));
  const sortedZoneData =
    sortBy === "name"
      ? zoneData.sort((a, b) => a.name.localeCompare(b.name))
      : zoneData.sort((a, b) => {
          const cmpFormat = "yyyy-MM-dd HH:mm:ss";
          return dateFormat(a.time, cmpFormat).localeCompare(
            dateFormat(b.time, cmpFormat)
          );
        });

  return (
    <div
      className="container"
      style={{
        minHeight: "400px",
        width: "300px",
      }}
    >
      <AddZoneComponent onAdd={addZone} />
      <ButtonGroup color="primary" size="small" orientation="vertical">
        <Button
          variant={sortBy === "name" ? "contained" : "outlined"}
          onClick={() => setSortBy("name")}
        >
          name
        </Button>
        <Button
          variant={sortBy === "time" ? "contained" : "outlined"}
          onClick={() => setSortBy("time")}
        >
          time
        </Button>
      </ButtonGroup>
      <ZoneListComponent zones={sortedZoneData} onRemove={removeZone} />
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
