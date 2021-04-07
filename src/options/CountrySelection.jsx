import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { flatten, sortedUniq } from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { getTimeZones } from "@vvo/tzdb";

const groupedTimezones = getTimeZones();
const options = [""]
  .concat(
    sortedUniq(
      groupedTimezones.map(({ alternativeName }) => alternativeName).sort()
    )
  )
  .concat(flatten(groupedTimezones.map(({ group }) => group)).sort());

function CountrySelectionComponent({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");

  return (
    <Autocomplete
      options={options}
      // style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Add Timezone" variant="outlined" />
      )}
      inputValue={inputValue}
      value={value}
      onInputChange={handleInputChange}
      onChange={handleSelect}
    />
  );

  function handleInputChange(_, value) {
    setInputValue(value);
  }

  async function handleSelect(_, value) {
    if (value) await onSelect(value);
    setInputValue("");
    setValue("");
  }
}

CountrySelectionComponent.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default CountrySelectionComponent;
