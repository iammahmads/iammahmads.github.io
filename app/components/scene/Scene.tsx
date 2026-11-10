import { lazy, Suspense, useEffect, useState } from "react";
import { detectPerformanceTier } from "./store";

const SceneClient = lazy(() => import("./SceneClient"));

export function Scene() {
  const [mounted, setMounted] = useState(false);
  const [isTierZero, setIsTierZero] = useState(false);

  useEffect(() => {
    const tier = detectPerformanceTier();
    if (tier === 0) {
      setIsTierZero(true);
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isTierZero) {
    // Static atmospheric poster fallback for Tier 0 or reduced-motion
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute top-1/4 right-1/6 w-96 h-96 rounded-full bg-[#B9A7FF]/10 blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-[#3DF2E0]/5 blur-[100px]" />
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <SceneClient />
    </Suspense>
  );
}
