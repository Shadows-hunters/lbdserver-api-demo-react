import React, {Suspense, useRef} from "react";
// import "./App.scss";
import {Canvas, useFrame} from "@react-three/fiber";
import {Html, OrbitControls, useGLTF} from "@react-three/drei";

// const Model = ({modelPath}) => {
//   const gltf = useGLTF(modelPath, true)
//   return <primitive object={gltf.scene} dispose={null}/>
// }

function Model() {
  const gltf = useGLTF("https://raw.githubusercontent.com/LBD-Hackers/lbdserver-client-api/main/tests/artifacts/duplex.gltf")
  return (<primitive object={gltf.scene} />)
}

const Lights = () => {
  return(
    <>
    <ambientLight intensity={0.3}/>
    <directionalLight position={[10,10,5]} intensity={1}/>
    <directionalLight position={[0,10,0]} intensity={1.5}/>
    <spotLight position={[1000,0,0]} intensity={1}/>
    </>
  )
}

const HTMLContent = ({domContent, children, modelPath, positionY}) => {

  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.01))

  return(
      <group position={[0,positionY,0]}>
        <mesh ref={ref} position={[0,-35,0]}>
          <Model modelPath={modelPath}/>
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container"> {children} </div>
          </Html>
      </group>
  )
}

export default function App() {

  const domContent = useRef()

  return (
    <>
      <Canvas >

        <Suspense fallback={null}>
        <Lights/>
        <Model/>
        <OrbitControls/>
        </Suspense>
      </Canvas>
    </>
  );
}
