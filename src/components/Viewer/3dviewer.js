import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { OrbitControls, Plane, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useRecoilValue } from "recoil";
import atomModel from "../../recoil/model/atomModel";
import withCalculation from "../../recoil/parameters";
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
  const lichten = useRecoilValue(withCalculation).map((light, index) => (
    <mesh rotation={light.map((x) => x)}>
      <directionalLight
        key={index}
        position={[20, 0, 0]}
        intensity={0.1}
        castShadow
        shadow-mapSize-height={5000}
        shadow-mapSize-width={5000}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
    </mesh>
  ));
  const model = useRecoilValue(atomModel);

  return (
    <Stack spacing={1} sx={{ width: "100%", height: "80vh" }}>
      <Typography component={"span"} variant="h5"></Typography>
      <Canvas shadows>
        {lichten}
        <Model castShadow receiveShadow modelPath={model} />
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
