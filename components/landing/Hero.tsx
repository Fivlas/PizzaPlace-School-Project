"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button } from "../ui/button";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
//@ts-expect-error - OBJLoader types are not properly exported in three.js
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
//@ts-expect-error - MTLLoader types are not properly exported in three.js
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

const PizzaModel = () => {
    const [model, setModel] = useState<THREE.Group | null>(null);
    const cutterRef = useRef<THREE.Mesh | null>(null);
    const pizzaRef = useRef<THREE.Mesh | null>(null);
    const timeRef = useRef(0);

    useEffect(() => {
        const loadModel = async () => {
            const mtlLoader = new MTLLoader();
            mtlLoader.setPath("/PizzaModel/");
            mtlLoader.load("pizza.mtl", (materials: THREE.Material) => {
                // materials.preload();

                const objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath("/PizzaModel/");
                objLoader.load("pizza.obj", (object: THREE.Group) => {
                    const textureLoader = new THREE.TextureLoader();
                    const texture = textureLoader.load("PizzaModel/Textures/foodkit-colormap.png");
                    texture.colorSpace = THREE.SRGBColorSpace;

                    object.traverse((child: THREE.Object3D) => {
                        if ((child as THREE.Mesh).isMesh) {
                            const mesh = child as THREE.Mesh;
                            mesh.material = new THREE.MeshBasicMaterial({
                                map: texture,
                                reflectivity: 1,
                                color: 0xffffff,
                            });
                            mesh.material.needsUpdate = true;

                            if (child.name === "pizza-cutter") {
                                cutterRef.current = mesh;
                            }

                            if (child.name === "pizza") {
                                pizzaRef.current = mesh;
                            }
                        }
                    });

                    setModel(object);
                });
            });
        };

        loadModel();
    }, []);

    useFrame((_, delta) => {
        if (cutterRef.current) {
            timeRef.current += delta;
            const rangeStart = 0.46;
            const rangeEnd = -0.34;
            const amplitude = rangeEnd - rangeStart;
            const cosX = ((Math.cos(timeRef.current * 2) + 1) / 2) * amplitude + rangeStart;
            cutterRef.current.position.x = cosX;
        }
    });

    return model ? (
        <primitive object={model} scale={7} position={[0, 0, 0]} rotation={[0.438407346410207, Math.PI * 2, 0]} />
    ) : null;
};

const Hero = () => {
    return (
        <div id="main" className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 md:py-16 bg-[#ffead1] text-[#5a3e2b]">
            <div className="max-w-lg text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight  text-[#e74a27] font-[Shrikhand] decoration-wavy underline underline-offset-11">
                    John&apos;s Pizza
                </h1>
                <p className="text-lg md:text-xl mt-4 font-medium font-[Shrikhand]">
                    Bringing you the grooviest slices in town, straight from the
                    past!
                </p>
                <div className="mt-6 flex gap-4 justify-center md:justify-start">
                    <Button
                        className="cursor-pointer"
                        variant="ghost"
                    >
                        View Specials
                    </Button>
                    <Button
                        variant="default"
                        className="bg-primary px-6 py-4 hover:scale-95 hover:opacity-80 rounded-full transition-all shadow-md cursor-pointer"
                    >
                        Order Now
                    </Button>
                </div>
            </div>

            {/* 3D Pizza Model */}
            <div className="w-full md:w-[700px] h-[150px] md:h-[450px] md:mt-0">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Suspense fallback={null}>
                        <PizzaModel />
                    </Suspense>
                    <OrbitControls
                        enableZoom
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2}
                    />
                </Canvas>
            </div>
        </div>
    );
};

export default Hero;
