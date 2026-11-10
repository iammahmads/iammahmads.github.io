import { useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useLocation } from "react-router";
import {
  sceneStore,
  detectPerformanceTier,
  updatePointer,
  updateScroll,
  setRouteMode,
  type PerformanceTier,
} from "./store";
import { Core } from "./Core";
import { Lighting } from "./Lighting";

export default function SceneClient() {
  const location = useLocation();
  const [tier, setTier] = useState<PerformanceTier>(2);
  const routeMode = location.pathname === "/" ? "home" : "subpage";

  useEffect(() => {
    const determinedTier = detectPerformanceTier();
    setTier(determinedTier);
    sceneStore.tier = determinedTier;
    setRouteMode(routeMode);
  }, [routeMode]);

  // Event listeners for high-frequency input and visibility
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      // Normalize pointer coordinates to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      updatePointer(x, y);
    };

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      updateScroll(progress);
    };

    const handleVisibility = () => {
      sceneStore.visible = !document.hidden;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const dpr = useMemo(() => {
    if (tier === 1) return 1;
    if (tier === 2) return Math.min(1.5, window.devicePixelRatio || 1);
    return Math.min(1.75, window.devicePixelRatio || 1);
  }, [tier]);

  // Tier 0 fallback: Canvas is not mounted at all (handled by Scene.tsx)
  if (tier === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000"
      style={{ opacity: 0.95 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={dpr}
        gl={{
          antialias: tier >= 2,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Lighting />
        <Core tier={tier} routeMode={routeMode} />
      </Canvas>
    </div>
  );
}
