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
