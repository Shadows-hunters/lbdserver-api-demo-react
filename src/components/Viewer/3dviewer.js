import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { OrbitControls, Plane, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import "./ViewerLayout.css";

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

export default function Viewer(props) {
  const { title } = props;
  const positionsList = props.result;

  const Lights = () => {
    const lichten = positionsList.map((light) => (
      <directionalLight
        position={light.map((x) => x * 100)}
        intensity={0.1}
        castShadow
        shadow-mapSize-height={5000}
        shadow-mapSize-width={5000}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
    ));
    return <>{lichten}</>;
  };

  return (
    <Stack spacing={1} sx={{ width: "100%", height: "80vh" }}>
      <Typography component={"span"} variant="h5">
        {title}
      </Typography>
      <Canvas shadows>
        <Lights />
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
          args={[100, 100]}
        >
          <meshStandardMaterial attach="material" color="white" />
        </Plane>
      </Canvas>
    </Stack>
  );
}
