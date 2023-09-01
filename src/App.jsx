import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Loader, OrbitControls, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";

const testing = false;
function App() {
  // reference to hero character
  const heroRef = useRef();

  return (
    <>
      <Suspense fallback={null}>
        {/* Initial Canvas setup */}
        <Canvas shadows camera={{ position: [0, 2, 3], fov: 75 }}>
          {/* Sets the background color */}
          <color attach="background" args={["#ececec"]} />
          {/* Performance monitoring */}
          {testing ? <Stats /> : null}
          {testing ? <axesHelper args={[2]} /> : null}
          {/* Rapier Physics wrapper */}
          <Physics debug={testing ? true : false}>
            <Experience heroRef={heroRef} />
          </Physics>
        </Canvas>
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
