import { Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useControls } from "leva";
import { Scene } from "./Scene";
import { slideAtom } from "./Overlay";

// Array of three scenes with three different models
export const scenes = [
  {
    path: "/models/gt3rs.glb",
    name: "911 GT3RS",
    description: "Focus. Speed. I am Speed. One winner, forty two losers. I eat losers for breakfast.",
  },
  {
    path: "/models/918.glb",
    name: "918 spyder",
    description: "I am so excited that I get to train you. These young guys are great and all, but I like a challenge.",
  },
  {
    path: "/models/carrera.glb",
    name: "Carrera",
    description: "You have no idea what a pleasure it is for me to finally beat to you.",
  },
];

export const Experience = () => {
  const [slide] = useAtom(slideAtom);
  const viewport = useThree((state) => state.viewport);
  const { slideDistance } = useControls({
    slideDistance: {
      value: 1,
      min: 0,
      max: 10,
    },
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <Environment preset={"city"} />
        <Scene {...scenes[slide]}/>
    </>
  );
};
