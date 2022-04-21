import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { Typography } from "@mui/material";

function MapTab(props) {
  const { title } = props;

  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    setMap(initialMap);
  }, []);

  return (
    <div>
      <Typography component={"span"} variant="h5">
        {title}
      </Typography>
      <div
        style={{ height: "50vh", width: "100%" }}
        ref={mapElement}
        className="map-container"
      />
    </div>
  );
}

export default MapTab;
