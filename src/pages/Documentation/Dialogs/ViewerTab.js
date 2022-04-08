import * as React from 'react';
import * as THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Viewer from "../../../components/Viewer/3dviewer"

export default function ViewerTab(props) {
  const { title, description } = props
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
        <Typography component={"span"} variant="h5">{title}</Typography>
        <Typography component={"span"}>{description}</Typography>
        <Viewer></Viewer>
        {/* <Canvas>
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <mesh>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
        </Canvas> */}
    </Box>
  );
}

const tabStyle = { height: 800 }