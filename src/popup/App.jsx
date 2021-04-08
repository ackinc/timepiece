import { ButtonGroup, Button } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import { utcToZonedTime, format as dateFormat } from "date-fns-tz";
import { Set as ImmutableSet } from "immutable";
import { groupBy } from "lodash";
import React, { useEffect, useState } from "react";
import AddZoneComponent from "./AddZone";
import ZoneListComponent from "./ZoneList";
import storage from "../common/storage";
import { zonesMap } from "../common/zones";

const AppComponent = () => {
  const [zones, setZones] = useState(new ImmutableSet());
  const [sortBy, setSortBy] = useState("name");
  const [group, setGroup] = useState(false);

  useEffect(() => {
    (async () => {
      const { selectedZones = [] } = await storage.get("selectedZones");
      setZones(new ImmutableSet(selectedZones));
    })();
  }, []);

  const now = new Date();
  let zoneData = Array.from(zones).map((zone) => ({
    ...zonesMap[zone],
    time: utcToZonedTime(now, zonesMap[zone].tzName),
  }));

  if (group) {
    zoneData = groupBy(zoneData, ({ type }) => type);

    const groupOrder = [
      { key: "city", label: "Cities" },
      { key: "altname", label: "Timezones (Informal/Abbreviations)" },
      { key: "timezone", label: "Timezones" },
    ];
    zoneData = groupOrder.map(({ key, label }) => ({
      label: label,
      zones: sortZoneData(zoneData[key], sortBy),
    }));
  } else {
    zoneData = [
      {
        label: undefined, // the ZoneList will render without a header
        zones: sortZoneData(zoneData, sortBy),
      },
    ];
  }

  return (
    <div
      className="container"
      style={{
        minHeight: "400px",
        width: "300px",
      }}
    >
      <AddZoneComponent onAdd={addZone} />
      <ButtonGroup
        className="sort-buttons"
        color="primary"
        size="small"
        orientation="vertical"
      >
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
      <ToggleButton
        selected={group}
        onChange={() => setGroup(!group)}
        value="group"
        size="small"
      >
        Group?
      </ToggleButton>
      {zoneData.map(({ label, zones }) => (
        <ZoneListComponent
          key={label || "all"} // small hack to prevent React's "missing key"
          headerLabel={label}
          zones={zones}
          onRemove={removeZone}
        />
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

  function sortZoneData(zoneData, sortBy = "name") {
    return sortBy === "name"
      ? zoneData.sort((a, b) => a.name.localeCompare(b.name))
      : zoneData.sort((a, b) => {
          const cmpFormat = "yyyy-MM-dd HH:mm:ss";
          return dateFormat(a.time, cmpFormat).localeCompare(
            dateFormat(b.time, cmpFormat)
          );
        });
  }
};

export default AppComponent;
