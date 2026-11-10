// Module-level store for high-frequency 3D animation variables
// Prevents React re-renders during useFrame loops

export type PerformanceTier = 0 | 1 | 2 | 3;

export interface SceneStoreState {
  tier: PerformanceTier;
  scrollProgress: number;
  pointer: { x: number; y: number };
  targetPointer: { x: number; y: number };
  isTouch: boolean;
  routeMode: "home" | "subpage";
  visible: boolean;
  reducedMotion: boolean;
}

export const sceneStore: SceneStoreState = {
  tier: 2,
  scrollProgress: 0,
  pointer: { x: 0, y: 0 },
  targetPointer: { x: 0, y: 0 },
  isTouch: false,
  routeMode: "home",
  visible: true,
  reducedMotion: false,
};

export function updatePointer(x: number, y: number) {
  sceneStore.targetPointer.x = x;
  sceneStore.targetPointer.y = y;
}

export function updateScroll(progress: number) {
  sceneStore.scrollProgress = progress;
}

export function setRouteMode(mode: "home" | "subpage") {
  sceneStore.routeMode = mode;
}

export function detectPerformanceTier(): PerformanceTier {
  if (typeof window === "undefined") return 0;

  // Check prefers-reduced-motion
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mediaQuery.matches) {
    sceneStore.reducedMotion = true;
    return 0;
  }

  // Check WebGL availability
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return 0;
  } catch {
    return 0;
  }

  // Check data-saver
  const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) {
    return 1;
  }

  // Check CPU cores and device memory
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    return cores < 4 || memory < 4 ? 1 : 2;
  }

  if (cores >= 8 && memory >= 8) {
    return 3;
  }

  return 2;
}
