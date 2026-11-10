import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { sceneStore, type PerformanceTier } from "./store";

interface CoreProps {
  tier: PerformanceTier;
  routeMode: "home" | "subpage";
}

// Drag tuning
const DRAG_SPEED = 0.008; // radians of rotation per pixel dragged
const MAX_SPIN = 10; // rad/s cap on the fling velocity at release
const SPIN_DAMPING = 3.2; // higher = inertia fades out faster
const AXIS_X = new THREE.Vector3(1, 0, 0);
const AXIS_Y = new THREE.Vector3(0, 1, 0);

export function Core({ tier, routeMode }: CoreProps) {
  const gl = useThree((s) => s.gl);

  const groupRef = useRef<THREE.Group>(null);
  const outerCoreRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const shardsRef = useRef<THREE.Group>(null);

  // Interaction state (refs so pointer events never trigger re-renders)
  const hovered = useRef(false);
  const dragging = useRef(false);
  const lastMove = useRef({ x: 0, y: 0, t: 0 });
  const spin = useRef({ x: 0, y: 0 }); // angular velocity (rad/s) around world X / Y
  const stopDragRef = useRef<(() => void) | null>(null);
  const autoRot = useRef({ x: 0, y: 0 }); // accumulated idle drift
  const anim = useRef({ idle: 1, tilt: 1, glow: 0 }); // eased 0..1 blend values

  // Scratch objects, allocated once instead of every frame
  const dragQuat = useMemo(() => new THREE.Quaternion(), []); // user-applied rotation
  const baseQuat = useMemo(() => new THREE.Quaternion(), []); // idle drift + cursor tilt
  const stepQuat = useMemo(() => new THREE.Quaternion(), []);
  const tiltEuler = useMemo(() => new THREE.Euler(), []);
  const targetScaleVec = useMemo(() => new THREE.Vector3(), []);

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

  // Never leave a stuck cursor or dangling window listeners behind
  useEffect(() => {
    const canvas = gl.domElement;
    return () => {
      stopDragRef.current?.();
      canvas.style.cursor = "";
    };
  }, [gl]);

  // Rotate in screen space: horizontal drag spins around world Y, vertical around world X.
  // Using a quaternion (instead of adding to Euler angles) keeps the drag feeling
  // consistent no matter how far the core has already been turned.
  const rotateBy = (angleX: number, angleY: number) => {
    stepQuat.setFromAxisAngle(AXIS_Y, angleY);
    dragQuat.premultiply(stepQuat);
    stepQuat.setFromAxisAngle(AXIS_X, angleX);
    dragQuat.premultiply(stepQuat).normalize();
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hovered.current = true;
    if (!dragging.current) gl.domElement.style.cursor = "grab";
  };

  const handlePointerOut = () => {
    hovered.current = false;
    if (!dragging.current) gl.domElement.style.cursor = "";
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    stopDragRef.current?.(); // safety: end any drag that never got a pointerup

    dragging.current = true;
    spin.current.x = 0;
    spin.current.y = 0;
    lastMove.current = {
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
      t: performance.now(),
    };
    gl.domElement.style.cursor = "grabbing";
    document.body.style.userSelect = "none"; // no text selection while dragging

    const onMove = (ev: PointerEvent) => {
      const now = performance.now();
      const dx = ev.clientX - lastMove.current.x;
      const dy = ev.clientY - lastMove.current.y;
      const dt = Math.max((now - lastMove.current.t) / 1000, 0.001);
      lastMove.current = { x: ev.clientX, y: ev.clientY, t: now };

      const angleY = dx * DRAG_SPEED;
      const angleX = dy * DRAG_SPEED;
      rotateBy(angleX, angleY);

      // Smoothed angular velocity, used for the fling when the pointer is released
      spin.current.x = THREE.MathUtils.lerp(spin.current.x, angleX / dt, 0.4);
      spin.current.y = THREE.MathUtils.lerp(spin.current.y, angleY / dt, 0.4);
    };

    const stop = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      stopDragRef.current = null;

      dragging.current = false;
      document.body.style.userSelect = "";
      gl.domElement.style.cursor = hovered.current ? "grab" : "";

      // If the pointer rested before release, don't fling; otherwise cap the speed
      if (performance.now() - lastMove.current.t > 80) {
        spin.current.x = 0;
        spin.current.y = 0;
      } else {
        spin.current.x = THREE.MathUtils.clamp(spin.current.x, -MAX_SPIN, MAX_SPIN);
        spin.current.y = THREE.MathUtils.clamp(spin.current.y, -MAX_SPIN, MAX_SPIN);
      }
    };

    // Window-level listeners so the drag keeps working when the cursor leaves the core
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    stopDragRef.current = stop;
  };

  useFrame((state, delta) => {
    if (!sceneStore.visible) return;

    const time = state.clock.getElapsedTime();
    const a = anim.current;

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

    // Ease interaction blends: idle drift slows on hover and stops while dragging,
    // cursor tilt fades out while dragging, glow rises on hover/drag
    const isDragging = dragging.current;
    const isEngaged = hovered.current || isDragging;
    a.idle = THREE.MathUtils.damp(a.idle, isDragging ? 0 : hovered.current ? 0.25 : 1, 4, delta);
    a.tilt = THREE.MathUtils.damp(a.tilt, isDragging ? 0 : 1, 6, delta);
    a.glow = THREE.MathUtils.damp(a.glow, isEngaged ? 1 : 0, 8, delta);

    if (groupRef.current) {
      // Route responsiveness: subpages calm down the central core
      const targetScale = routeMode === "home" ? 1 : 0.45;
      const targetY = routeMode === "home" ? -sceneStore.scrollProgress * 2.5 : 1.2;

      groupRef.current.scale.lerp(targetScaleVec.setScalar(targetScale), 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.05
      );

      if (outerCoreRef.current) {
        // Inertia after release
        const s = spin.current;
        if (!isDragging && (Math.abs(s.x) > 0.01 || Math.abs(s.y) > 0.01)) {
          rotateBy(s.x * delta, s.y * delta);
          const k = Math.exp(-SPIN_DAMPING * delta);
          s.x *= k;
          s.y *= k;
        }

        // Slow auto-drift + cursor tilt, then layer the user's rotation on top
        autoRot.current.x += delta * 0.15 * a.idle;
        autoRot.current.y += delta * 0.2 * a.idle;
        tiltEuler.set(
          autoRot.current.x + sceneStore.pointer.y * 0.4 * a.tilt,
          autoRot.current.y + sceneStore.pointer.x * 0.5 * a.tilt,
          0
        );
        baseQuat.setFromEuler(tiltEuler);
        outerCoreRef.current.quaternion.copy(dragQuat).multiply(baseQuat);

        // Subtle hover feedback
        outerCoreRef.current.scale.setScalar(1 + 0.06 * a.glow);
      }

      if (innerCoreRef.current) {
        innerCoreRef.current.rotation.x = -time * 0.25;
        innerCoreRef.current.rotation.z = time * 0.3;
      }
    }

    innerMaterial.emissiveIntensity = 1.8 + 0.9 * a.glow;

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
      {/* Outer Faceted Glass Core (interactive: hover = grab cursor, drag = rotate) */}
      <mesh
        ref={outerCoreRef}
        geometry={outerGeo}
        material={glassMaterial}
        castShadow
        receiveShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
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