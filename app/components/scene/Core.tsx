import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneStore, type PerformanceTier } from "./store";

interface CoreProps {
  tier: PerformanceTier;
  routeMode: "home" | "subpage";
}

export function Core({ tier, routeMode }: CoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerCoreRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const shardsRef = useRef<THREE.Group>(null);

  // Procedural geometries
  const outerGeo = useMemo(() => new THREE.IcosahedronGeometry(1.5, 0), []);
  const innerGeo = useMemo(() => new THREE.OctahedronGeometry(0.5, 0), []);
  const shardGeo = useMemo(() => new THREE.TetrahedronGeometry(0.2, 0), []);

  // Glass Material tailored to tier
  const glassMaterial = useMemo(() => {
    if (tier >= 2) {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#F3F1FA"),
        transmission: 0.92,
        opacity: 1,
        transparent: true,
        roughness: 0.06,
        ior: 1.52,
        thickness: 1.3,
        specularColor: new THREE.Color("#3DF2E0"),
        attenuationColor: new THREE.Color("#B9A7FF"),
        attenuationDistance: 1.5,
        flatShading: true,
      });
    }

    // Tier 1 fallback: fast reflective physical material without transmission buffer
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#241346"),
      metalness: 0.2,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      flatShading: true,
    });
  }, [tier]);

  const innerMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFB454"),
      emissive: new THREE.Color("#FFB454"),
      emissiveIntensity: 1.8,
      roughness: 0.3,
      flatShading: true,
    });
  }, []);

  const shardMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#B9A7FF"),
      metalness: 0.8,
      roughness: 0.2,
      flatShading: true,
    });
  }, []);

  // Shard initial positions
  const shardPositions = useMemo(() => {
    const count = tier === 1 ? 4 : 8;
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.4;
      items.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * (radius * 0.6) + ((i % 2) - 0.5) * 0.8,
        z: Math.sin(angle * 2) * 1.2,
        speed: 0.3 + (i % 4) * 0.15,
        rotSpeed: 0.5 + (i % 3) * 0.2,
      });
    }
    return items;
  }, [tier]);

  // Clean disposal on unmount
  useEffect(() => {
    return () => {
      outerGeo.dispose();
      innerGeo.dispose();
      shardGeo.dispose();
      glassMaterial.dispose();
      innerMaterial.dispose();
      shardMaterial.dispose();
    };
  }, [outerGeo, innerGeo, shardGeo, glassMaterial, innerMaterial, shardMaterial]);

  useFrame((state, delta) => {
    if (!sceneStore.visible) return;

    const time = state.clock.getElapsedTime();

    // Damped cursor tracking
    sceneStore.pointer.x = THREE.MathUtils.lerp(
      sceneStore.pointer.x,
      sceneStore.targetPointer.x,
      0.06
    );
    sceneStore.pointer.y = THREE.MathUtils.lerp(
      sceneStore.pointer.y,
      sceneStore.targetPointer.y,
      0.06
    );

    if (groupRef.current) {
      // Route responsiveness: subpages calm down the central core
      const targetScale = routeMode === "home" ? 1 : 0.45;
      const targetY = routeMode === "home" ? -sceneStore.scrollProgress * 2.5 : 1.2;

      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.05
      );

      // Core rotation: slow auto-drift + cursor tilt
      if (outerCoreRef.current) {
        outerCoreRef.current.rotation.x =
          time * 0.15 + sceneStore.pointer.y * 0.4;
        outerCoreRef.current.rotation.y =
          time * 0.2 + sceneStore.pointer.x * 0.5;
      }

      if (innerCoreRef.current) {
        innerCoreRef.current.rotation.x = -time * 0.25;
        innerCoreRef.current.rotation.z = time * 0.3;
      }
    }

    // Orbiting shards
    if (shardsRef.current) {
      const children = shardsRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const data = shardPositions[i];
        if (!data) continue;
        const orbitTime = time * data.speed;
        const angle = orbitTime + (i * Math.PI * 2) / children.length;
        const r = 2.4 + Math.sin(time + i) * 0.3;
        child.position.x = Math.cos(angle) * r;
        child.position.y = Math.sin(angle * 1.5) * 1.2;
        child.position.z = Math.sin(angle) * r;
        child.rotation.x += delta * data.rotSpeed;
        child.rotation.y += delta * data.rotSpeed;
      }
    }
  });

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      {/* Outer Faceted Glass Core */}
      <mesh
        ref={outerCoreRef}
        geometry={outerGeo}
        material={glassMaterial}
        castShadow
        receiveShadow
      />

      {/* Inner Glowing Amber Seed */}
      <mesh
        ref={innerCoreRef}
        geometry={innerGeo}
        material={innerMaterial}
      />

      {/* Internal warm amber light radiating through the core */}
      <pointLight
        color="#FFB454"
        intensity={2.2}
        distance={6}
        decay={2}
      />

      {/* Orbiting Facets / Shards */}
      <group ref={shardsRef}>
        {shardPositions.map((_, idx) => (
          <mesh
            key={idx}
            geometry={shardGeo}
            material={shardMaterial}
          />
        ))}
      </group>
    </group>
  );
}

