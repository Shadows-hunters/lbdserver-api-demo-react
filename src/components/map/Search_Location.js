import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function SearchLocation() {
  var [locatieslijst, setLocatieslijst] = useState({});

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:8080/mapAlles", requestOptions)
    .then((response) => response.text())
    .then((result) => setLocatieslijst(JSON.parse(result)))
    .catch((error) => console.log("error", error));

  return (
    <Autocomplete
      disablePortal
      id="search-location-box"
      options={Object.keys(locatieslijst)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Location" />}
    />
  );
}
