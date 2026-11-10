import { lazy, Suspense, useEffect, useState } from "react";

const SceneClient = lazy(() => import("./SceneClient"));

export function Scene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only mount after client-side hydration
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <SceneClient />
    </Suspense>
  );
}

