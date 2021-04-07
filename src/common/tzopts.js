import { getTimeZones } from "@vvo/tzdb";
import { flatten, sortedUniqBy } from "lodash";

const groupedTimezones = getTimeZones();

const cities = sortedUniqBy(
  flatten(
    groupedTimezones.map(
      ({ name, mainCities, countryName, currentTimeOffsetInMinutes }) =>
        mainCities.map((city) => ({
          name: `${city}, ${countryName}`,
          tzName: name,
          offset: currentTimeOffsetInMinutes,
        }))
    )
  ).sort((a, b) => a.name.localeCompare(b.name)),
  ({ name }) => name
);

const altNames = sortedUniqBy(
  groupedTimezones
    .map(({ name, alternativeName, currentTimeOffsetInMinutes }) => ({
      name: alternativeName,
      tzName: name,
      offset: currentTimeOffsetInMinutes,
    }))
    .sort((a, b) => a.name.localeCompare(b.name)),
  ({ name }) => name
);

const canonicalTimezones = sortedUniqBy(
  flatten(
    groupedTimezones.map(({ name, group, currentTimeOffsetInMinutes }) =>
      group.map((tz) => ({
        name: tz,
        tzName: name,
        offset: currentTimeOffsetInMinutes,
      }))
    )
  ).sort((a, b) => a.name.localeCompare(b.name)),
  ({ name }) => name
);

const tzopts = [].concat(cities).concat(altNames).concat(canonicalTimezones);

export default tzopts;
