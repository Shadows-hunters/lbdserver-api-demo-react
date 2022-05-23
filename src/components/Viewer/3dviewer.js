import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { GradientTexture, OrbitControls, Plane, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useRecoilValue } from "recoil";
import withCalculation from "../../recoil/parameters";
import "./ViewerLayout.css";
import * as THREE from 'three';

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

const Intensiteit = (100/withCalculation.length);

export default function Viewer(props) {
  const lichten = useRecoilValue(withCalculation).map((light, index) => (
    <directionalLight
      key={index}
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
      <button onClick={saveImage}>Save image</button>
      <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
        {lichten}
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
    </Stack>
  );
}
