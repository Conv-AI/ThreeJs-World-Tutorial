import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Loader, OrbitControls, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useZustStore } from "./hooks/useStore";

import { Suspense, useRef } from "react";
import ChatBubble from "./components/chat/Chat";

const testing = false;
function App() {
  const actions = useZustStore((state) => state.actions);
  // global client state
  const clientState = useZustStore((state) => state.clientState);
  // Hero character Reference
  const heroRef = useRef();
  actions.updateHeroRef(heroRef);

  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          shadows
          camera={{ position: [0, 2, 3], fov: 75 }}
          // loading the navigation mesh on canvas load
          onCreated={() => {
            actions.loadNavMesh("/platform_navmesh.glb");
          }}
        >
          <color attach="background" args={["#ececec"]} />
          {testing ? <Stats /> : null}
          {testing ? <axesHelper args={[2]} /> : null}
          <Physics debug={testing ? true : false}>
            <Experience heroRef={heroRef} />
          </Physics>
        </Canvas>
      </Suspense>
      <Loader />
      {clientState ? (
        // Convai chat bubble integration
        <ChatBubble chatHistory={"Show"} client={clientState} />
      ) : null}
    </>
  );
}

export default App;
