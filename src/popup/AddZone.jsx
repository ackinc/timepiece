import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { zonesArr } from "../common/zones";

const blankOption = { name: "" };
const options = [blankOption].concat(zonesArr);

function AddZoneComponent({ onAdd }) {
  // If we don't control inputValue, the combobox will display entered text
  //   on field blur
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(blankOption);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={({ name }) => name}
      renderInput={(params) => (
        <TextField {...params} label="Add Timezone" variant="outlined" />
      )}
      closeIcon={null}
      inputValue={inputValue}
      value={value}
      onInputChange={handleInputChange}
      onChange={handleChange}
    />
  );

  function handleInputChange(_, input) {
    setInputValue(input);
  }

  async function handleChange(_, { name }) {
    if (name) await onAdd(name);
    setInputValue("");
    setValue(blankOption);
  }
}

AddZoneComponent.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddZoneComponent;
