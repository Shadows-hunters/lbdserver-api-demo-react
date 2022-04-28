import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Html, OrbitControls, Plane, useGLTF, Box } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
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

const HTMLContent = ({ domContent, children, modelPath, positionY }) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  return (
    <group position={[0, positionY, 0]}>
      <mesh ref={ref} position={[0, -35, 0]}>
        <Model modelPath={modelPath} castShadow receiveShaodw />
      </mesh>
      <Html portal={domContent} fullscreen>
        <div className="container"> {children} </div>
      </Html>
    </group>
  );
};

export default function Viewer(props) {
  const { title } = props;
  const domContent = useRef();
  const positionsList = props.result;
  
  const Lights = () => {
    const lichten = positionsList.map((light) => (
      <directionalLight
        position={light}
        intensity={0.1}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
    ));
    return (
      <>
        <ambientLight intensity={0.1} />
        {lichten}
      </>
    );
  };

  return (
    <Stack spacing={1} sx={{ width: "100%", height: "80vh" }}>
      <Typography component={"span"} variant="h5">
        {title}
      </Typography>
      <Canvas colorManagement shadows>
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
          args={[1000, 1000]}
        >
          <meshStandardMaterial attach="material" color="white" />
        </Plane>
      </Canvas>
    </Stack>
  );
}
