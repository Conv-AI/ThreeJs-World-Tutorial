import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, Stats } from "@react-three/drei";

const testing = true;
function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 3], fov: 75 }}>
        <color attach="background" args={["#ececec"]} />
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        <OrbitControls />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
