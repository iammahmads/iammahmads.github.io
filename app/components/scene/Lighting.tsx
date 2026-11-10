export function Lighting() {
  return (
    <>
      {/* Soft ambient aubergine */}
      <ambientLight color="#241346" intensity={0.7} />

      {/* Primary key light */}
      <directionalLight
        position={[6, 8, 8]}
        intensity={1.2}
        color="#F3F1FA"
      />

      {/* Lilac rim lighting */}
      <directionalLight
        position={[-8, 6, -6]}
        intensity={1.6}
        color="#B9A7FF"
      />

      {/* Subtle aqua secondary bounce light */}
      <pointLight
        position={[4, -6, 4]}
        intensity={0.8}
        color="#3DF2E0"
        distance={15}
      />
    </>
  );
}

