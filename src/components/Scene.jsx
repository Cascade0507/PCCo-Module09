import {
    AccumulativeShadows,
    Environment,
    Lightformer,
    OrbitControls,
    PerspectiveCamera,
    ContactShadows,
    Effects,
    RandomizedLight,
    Sphere,
    useGLTF,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Canvas, useLoader } from "@react-three/fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import React, { useEffect, useState } from "react";
import { DEG2RAD } from "three/src/math/MathUtils";

export const Scene = ({ mainColor, path, ...props }) => {
    const { scene } = useLoader(GLTFLoader,path, (loader) => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
        loader.setDRACOLoader(dracoLoader)
      }) //load 3d scene

    const hdrTexture = useLoader(RGBELoader, 'public/models/garage.hdr');
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

    }, [scene]);
    const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));


    return (
        <>
            <group {...props} dispose={null}>
                <PerspectiveCamera makeDefault position={[0,0,12]} near={0.5} />
                <primitive object={scene} scale={1.5*ratioScale} rotation={[0,Math.PI/1.5,0]}/>
                
                <hemisphereLight intensity={0.5} />
                <ContactShadows resolution={1024} frames={1} position={[0,0, 0]} scale={15} blur={0.7} opacity={1} far={25} />
                
                <pointLight position={[0, 3, 0]} intensity={1} color="white" />
                <mesh scale={5*ratioScale} position={[4*ratioScale, -0.1, -0.8]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
                    <ringGeometry args={[0.9, 1, 4, 1]} />
                    <meshStandardMaterial color="white" roughness={0.75}/>
                </mesh>
                <mesh scale={5*ratioScale} position={[-4.3*ratioScale, -0.1, -0.4]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
                    <ringGeometry args={[0.9, 1, 3, 1]} />
                    <meshStandardMaterial color="white" roughness={0.75} />
                </mesh>

                <Environment files={'/models/garage.hdr'} background resolution={2048}>
                    
                    <color attach="background" args={["#15151a"]} />

                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
                    {/* Key */}
                    <Lightformer form="ring" color="red" intensity={10} scale={2} position={[10, 8, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
                    <Lightformer
                        position={[0, 5, -2]}
                        form="ring"
                        intensity={1.5}
                        color="#AE7BE4"
                        scale={[10, 5]}
                        target={[0, 0, 0]}
                    />
                </Environment>
                <Effects />
                <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />

            </group>
        </>
    );
};