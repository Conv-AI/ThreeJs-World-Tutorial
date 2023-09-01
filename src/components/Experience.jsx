import { RigidBody } from "@react-three/rapier";
import { Platform } from "./Platform";

export const Experience = ({ heroRef }) => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 20, 20]} intensity={1} />
      <group>
        <RigidBody friction={2} colliders="trimesh" type="fixed">
          <Platform />
        </RigidBody>
      </group>
    </>
  );
};
