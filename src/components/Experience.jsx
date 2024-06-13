import {
  CameraControls,
  Grid,
  Environment,
  MeshDistortMaterial,
  RenderTexture,
  useCursor,
  OrbitControls
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { homeAtom } from "./Overlay";
import { Scene } from "./Scene";
import { dispAtom, slideAtom } from "./Overlay";

// Array of three scenes with three different models
export const scenes = [
  {
    path: "/models/mcqueen.glb",
    mainColor: "#FFAE9E",
    name: "Lightning McQueen",
    description: "Focus. Speed. I am Speed. One winner, forty two losers. I eat losers for breakfast.",
  },
  {
    path: "/models/cruz.glb",
    mainColor: "#FCEE95",
    name: "Cruz Ramirez",
    description: "I am so excited that I get to train you. These young guys are great and all, but I like a challenge.",
  },
  {
    path: "/models/storm.glb",
    mainColor: "#9BC7F6",
    name: "Jackson Storm",
    description: "You have no idea what a pleasure it is for me to finally beat you.",
  },
];

export const Experience = () => {
  const [slide, setSlide] = useAtom(slideAtom);
  // const [visible, setVisible] = useState(1);
  const viewport = useThree((state) => state.viewport);
  const { slideDistance } = useControls({
    slideDistance: {
      value: 1,
      min: 0,
      max: 10,
    },
  });

  // const Env = ({ scene }) => {


  //   return ( 
  //   <>
  //     <mesh position={[0, 0, 0]}>
  //       <planeGeometry args={[viewport.width, viewport.height]} />
  //       <meshBasicMaterial toneMapped={false}>
  //         <RenderTexture attach="map">
  //           <Scene
  //             {...scene}
  //             path={scene.path}
  //             mainColor={scene.mainColor}
  //           />
  //         </RenderTexture>
  //       </meshBasicMaterial>
  //     </mesh>
  //     </>
  //   );
  // };

  return (
    <>
      <ambientLight intensity={0.2} />
      <Environment preset={"city"} />
      {/* <Grid
        position-y={-viewport.height / 2}
        sectionSize={1}
        sectionColor={"red"}
        sectionThickness={1}
        cellSize={0.5}
        cellColor={"#000000"}
        cellThickness={0.6}
        infiniteGrid
        fadeDistance={50}
        fadeStrength={5}
      /> */}
      {/* map through all scenes to render a component for each of them */}
        {/* <Env scene={scenes[slide]} /> */}
        <Scene {...scenes[slide]}/>
    </>
  );
};
