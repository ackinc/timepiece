import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { zonesArr } from "../common/zones";

function AddZoneComponent({ onAdd, ...restProps }) {
  // If we don't control inputValue, the combobox will display entered text
  //   on field blur
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      options={zonesArr}
      getOptionLabel={({ name }) => name}
      renderInput={(params) => (
        <TextField {...params} label="Add Timezone" variant="outlined" />
      )}
      closeIcon={null}
      inputValue={inputValue}
      value={value}
      size="small"
      onInputChange={handleInputChange}
      onChange={handleChange}
      {...restProps}
    />
  );

  function handleInputChange(_, input) {
    setInputValue(input);
  }

  async function handleChange(_, { name }) {
    if (name) await onAdd(name);
    setInputValue("");
    setValue(null);
  }
}

AddZoneComponent.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddZoneComponent;
