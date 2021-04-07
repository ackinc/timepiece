import React, { useEffect, useState } from "react";
import { utcToZonedTime, format as dateFormat } from "date-fns-tz";
import storage from "../common/storage";
import { tzmap } from "../common/tzutils";

const AppComponent = () => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    (async () => {
      let { selectedZones = [] } = await storage.get("selectedZones");
      selectedZones = selectedZones.map((name) => ({
        name,
        tzName: tzmap[name],
      }));
      setZones(selectedZones);
    })();
  }, []);

  const now = new Date();

  return (
    <div className="container">
      {zones.map(({ name, tzName }) => (
        <div
          key={name}
          className="zone"
          style={{ padding: "10px", marginBottom: "20px", width: "300px" }}
        >
          {dateFormat(utcToZonedTime(now, tzName), "dd MMM hh:mm aaa")} {name}
        </div>
      ))}
    </div>
  );
};

export default AppComponent;
