"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Line, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Particles() {
  const count = 500;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (state.pointer.x * 100 - particle.mx) * 0.01;
      particle.my += (state.pointer.y * 100 - particle.my) * 0.01;
      dummy.position.set(
        (particle.mx / 10) + a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) + b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) + b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.setScalar(s * 0.2);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshBasicMaterial color="#00E5FF" />
    </instancedMesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.1, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.1, 0.05);
      
      // Scroll Parallax Effect
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollY * 0.005, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, scrollY * 0.0002, 0.05);
    }
  });

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#7C3AED" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#00FFA3" />
      
      <group ref={groupRef}>
        <Particles />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[1.5, 64, 64]} position={[-3, 2, -5]}>
            <MeshDistortMaterial color="#7C3AED" envMapIntensity={0.4} clearcoat={1} clearcoatRoughness={0} metalness={0.8} roughness={0.2} distort={0.4} speed={2} />
          </Sphere>
        </Float>
        
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 32, 32]} position={[4, -2, -3]}>
             <meshStandardMaterial wireframe color="#00E5FF" />
          </Sphere>
        </Float>
        
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <gridHelper args={[100, 100, "#111111", "#111111"]} position={[0, -10, 0]} />
      </group>
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        <Noise opacity={0.05} />
      </EffectComposer>
    </>
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] bg-primary">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
