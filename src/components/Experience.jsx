import { RigidBody } from "@react-three/rapier";
import { Platform} from "./Platform";
import { CharacterController } from "./CharacterController/CharacterController";
import { Manager } from "../hooks/useYuka";
import { JacobNpc } from "./Npcs";
import { YukaMesh } from "./Yuka/YukaMesh";

export const Experience = ({ heroRef }) => {
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[0, 20, 20]} intensity={1} />
      {/* YUKA manager */}
      <Manager>
        {/* Hero character controller component */}
        <CharacterController reference={heroRef} />
        {/* Convai NPC Jacob component */}
        <JacobNpc name="Jacob" position={[0, 0, 8]} heroRef={heroRef} />
        {/* <YukaMesh /> */}
        <group>
          {/* Rapier triangler collider for stage */}
          <RigidBody friction={2} colliders="trimesh" type="fixed">
            <Platform />
          </RigidBody>
        </group>
      </Manager>
    </>
  );
};
