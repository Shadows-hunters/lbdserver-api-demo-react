import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Html, OrbitControls, Plane, useGLTF, Box } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import "./ViewerLayout.css";
import { sunPositions } from "../calculations/formulas";

const Model = ({modelPath}) => {
  const gltf = useGLTF(modelPath, true);
  gltf.scene.traverse(function(node){
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return <primitive object={gltf.scene} dispose={null}/>
}

const positionsList = [
	[
		-0.8842733722790815,
		0.17753551551063876,
		0.43190478558422174
	],
	[
		-0.7333512845168095,
		0.25011937657436656,
		0.6321678503052774
	],
	[
		-0.5324305278428126,
		0.3068576415544128,
		0.788895506921346
	],
	[
		-0.2952085820328438,
		0.34386351475827454,
		0.8914088715691827
	],
	[
		-0.03785795776257943,
		0.3585954432223184,
		0.9327250844349775
	],
	[
		0.2220763570688976,
		0.3500304032613791,
		0.9100334106084699
	],
	[
		0.46687303046742984,
		0.3187336648370183,
		0.8248869160810599
	],
	[
		0.6798425821946775,
		0.2668202700205679,
		0.6830966307492846
	],
	[
		0.8464652170914618,
		0.1978108523827854,
		0.49433541541538406
	],
	[
		0.9553807546138914,
		0.11639163010161421,
		0.271478548242178
	],
	[
		0.9991631713959537,
		0.028094922865712683,
		0.02972595221602694
	]
]

const Lights = () => {
  const lichten = positionsList.map((light) =>
  <directionalLight position={light} intensity={1} castShadow/>
  )
  return(
    <>
    <ambientLight intensity={0.1}/>
    {/* {lichten} */}
    <directionalLight
      intensity={0.5}
      position={[100,100,50]}
      castShadow
      shadow-mapSize-height={512}
      shadow-mapSize-width={512}
      />
    </>
  )
}

const HTMLContent = ({domContent, children, modelPath, positionY}) => {

  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.01))

  return(
      <group position={[0,positionY,0]}>
        <mesh ref={ref} position={[0,-35,0]}>
          <Model modelPath={modelPath} castShadow receiveShaodw/>
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container"> {children} </div>
          </Html>
      </group>
  )
}



export default function Viewer(props) {
  const { title } = props;
  const domContent = useRef()

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Typography component={"span"} variant="h5">
        {title}
      </Typography>
      <Canvas colorManagement shadows>
        <Lights/>
        <Model castShadow receiveShadow modelPath={"https://raw.githubusercontent.com/LBD-Hackers/lbdserver-client-api/main/tests/artifacts/duplex.gltf"}/>
        <OrbitControls/>
        {/* <Box castShadow receiveShadow position={[0, 0.2, 0]}>
         <meshStandardMaterial attach="material" color="gray" />
        </Box> */}
        <Plane
          receiveShadow
          rotation={[-Math.PI/2, 0, 0]}
          position={[0, -1, 0]}
          args={[1000, 1000]}>
            <meshStandardMaterial attach="material" color="white"/>
        </Plane>
      </Canvas>
    </Stack>
  );
}
