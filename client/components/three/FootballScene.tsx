import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function SoccerBall({ radius = 1.2 }: { radius?: number }) {
  const mesh = useRef<THREE.Mesh>(null!);

  // Build a faceted sphere and color alternating faces black/white to evoke a soccer ball
  const geometry = useMemo(() => {
    // Start with an icosahedron for a sporty faceted look
    const base = new THREE.IcosahedronGeometry(radius, 1);
    const nonIndexed = base.toNonIndexed();

    const count = nonIndexed.attributes.position.count; // vertices
    const faceCount = count / 3; // 3 verts per face

    const colors = new Float32Array(count * 3);
    const white = new THREE.Color("#ffffff");
    const black = new THREE.Color("#0b0b0b");

    // Color pattern: every 5th face is black, with a bit of noise so it's not too uniform
    for (let f = 0; f < faceCount; f++) {
      const isBlack = f % 5 === 0 || (f % 7 === 0 && f % 2 === 0);
      const color = isBlack ? black : white;
      for (let v = 0; v < 3; v++) {
        const i = (f * 3 + v) * 3;
        colors[i + 0] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }
    }

    nonIndexed.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    nonIndexed.computeVertexNormals();
    return nonIndexed;
  }, [radius]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.6;
    mesh.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.15;
  });

  return (
    <mesh ref={mesh} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        vertexColors
        roughness={0.35}
        metalness={0.1}
        envMapIntensity={0.6}
      />
    </mesh>
  );
}

function StadiumRim() {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1ef07a"),
        emissive: new THREE.Color("#0a3d27"),
        emissiveIntensity: 0.35,
        roughness: 0.7,
        metalness: 0.2,
      }),
    [],
  );
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} receiveShadow>
      <torusGeometry args={[3.2, 0.08, 32, 256]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

export default function FootballScene() {
  return (
    <div className="relative w-full h-[460px] md:h-[540px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#061d12] to-[#030e0a] ring-1 ring-white/10 shadow-[0_20px_80px_-20px_rgba(30,240,122,0.35)]">
      <Canvas
        shadows
        camera={{ position: [2.6, 1.8, 4.2], fov: 38 }}
        dpr={[1, 2]}
      >
        {/* Ambient and stadium lights */}
        <ambientLight intensity={0.45} />
        <spotLight
          position={[6, 8, 4]}
          angle={0.35}
          penumbra={0.8}
          intensity={2.2}
          color={new THREE.Color("#c8ffe1")}
          castShadow
        />
        <spotLight
          position={[-6, 7, -2]}
          angle={0.4}
          penumbra={0.8}
          intensity={1.6}
          color={new THREE.Color("#7fffd4")}
          castShadow
        />

        <group position={[0, -0.3, 0]}>
          <SoccerBall radius={1.25} />
          <ContactShadows
            opacity={0.35}
            scale={12}
            blur={2.8}
            far={6}
            position={[0, -1.4, 0]}
          />
          <StadiumRim />
        </group>

        <Sparkles
          count={40}
          scale={[6, 3, 6]}
          size={2.5}
          speed={0.4}
          opacity={0.25}
          color="#bbffda"
        />
        <Environment preset="night" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>

      {/* Subtle gradient vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_80%_15%,rgba(30,240,122,0.25),transparent_60%),radial-gradient(40%_40%_at_10%_90%,rgba(0,180,90,0.18),transparent_60%)]" />
    </div>
  );
}
