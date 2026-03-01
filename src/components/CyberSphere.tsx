import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { MeshDistortMaterial, Sphere, Float, Points, PointMaterial, Ring } from "@react-three/drei";

export function CyberSphere({ scrollProgress }: { scrollProgress: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate random particles for the background
  const particles = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const progress = scrollProgress.get();
    const mouse = state.mouse;

    if (groupRef.current) {
      // Follow mouse cursor with smooth lerping
      const targetX = mouse.x * 2;
      const targetY = mouse.y * 2;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
      
      // Smaller base scale, grows slightly on scroll
      const scale = 1.2 + progress * 0.8;
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (coreRef.current) {
      coreRef.current.rotation.z = time * 0.5;
      const corePulse = 0.5 + Math.sin(time * 3) * 0.05;
      coreRef.current.scale.set(corePulse, corePulse, corePulse);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.4;
      ring1Ref.current.rotation.y = time * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = time * 0.3;
      ring2Ref.current.rotation.x = -time * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background Particles (Data Stream) */}
      <Points ref={particlesRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ff9d"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.3}
        />
      </Points>

      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.2}>
        {/* Outer Digital Shield Shell */}
        <Sphere args={[1, 32, 32]} ref={meshRef}>
          <MeshDistortMaterial
            color="#00ff9d"
            speed={4}
            distort={0.3}
            radius={1}
            wireframe
            transparent
            opacity={0.2}
          />
        </Sphere>

        {/* Scanning Rings */}
        <Ring args={[1.2, 1.22, 64]} ref={ring1Ref}>
          <meshBasicMaterial color="#00ff9d" transparent opacity={0.5} side={THREE.DoubleSide} />
        </Ring>
        
        <Ring args={[1.4, 1.41, 64]} ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00ff9d" transparent opacity={0.3} side={THREE.DoubleSide} />
        </Ring>

        {/* Central Data Core */}
        <Sphere args={[0.4, 16, 16]} ref={coreRef}>
          <meshStandardMaterial
            color="#00ff9d"
            emissive="#00ff9d"
            emissiveIntensity={5}
            metalness={1}
            roughness={0}
          />
        </Sphere>
      </Float>

      {/* Core Glow */}
      <pointLight color="#00ff9d" intensity={3} distance={5} />
    </group>
  );
}
