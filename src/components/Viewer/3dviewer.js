import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { OrbitControls, Plane, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useRecoilValue } from "recoil";
import withCalculation from "../../recoil/parameters";
import "./ViewerLayout.css";
import * as THREE from 'three';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';

const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath, true);
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return <primitive object={gltf.scene} dispose={null} />;
};

const actions = [
  { icon: <SaveIcon />, name: 'Save as PNG'},
];

export default function Viewer(props) {
  const Intensiteit = (1/useRecoilValue(withCalculation).length);

  const lichten = useRecoilValue(withCalculation).map((light, index) => (
    <directionalLight
      key={index}
      position={light.map((x) => x * 100)}
      intensity={Intensiteit}
      castShadow
      shadow-mapSize-height={5000}
      shadow-mapSize-width={5000}
      shadow-camera-left={-100}
      shadow-camera-right={100}
      shadow-camera-top={100}
      shadow-camera-bottom={-100}
    />
  ));

  const renderer = new THREE.WebGLRenderer({alpha: true,preserveDrawingBuffer: true });

  function saveImage() {
    const canvas =  document.getElementsByTagName("canvas")[0]
    const image = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    a.download="image.png"
    a.click();
  }
  
  return (
    <Stack spacing={1} sx={{ width: "100%", height: "80vh" }}>
      <Typography component={"span"} variant="h5"></Typography>
      <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
        {lichten}
        <ambientLight intensity={0.1}/>
        <Model
          castShadow
          receiveShadow
          modelPath={
            "https://raw.githubusercontent.com/LBD-Hackers/lbdserver-client-api/main/tests/artifacts/duplex.gltf"
          }
        />
        <OrbitControls />
        <Plane
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          args={[100, 100]}>
          <meshStandardMaterial attach="material" color="pink">
          </meshStandardMaterial>
        </Plane>
      </Canvas>
      <SpeedDial
       ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        >
        {actions.map((action) => (
        <SpeedDialAction
        key={action.name}
        icon={action.icon}
        tooltipTitle={action.name}
        onClick={saveImage}
        />
        ))}
        </SpeedDial>
    </Stack>
  );
}
