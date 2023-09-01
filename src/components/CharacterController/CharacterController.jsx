import { OrbitControls, useAnimations, useFBX } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { Becky } from "../Character/Becky";
import { useInput } from "../../hooks/useInput";
import { directionOffset } from "../../helpers/directionOffset";
import * as THREE from "three";

// Character Movement constants (Rapier)
const JUMP_FORCE = 2;
const MOVEMENT_SPEED = 2;
const MAX_VEL = 1;
const MAX_SHIFT_VEL = 3;

// Movement constants for third person
let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let cameraTarget = new THREE.Vector3();
let rotateQuartenion = new THREE.Quaternion();
let beckyPrevPosition = new THREE.Vector3();
export const CharacterController = ({ reference }) => {
  const camera = useThree((state) => state.camera);
  const controlsRef = useRef();
  const rigidBody = useRef();
  const beckyRef = useRef();
  // To check if the character is in contact with the floor
  const isOnFloor = useRef(true);

  // Keyboard Inputs
  const { forward, backward, left, right, jump, shift } = useInput();

  // Loading animation files
  const { animations: standingAnimation } = useFBX("animations/Standing.fbx");
  const { animations: walkingAnimation } = useFBX("animations/Walking.fbx");
  const { animations: runningAnimation } = useFBX("animations/Running.fbx");
  const { animations: jumpAnimation } = useFBX("animations/Jump.fbx");
  walkingAnimation[0].name = "walking";
  standingAnimation[0].name = "idle";
  runningAnimation[0].name = "running";
  jumpAnimation[0].name = "jump";

  const { actions } = useAnimations(
    [
      standingAnimation[0],
      walkingAnimation[0],
      runningAnimation[0],
      jumpAnimation[0],
    ],
    beckyRef
  );
  const currentAction = useRef("");

  // Hero character position before movement for camera movement
  useEffect(() => {
    beckyRef.current.getWorldPosition(beckyPrevPosition);
  }, []);

  // Using inputs to change character state
  useEffect(() => {
    let action = "";
    currentAction.current;
    if (forward || backward || left || right) {
      action = "walking";
      if (shift) {
        action = "running";
      }
    } else if (jump) {
      action = "jump";
    } else {
      action = "idle";
    }
    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right, jump, shift]);

  // Camera update according to the character movement
  const updateCamera = (moveX, moveZ) => {
    const beckyWorldPosition = beckyRef.current.getWorldPosition(
      new THREE.Vector3()
    );

    // camera movement
    camera.position.x += beckyWorldPosition.x - moveX;
    camera.position.z += beckyWorldPosition.z - moveZ;
    beckyPrevPosition = beckyWorldPosition;
    // camera updating target
    cameraTarget.x = beckyWorldPosition.x;
    cameraTarget.z = beckyWorldPosition.z;
    cameraTarget.y = beckyWorldPosition.y + 1;

    if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };

  // Impulse for character movement
  useFrame((state, delta) => {
    const impulse = { x: 0, y: 0, z: 0 };
    if (jump && isOnFloor.current) {
      impulse.y = JUMP_FORCE;
      isOnFloor.current = false;

      rigidBody.current?.applyImpulse(impulse, true);
    }

    const linvel = rigidBody.current?.linvel();

    if (
      currentAction.current === "walking" ||
      currentAction.current === "running"
    ) {
      const beckyWorldPosition = beckyRef.current.getWorldPosition(
        new THREE.Vector3()
      );
      // anlge between camera and character
      let camAngle = Math.atan2(
        state.camera.position.x - beckyWorldPosition.x,
        state.camera.position.z - beckyWorldPosition.z
      );

      // offeset direction
      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      // Character Rotation
      rotateQuartenion.setFromAxisAngle(
        rotateAngle,
        camAngle + Math.PI + newDirectionOffset
      );
      beckyRef.current.quaternion.rotateTowards(rotateQuartenion, 0.2);

      // Walk direction calculation
      state.camera.getWorldDirection(walkDirection);
      walkDirection.y = beckyWorldPosition.y;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);
      // Movement in x and z direction
      const moveX = MOVEMENT_SPEED * walkDirection.x * 0.5;
      const moveZ = MOVEMENT_SPEED * walkDirection.z * 0.5;

      // Taking absolute for negative directions
      if (
        currentAction.current === "walking" &&
        Math.abs(linvel.x) < MAX_VEL &&
        Math.abs(linvel.z) < MAX_VEL
      ) {
        impulse.z += moveZ;
        impulse.x += moveX;
      }

      if (
        currentAction.current === "running" &&
        Math.abs(linvel.x) < MAX_SHIFT_VEL &&
        Math.abs(linvel.z) < MAX_SHIFT_VEL
      ) {
        impulse.z += moveZ;
        impulse.x += moveX;
      }
    }

    rigidBody.current?.applyImpulse(impulse, true);
    updateCamera(beckyPrevPosition.x, beckyPrevPosition.z);
  });

  return (
    <group position={[0, 10, -4]}>
      {/* Restricted orbit controls */}
      <OrbitControls
        enablePan={false}
        enableDamping={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={4}
        ref={controlsRef}
      />
      <RigidBody
        ref={rigidBody}
        colliders={false}
        enabledRotations={[false, false, false]}
        mass={1}
        type="dynamic"
        onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
      >
        {/*Custom collider for character  */}
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={beckyRef}>
          {/* <Character /> */}
          <Becky reference={reference} />
        </group>
      </RigidBody>
    </group>
  );
};
