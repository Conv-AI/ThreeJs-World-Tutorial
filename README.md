# Building your own NPC Universe on web browser

\***\*Prerequisites\*\***

A foundational understanding of [THREE JS](https://threejs.org/) and [React three fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction). Basic scene setup.

```jsx
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'


const App = () => {
  return (
    <Canvas
      camera={{
        position: [5, 5, -5],
        fov: 75,
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
```

![Untitled](/public/readme/Untitled.png)

## Getting Started

### React App Setup:

Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.

```bash
With NPM:
$ npm create vite@latest

With Yarn:
$ yarn create vite

With PNPM:
$ pnpm create vite
```

```bash
cd my-project

npm install
npm run dev
```

**Installing Dependencies**

```bash
npm install three @react-three/fiber @react-three/drei @react-three/rapier
```

**App.jsx**

```jsx
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Loader, OrbitControls, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useRef } from "react";

function App() {
  const testing = false;
  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 3], fov: 75 }}>
        <color attach="background" args={["#ececec"]} />
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        <OrbitControls />
        <Physics debug={testing ? true : false}>
          <Experience />
        </Physics>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
```

**Experience.jsx**

```jsx
import { RigidBody } from "@react-three/rapier";
import { Platform } from "./Platform";
export const Experience = ({ heroRef }) => {
  return (
    <>
      <ambientLight intensity={0.1} />
      {/* <OrbitControls /> */}
      <directionalLight position={[0, 20, 20]} intensity={1} />
      <RigidBody friction={2} colliders="trimesh" type="fixed">
        <Platform />
      </RigidBody>
    </>
  );
};
```

This will render a 3D scene with physics in it. To import 3D models to React Scene we can use the following command:

```bash
npx gltfjsx 'path'
```

This will convert gltf/glb files to react component which we can render directly.

```jsx
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Platform(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/platform.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Sphere_0" rotation={[0, -Math.PI / 2, 0]}>
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials.Sky1}
                />
              </group>
              ......... ......... .........
              <group name="Cube009_41">
                <mesh
                  name="Object_88"
                  geometry={nodes.Object_88.geometry}
                  material={materials.StairsFirstFloorBaked}
                />
              </group>
              <group
                name="Cube036_42"
                position={[-12.412, 3.471, -10.386]}
                rotation={[-Math.PI, -0.731, -Math.PI]}
              >
                <mesh
                  name="Object_90"
                  geometry={nodes.Object_90.geometry}
                  material={materials.Stairs_SecondFloorBaked}
                />
              </group>
              <group name="Cube008_43">
                <mesh
                  name="Object_92"
                  geometry={nodes.Object_92.geometry}
                  material={materials.StairsFirstFloorBaked}
                />
              </group>
              <group name="Outer_44" position={[0, 3.259, 0]}>
                <mesh
                  name="Object_94"
                  geometry={nodes.Object_94.geometry}
                  material={materials.Railing}
                />
              </group>
              <group name="Armature_80">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <group name="Inner_79" />
                  <skinnedMesh
                    name="Object_99"
                    geometry={nodes.Object_99.geometry}
                    material={materials.Railing}
                    skeleton={nodes.Object_99.skeleton}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/platform.glb");
```

**Platform Example:**

![Rapier_world.png](/public/readme/Rapier_world.png)
Credits : [Interdimensional Art Gallery - floating platform](https://skfb.ly/o6FLW) [License](https://creativecommons.org/licenses/by/4.0/)

**Adding Hero Character to the world:**

The above method can be used to convert any gltf/glb character to reusable react component. We are using [Ready Player Me](https://readyplayer.me/) characters for the same.

```jsx
export const CharacterController = () => {
  return (
    <group position={[0, 10, -4]}>
      <OrbitControls
        enablePan={false}
        enableDamping={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={4}
      />
      <RigidBody
        ref={rigidBody}
        colliders={false}
        enabledRotations={[false, false, false]}
        mass={1}
        type="dynamic"
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group>
          <Character />
        </group>
      </RigidBody>
    </group>
  );
};
```

This will add the character to scene with capsule collider. We can add movement through adding impulse in [x,y,z] coordinates.

See [Rapier Documentation](https://github.com/pmndrs/react-three-rapier#the-rigidbody-component) .

![movement.png](/public/readme/movement.png)

**Third Person Camera:**

When `w` `s` is pressed the character should rotate towards the camera and then impulse should be applied. To achieve this we calculate the angle between camera and character first and rotate the character when moving towards the camera.

```jsx
// Calculating the angle between character and camera for alignment.
let camAngle = Math.atan2(
  state.camera.position.x - characterWorldPosition.x,
  state.camera.position.z - characterWorldPosition.z
);

// movement directions
let newDirectionOffset = directionOffset({
  forward,
  backward,
  left,
  right,
});

rotateQuartenion.setFromAxisAngle(
  rotateAngle,
  camAngle + Math.PI + newDirectionOffset
);

characterRef.current.quaternion.rotateTowards(rotateQuartenion, 0.2);

// walk direction calculation
state.camera.getWorldDirection(walkDirection);
walkDirection.y = characterWorldPosition.y;
walkDirection.normalize();
walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);
const moveX = MOVEMENT_SPEED * walkDirection.x * 0.5;
const moveZ = MOVEMENT_SPEED * walkDirection.z * 0.5;
```

**Direction offset:**

Direction offset is calculate for the movement of character on the floor. Imagine the character moving on the floor from eagle eye view. This function helps in calculating the direction offset to know which direction to move the character on the floor.
Reference : [Basic Character Controls](https://www.youtube.com/watch?v=C3s0UHpwlf8)

```jsx
export const directionOffset = ({ forward, backward, left, right }) => {
  var directionOffset = 0;
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4;
    } else if (right) {
      directionOffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2;
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2;
    } else {
      directionOffset = Math.PI;
    }
  } else if (left) {
    directionOffset = Math.PI / 2;
  } else if (right) {
    directionOffset = -Math.PI / 2;
  }
  return directionOffset;
};
```

**Mixamo Animations:**

**Adding NPCs:**

We can add character models the similar way as previously mentioned. Further we add [convai-web-sdk](https://github.com/Conv-AI/Convai-JS-SDK-Alpha).

We can create a reusable hook for using it throughout our app.

```jsx
import { ConvaiClient } from "convai-web-sdk";
import { useEffect, useRef, useState } from "react";
export const useConvaiClient = ({ _apiKey, _characterId }) => {
  const [isProximity, setIsProximity] = useState(false);
  const [talking, setTalking] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);
  const [userText, setUserText] = useState("");
  const [npcText, setNpcText] = useState("");
  const [actionText, setActionText] = useState("");
  const [currentCharId, setCurrentCharId] = useState("");
  const [enter, setEnter] = useState(0);
  const convaiClient = useRef(null);
  const finalizedUserText = useRef();
  const npcTextRef = useRef();

  useEffect(() => {
    if (isProximity) {
      // Initiate the convai client.
      convaiClient.current = new ConvaiClient({
        apiKey: _apiKey,
        characterId: _characterId,
        enableAudio: true,
      });
      setCurrentCharId(_characterId);
      // Set a response callback. This may fire multiple times as response
      // can come in multiple parts.
      convaiClient.current.setResponseCallback((response) => {
        // live transcript, only available during audio mode.
        if (response.hasUserQuery()) {
          let transcript = response.getUserQuery();
          let isFinal = transcript.getIsFinal();
          if (isFinal) {
            finalizedUserText.current += " " + transcript.getTextData();
            transcript = "";
          }
          if (transcript) {
            setUserText(finalizedUserText.current + transcript.getTextData());
          } else {
            setUserText(finalizedUserText.current);
          }
        }
        if (response.hasAudioResponse()) {
          let audioResponse = response?.getAudioResponse();
          // Response text.
          npcTextRef.current += " " + audioResponse.getTextData();
          setNpcText(npcTextRef.current);
        }
        if (response.hasActionResponse()) {
          let actionResponse = response.getActionResponse();
          let parsedActions = actionResponse.getAction().trim().split("\n");
          setActionText(parsedActions[0].split(", "));
        }
      });

      convaiClient.current.onAudioPlay(() => {
        setTalking(true);
      });

      convaiClient.current.onAudioStop(() => {
        setTalking(false);
      });
    }
  }, [isProximity]);

  const userInput = (text) => {
    setUserText(text);
  };

  // listen to query when 't' is pressed
  const handleTPress = (e) => {
    if (e.keyCode === 84 && !keyPressed) {
      e.stopPropagation();
      e.preventDefault();
      setKeyPressed(true);
      finalizedUserText.current = "";
      npcTextRef.current = "";
      setUserText("");
      setNpcText("");
      convaiClient.current.startAudioChunk();
    }
  };
  const handleTRelease = (e) => {
    if (e.keyCode === 84 && keyPressed) {
      e.preventDefault();
      setKeyPressed(false);
      convaiClient.current.endAudioChunk();
    }
  };

  const sentText = () => {
    finalizedUserText.current = "";
    npcTextRef.current = "";
    setNpcText("");
    convaiClient.current.sendTextChunk(userText);
    setEnter(0);
  };

  return {
    convaiClient,
    setUserText,
    setNpcText,
    isProximity,
    setIsProximity,
    talking,
    userText,
    npcText,
    keyPressed,
    handleTPress,
    handleTRelease,
    userInput,
    setEnter,
    currentCharId,
  };
};
```

From this we can create a basic world with static conversational NPCs.

**Random Movement to NPCs:**

For the NPCs to know their walkable area we need to create a [Navigation Mesh](https://en.wikipedia.org/wiki/Navigation_mesh). We can achieve this using [UPBGE](https://upbge.org/). According to the character Needs we can **build Navigation mesh** and export this to our React code.

![navigationMesh.png](/public/readme/navigationMesh.png)

Further we can use [YUKA](https://mugen87.github.io/yuka/docs/index.html) to getRandomRegions from the navmesh. We can create a path from the current NPC world position to the random region selected and add follow path behavior to the NPC.

```jsx
// reusable YUKA hook
export const useYuka = ({ type, position, name, energy }) => {
  const ref = useRef();
  const mgr = useContext(mgrContext);
  const [entity] = useState(() => new type(energy));
  const navMesh = useZustStore((state) => state.navMesh);
  useEffect(() => {
    entity.position.set(...position);
    entity.name = name;
    entity.navMesh = navMesh;
    entity.setRenderComponent(ref, (entity) => {
      ref.current.position.copy(entity.position);
      ref.current.quaternion.copy(entity.rotation);
    });
    mgr.add(entity);
    return () => mgr.remove(entity);
  }, []);
  return [ref, entity];
};
```

```jsx
const mgrContext = createContext();

// entity manager

export const Manager = ({ children }) => {
  const [mgr] = useState(() => new EntityManager(), []);
  const navMesh = useZustStore((state) => state.navMesh);
  useEffect(() => {
    if (!navMesh) {
      return;
    }

    const NPC1 = mgr.entities.find((item) => item.name == "Npc1");
    NPC1.maxSpeed = 2;
    NPC1.maxForce = 5;
    NPC1.maxTurnRate = Math.PI / 16;
    // selecting a random region
    const toRegion = NPC1.navMesh.getRandomRegion();

    NPC1.position.copy(toRegion.centroid);
    NPC1.toRegion = toRegion;
    // adding followpathbehavior
    const followPathBehavior = new FollowPathBehavior();
    followPathBehavior.nextWaypointDistance = 0.1;
    followPathBehavior.active = false;
    NPC1.steering.add(followPathBehavior);
  }, [navMesh, mgr.entities]);

  //everytime the NPC reaches selected region it selects a new random region
  const findNextPath = () => {
    mgr.entities.forEach((entity) => {
      if (entity.currentRegion === entity.toRegion) {
        entity.fromRegion = entity.toRegion;
        entity.toRegion = entity.navMesh.getRandomRegion();
        const from = entity.position;
        const to = entity.toRegion.centroid;
        const path = entity.navMesh.findPath(from, to);
        const followPathBehavior = entity.steering.behaviors[0];
        followPathBehavior.path.clear();
        followPathBehavior.active = true;

        for (const point of path) {
          followPathBehavior.path.add(point);
        }
      }
    });
  };

  useFrame((state, _delta) => {
    mgr.update(_delta);
    findNextPath();
  });

  return <mgrContext.Provider value={mgr}>{children}</mgrContext.Provider>;
};
```
