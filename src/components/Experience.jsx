import { RigidBody } from "@react-three/rapier";
import { Platform } from "./Platform";
import { CharacterController } from "./CharacterController/CharacterController";

export const Experience = ({ heroRef }) => {
  return (
    <>
      {/* basic lights inside the canvas */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 20, 20]} intensity={1} />
      <CharacterController reference={heroRef} />
      <group>
        {/*  Builder for a triangle-mesh-shaped collider */}
        <RigidBody friction={2} colliders="trimesh" type="fixed">
          {/* stage model */}
          <Platform />
        </RigidBody>
      </group>
    </>
  );
};
