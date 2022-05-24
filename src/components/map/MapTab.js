import React, { useState, useEffect, useRef } from "react";
import "ol/ol.css";
import Feature from "ol/Feature";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Icon, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Modify } from "ol/interaction";
import {
  Button,
  Stack,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  atomDate,
  atomInterval,
  atomLatitude,
  atomOffset,
  atomPass,
  atomRange,
} from "../../recoil/parameters";
import atomSidebar from "../../recoil/sidebar/atomSidebar";

function MapTab(props) {
  const { title } = props;

  useEffect(() => {
    const iconFeature = new Feature({
      geometry: new Point([3.7253, 51.0536]),
      name: "Location",
      population: 4000,
      rainfall: 500,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 25],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "./Map_pin.png",
        size: [5, 5],
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const rasterLayer = new TileLayer({
      source: new OSM(),
      projection: "EPSG:3059",
    });

    const target = document.getElementById("map");

    const map = new Map({
      layers: [rasterLayer],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
    });

    const modify = new Modify({
      hitDetection: vectorLayer,
      source: vectorSource,
    });
    modify.on(["modifystart", "modifyend"], function (evt) {
      target.style.cursor = evt.type === "modifystart" ? "grabbing" : "pointer";
    });
    const overlaySource = modify.getOverlay().getSource();
    overlaySource.on(["addfeature", "removefeature"], function (evt) {
      target.style.cursor = evt.type === "addfeature" ? "pointer" : "";
    });

    map.addInteraction(modify);
  }, []);

  const [pass, setPass] = useRecoilState(atomPass);
  const [date, setDate] = useRecoilState(atomDate);
  const [range, setRange] = useRecoilState(atomRange);
  const [interval, setInterval] = useRecoilState(atomInterval);
  const [latitude, setLatitude] = useRecoilState(atomLatitude);
  const [offset, setOffset] = useRecoilState(atomOffset);

  // copy atom to cache for use while passing is set of
  const [myDate, setMyDate] = useState(date);
  const [myRange, setMyRange] = useState(range);
  const [myInterval, setMyInterval] = useState(interval);
  const [myLatitude, setMyLatitude] = useState(latitude);
  const [myOffset, setMyOffset] = useState(offset);

  const setOpen = useSetRecoilState(atomSidebar);

  const updateOpen = () => {
    setOpen(true);
  };

  const updateRange = (e, data) => {
    // if passing: also updating atom
    if (pass) {
      setRange(data);
    }
    setMyRange(data);
  };
  const updateInterval = (e, data) => {
    if (pass) {
      setInterval(data);
    }
    setMyInterval(data);
  };
  const updateLatitude = (e) => {
    if (pass) {
      setLatitude(e.target.value);
    }
    setMyLatitude(e.target.value);
  };
  const updateOffset = (e) => {
    if (pass) {
      setOffset(e.target.value);
    }
    setMyOffset(e.target.value);
  };

  const updatePass = (e) => {
    if (pass) {
      setPass(false);
    } else {
      setPass(true);
      // update atoms
      setDate(myDate);
      setRange(myRange);
      setInterval(myInterval);
      setLatitude(myLatitude);
      setOffset(myOffset);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Typography component={"span"} variant="h5">
        <p> Search engine location input</p>
      </Typography>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div id="box2">
        <Stack spacing={2}>
          <p> Search from locations: </p>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Saved Locations
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Saved Locations"
            >
              <MenuItem value={10}></MenuItem>
            </Select>
          </FormControl>

          <p> Add new location to database: </p>

          <TextField
            label="Latitude"
            value={myLatitude}
            onChange={updateLatitude}
          />

          <TextField
            label="Longitude"
            value={myOffset}
            onChange={updateOffset}
          />

          <Button
            variant="outlined"
            sx={{
              "& .MuiTextField-root": { m: 1 },
              width: "300px",
              fontSize: "10px",
              marginLeft: "8px",
              overflow: "hidden",
            }}
          >
            Submit new location and add to list
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default MapTab;
