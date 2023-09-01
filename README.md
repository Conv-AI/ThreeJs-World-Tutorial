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
