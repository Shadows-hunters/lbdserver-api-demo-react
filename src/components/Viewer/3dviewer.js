import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import { Box, CircularProgress } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Typography from "@mui/material/Typography";
import { OrbitControls, Plane, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import atomGltfModel from "../../recoil/model/atomGltfModel";
import atomModel from "../../recoil/model/atomModel";
import withCalculation from "../../recoil/parameters";
import {
  atomImageDownload,
  atomModelDownload,
  atomPodUpload,
} from "../../recoil/pop-ups";
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
  const Intensiteit = 1 / useRecoilValue(withCalculation).length;

  const lichten = useRecoilValue(withCalculation).map((light, index) => (
    <mesh key={index} rotation={light.map((x) => x)}>
      <directionalLight
        position={[20, 0, 0]}
        intensity={Intensiteit}
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

  const myExporter = new GLTFExporter();
  const meshRef = useRef();
  const setGltfModel = useSetRecoilState(atomGltfModel);

  const exportIt = (e) => {
    myExporter.parse(meshRef.current, function (gltf) {
      setGltfModel(JSON.stringify(gltf));
    });
  };

  const podUpload = useSetRecoilState(atomPodUpload);
  const imageDownload = useSetRecoilState(atomImageDownload);
  const modelDownload = useSetRecoilState(atomModelDownload);

  const updatePodUpload = () => {
    podUpload(true);
  };
  const updateImageDownload = () => {
    imageDownload(true);
  };
  const updateModelDownload = () => {
    exportIt();
    modelDownload(true);
  };

  return (
    <Box
      sx={{
        ml: "55px",
        width: "calc(100vw - 55px)",
        height: "calc(100vh - 64px)",
      }}
    >
      <Suspense fallback={<Waiting />}>
        <Typography component={"span"} variant="h5"></Typography>
        <Canvas shadows id="myScene" gl={{ preserveDrawingBuffer: true }}>
          <mesh ref={meshRef}>
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
          </mesh>
        </Canvas>
      </Suspense>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="Download image"
          tooltipTitle="Download image"
          onClick={updateImageDownload}
          icon={<ImageIcon />}
        />
        <SpeedDialAction
          key="Download gltf"
          tooltipTitle="Download gltf"
          onClick={updateModelDownload}
          icon={<AttachFileIcon />}
        />
        <SpeedDialAction
          key="Upload gltf to solid pod"
          tooltipTitle="Upload gltf to solid pod"
          onClick={updatePodUpload}
          icon={<CloudUploadIcon />}
        />
      </SpeedDial>
    </Box>
  );
}
