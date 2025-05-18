"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	Float,
	Environment,
	PresentationControls,
	Text,
	Html,
	Box,
	RoundedBox,
} from "@react-three/drei";
import { Object3D } from "three";

interface TechModelProps {
	color: string;
	scale?: number;
	position?: [number, number, number];
	rotation?: [number, number, number];
	description?: string;
}

// Tech stack model components
function TechModel({
	color,
	scale = 1,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	description,
}: TechModelProps) {
	const modelRef = useRef<Object3D>();
	const [hovered, setHovered] = useState(false);

	useFrame((state) => {
		if (!modelRef.current) return;
		modelRef.current.rotation.y =
			Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1 + rotation[1];
	});

	return (
		<group
			ref={modelRef}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			position={position}
			rotation={rotation}
			scale={hovered ? scale * 1.2 : scale}
		>
			<RoundedBox args={[2, 2, 0.2]} radius={0.1}>
				<meshStandardMaterial color={color} />
			</RoundedBox>
			{hovered && description && (
				<Html position={[0, -2, 0]}>
					<div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg text-sm max-w-[200px] text-center">
						{description}
					</div>
				</Html>
			)}
		</group>
	);
}

const techStack = [
	{
		name: "React",
		color: "#26C6EC",
		scale: 1.5,
		position: [-4, 1, 0] as [number, number, number],
		description:
			"A JavaScript library for building user interfaces with a component-based architecture.",
	},
	{
		name: "Node.js",
		color: "#54AF41",
		scale: 1.2,
		position: [-2, -1, 0] as [number, number, number],
		description:
			"A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.",
	},
	{
		name: "TypeScript",
		color: "#16799F",
		scale: 1.3,
		position: [0, 1, 0] as [number, number, number],
		description:
			"A typed superset of JavaScript that compiles to plain JavaScript, adding optional static types.",
	},
	{
		name: "Docker",
		color: "#2196F3",
		scale: 1.4,
		position: [2, -1, 0] as [number, number, number],
		description:
			"A platform for developing, shipping, and running applications in containers.",
	},
	{
		name: "AWS",
		color: "#FF8000",
		scale: 1.3,
		position: [4, 1, 0] as [number, number, number],
		description:
			"Amazon Web Services - A comprehensive cloud computing platform offering various services.",
	},
];

export default function Floating3DObjects() {
	return (
		<div className="h-[50vh] md:h-[70vh] w-full">
			<Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
				<color attach="background" args={["#f8fafc"]} />
				<ambientLight intensity={0.5} />
				<spotLight
					position={[10, 10, 10]}
					angle={0.15}
					penumbra={1}
					intensity={1}
					castShadow
				/>

				<PresentationControls
					global
					rotation={[0, 0, 0]}
					polar={[-Math.PI / 4, Math.PI / 4]}
					azimuth={[-Math.PI / 4, Math.PI / 4]}
					config={{ mass: 2, tension: 400 }}
					snap
				>
					<Float rotationIntensity={0.5} floatIntensity={0.5} speed={1.5}>
						{techStack.map((tech, index) => (
							<group key={tech.name}>
								<TechModel
									color={tech.color}
									scale={tech.scale}
									position={tech.position}
									rotation={[0, 0, 0]}
									description={tech.description}
								/>
								<Text
									position={[
										tech.position[0],
										tech.position[1] - 1,
										tech.position[2],
									]}
									fontSize={0.5}
									color="#000"
									anchorX="center"
									anchorY="middle"
								>
									{tech.name}
								</Text>
							</group>
						))}
					</Float>
				</PresentationControls>

				<Environment preset="city" />
			</Canvas>
		</div>
	);
}
