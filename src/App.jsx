import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Loader, OrbitControls, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";

const testing = false;
function App() {
  const heroRef = useRef();

  return (
    <>
      <Suspense fallback={null}>
        <Canvas shadows camera={{ position: [0, 2, 3], fov: 75 }}>
          <color attach="background" args={["#ececec"]} />
          {testing ? <Stats /> : null}
          {testing ? <axesHelper args={[2]} /> : null}
          <OrbitControls />
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
