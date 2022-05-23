import { Box, CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import { OrbitControls, Plane, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
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

const Waiting = () => {
  return (
    <Box>
      <Typography variant="h6" textAlign="center" justifyItems="center">
        Loading.... <br />
        <CircularProgress sx={{ mt: "20px" }} />
      </Typography>
    </Box>
  );
};

export default function Viewer(props) {
  const lichten = useRecoilValue(withCalculation).map((light, index) => (
    <mesh key={index} rotation={light.map((x) => x)}>
      <directionalLight
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
    <Box sx={{ width: "100%", height: "80vh" }}>
      <Suspense fallback={<Waiting />}>
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
      </Suspense>
    </Box>
  );
}
