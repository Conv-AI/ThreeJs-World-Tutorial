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
