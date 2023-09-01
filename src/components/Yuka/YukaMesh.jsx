import { useEffect, useRef } from "react";
import { useZustStore } from "../../hooks/useStore";

// Navigation Mesh
export const YukaMesh = () => {
  const yukaRef = useRef();

  useEffect(() => {
    if (yukaRef.current) {
      useZustStore.setState((state) => ({
        refs: {
          ...state.refs,
          level: yukaRef.current,
        },
      }));
    }
  }, []);

  const level = useZustStore((state) => state.level);
  return (
    <group>
      <mesh material={level.material} geometry={level.geometry} ref={yukaRef} />
    </group>
  );
};
