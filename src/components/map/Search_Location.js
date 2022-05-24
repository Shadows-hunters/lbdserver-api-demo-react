import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchLocation() {

    var [locatieslijst, setLocatieslijst] = useState()

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("http://localhost:8080/mapAlles", requestOptions)
        .then(response => response.text())
        .then(result => console.log(Object.keys(result)))
        .catch(error => console.log('error', error)
    );

  return (
    <Autocomplete
      disablePortal
      id="search-location-box"
      options={locatieslijst.keys()}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Location" />}
    />
  );
}

const stored_locations = [
  "Haha", "hihi"
];
