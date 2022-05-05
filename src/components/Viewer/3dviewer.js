import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { OrbitControls, Plane, useGLTF } from "@react-three/drei";
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useRecoilValue } from "recoil";
import withCalculation from "../../recoil/parameters";
import "./ViewerLayout.css";

const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath, true);
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.material = toonmaterial;
    }
  });
  return <primitive object={gltf.scene} dispose={null} />;
};

const threeTone = new THREE.TextureLoader().load('/threeTone.jpg')
threeTone.minFilter = THREE.NearestFilter
threeTone.magFilter = THREE.NearestFilter

const fourTone = new THREE.TextureLoader().load('/fourTone.jpg')
fourTone.minFilter = THREE.NearestFilter
fourTone.magFilter = THREE.NearestFilter

const fiveTone = new THREE.TextureLoader().load('/fiveTone.jpg')
fiveTone.minFilter = THREE.NearestFilter
fiveTone.magFilter = THREE.NearestFilter

const tentones = new THREE.TextureLoader().load('/tentones.jpg')
tentones.minFilter = THREE.NearestFilter
tentones.magFilter = THREE.NearestFilter

const toonmaterial: THREE.MeshToonMaterial = new THREE.MeshToonMaterial()

const options = {
  gradientMap: {
    default: 'tentones',
    threeTone: 'threeTone',
    fourTone: 'fourTone',
    fiveTone: 'fiveTone',
    tentones: 'tentones',
  }
}

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
  
  return (
    <Stack spacing={1} sx={{ width: "100%", height: "80vh" }}>
      <Typography component={"span"} variant="h5"></Typography>
      <Canvas shadows>
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
          args={[100, 100]}
        >
          <meshStandardMaterial attach="material" color="white" />
        </Plane>
      </Canvas>
    </Stack>
  );
}
