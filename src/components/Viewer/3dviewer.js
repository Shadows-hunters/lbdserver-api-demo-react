import { Box, Button, CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import { OrbitControls, Plane, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { useRecoilValue } from "recoil";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
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

  const myExporter = new GLTFExporter();
  const meshRef = useRef();

  function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  const exportIt = (e) => {
    myExporter.parse(meshRef.current, function (gltf) {
      console.log(gltf);
      download(JSON.stringify(gltf), "mine.gltf");
    });
  };

  return (
    <Box sx={{ ml: "55px", width: "calc(100vw - 55px)" }}>
      {/* height: 'calc(100vh - 64px)'  */}
      <Suspense fallback={<Waiting />}>
        <Typography component={"span"} variant="h5"></Typography>
        <Canvas shadows id="myScene">
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
      <Button onClick={exportIt}>lol</Button>
    </Box>
  );
}
