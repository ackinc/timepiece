import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
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
      const { selectedZones = [], sortBy, group } = await storage.get([
        "selectedZones",
        "sortBy",
        "group",
      ]);

      if (sortBy) setSortBy(sortBy);
      if (group !== undefined) setGroup(group);
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
      { key: "altname", label: "Timezones (Informal)" },
      { key: "timezone", label: "Timezones" },
    ];
    zoneData = groupOrder.map(({ key, label }) => ({
      label: label,
      // default to empty arr below to avoid error if we're grouping
      //   an empty zoneData array
      zones: sortZoneData(zoneData[key] || [], sortBy),
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
      <ToggleButtonGroup
        className="sort-buttons"
        exclusive
        color="primary"
        size="small"
        onChange={(_, value) => toggleSort(value)}
      >
        <ToggleButton value="name" selected={sortBy === "name"}>
          name
        </ToggleButton>
        <ToggleButton value="time" selected={sortBy === "time"}>
          time
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButton
        selected={group}
        onChange={async () => {
          await storage.set({ group: !group });
          setGroup(!group);
        }}
        value="group"
        size="small"
      >
        Group?
      </ToggleButton>
      {zoneData
        .filter(({ zones }) => zones.length > 0)
        .map(({ label, zones }) => (
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

  async function toggleSort(mode) {
    await storage.set({ sortBy: mode });
    setSortBy(mode);
  }
};

export default AppComponent;
