import { getTimeZones } from "@vvo/tzdb";
import { flatten, keyBy, sortedUniqBy } from "lodash";

const groupedTimezones = getTimeZones();

const cities = sortedUniqBy(
  flatten(
    groupedTimezones.map(
      ({ name, mainCities, countryName, currentTimeOffsetInMinutes }) =>
        mainCities.map((city) => ({
          name: `${city}, ${countryName}`,
          type: "city",
          tzName: name,
          offset: currentTimeOffsetInMinutes,
        }))
    )
  ).sort((a, b) => a.name.localeCompare(b.name)),
  ({ name }) => name
);

const altNames = sortedUniqBy(
  groupedTimezones
    .map(
      ({
        name,
        abbreviation,
        alternativeName,
        currentTimeOffsetInMinutes,
      }) => ({
        name: `${alternativeName} (${abbreviation})`,
        type: "altname",
        tzName: name,
        offset: currentTimeOffsetInMinutes,
      })
    )
    .sort((a, b) => a.name.localeCompare(b.name)),
  ({ name }) => name
);

const canonicalTimezones = sortedUniqBy(
  flatten(
    groupedTimezones.map(({ name, group, currentTimeOffsetInMinutes }) =>
      group.map((tz) => ({
        name: tz,
        type: "timezone",
        tzName: name,
        offset: currentTimeOffsetInMinutes,
      }))
    )
  ).sort((a, b) => a.name.localeCompare(b.name)),
  ({ name }) => name
);

export const zonesArr = []
  .concat(cities)
  .concat(altNames)
  .concat(canonicalTimezones);

export const zonesMap = keyBy(zonesArr, ({ name }) => name);
