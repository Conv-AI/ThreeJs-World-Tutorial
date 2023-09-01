import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Platform(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/platform.glb');
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
                <mesh
                  name="Object_5"
                  geometry={nodes.Object_5.geometry}
                  material={materials.Sky2}
                />
              </group>
              <group
                name="Plane004_1"
                position={[0, 12.961, 0]}
                rotation={[-Math.PI, 0, -Math.PI]}
              >
                <mesh
                  name="Object_7"
                  geometry={nodes.Object_7.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Platformen_2"
                position={[66.435, 13.889, -130.445]}
                rotation={[Math.PI / 2, 0, 0.57]}
              >
                <mesh
                  name="Object_9"
                  geometry={nodes.Object_9.geometry}
                  material={materials.Platformen}
                />
              </group>
              <group
                name="Platformen001_3"
                position={[-61.766, 20.867, 154.767]}
                rotation={[Math.PI / 2, 0, 0.418]}
              >
                <mesh
                  name="Object_11"
                  geometry={nodes.Object_11.geometry}
                  material={materials.Platformen}
                />
              </group>
              <group
                name="Platformen002_4"
                position={[56.339, -37.791, 170.638]}
                rotation={[Math.PI / 2, 0, -0.354]}
              >
                <mesh
                  name="Object_13"
                  geometry={nodes.Object_13.geometry}
                  material={materials.Platformen}
                />
              </group>
              <group
                name="Platformen003_5"
                position={[-39.687, -16.18, -109.772]}
                rotation={[Math.PI / 2, 0, -0.396]}
              >
                <mesh
                  name="Object_15"
                  geometry={nodes.Object_15.geometry}
                  material={materials.Platformen}
                />
              </group>
              <group
                name="Cube010_6"
                position={[0.059, 1.792, 43.724]}
                rotation={[-Math.PI, 0, -Math.PI]}
              >
                <mesh
                  name="Object_17"
                  geometry={nodes.Object_17.geometry}
                  material={materials.SpeakerPultBaked}
                />
              </group>
              <group
                name="Cube024_7"
                position={[3.37, 1.592, 39.053]}
                rotation={[Math.PI, -1.442, Math.PI]}
              >
                <mesh
                  name="Object_19"
                  geometry={nodes.Object_19.geometry}
                  material={materials.Bench_Baked}
                />
              </group>
              <group
                name="Cube029_8"
                position={[5.866, 1.592, 42.616]}
                rotation={[0, 1.442, 0]}
              >
                <mesh
                  name="Object_21"
                  geometry={nodes.Object_21.geometry}
                  material={materials.Bench_Baked}
                />
              </group>
              <group
                name="Cube030_9"
                position={[-6.009, 1.592, 42.473]}
                rotation={[-Math.PI, 1.441, -Math.PI]}
              >
                <mesh
                  name="Object_23"
                  geometry={nodes.Object_23.geometry}
                  material={materials.Bench_Baked}
                />
              </group>
              <group
                name="Cube031_10"
                position={[-3.504, 1.592, 38.967]}
                rotation={[0, -1.441, 0]}
              >
                <mesh
                  name="Object_25"
                  geometry={nodes.Object_25.geometry}
                  material={materials.Bench_Baked}
                />
              </group>
              <group
                name="Cube032_11"
                position={[13.288, 1.592, 34.523]}
                rotation={[Math.PI, -1.058, Math.PI]}
              >
                <mesh
                  name="Object_27"
                  geometry={nodes.Object_27.geometry}
                  material={materials.Bench_Baked}
                />
              </group>
              <group
                name="Cube033_12"
                position={[6.613, 1.592, 29.141]}
                rotation={[-Math.PI, 0.439, -Math.PI]}
              >
                <mesh
                  name="Object_29"
                  geometry={nodes.Object_29.geometry}
                  material={materials.Bench_Baked}
                />
              </group>
              <group
                name="Cube034_13"
                position={[-6.606, 1.592, 29.147]}
                rotation={[-Math.PI, -0.439, -Math.PI]}
              >
                <mesh
                  name="Object_31"
                  geometry={nodes.Object_31.geometry}
                  material={materials.Bench_Baked}
                />
              </group>
              <group
                name="Cube035_14"
                position={[-13.385, 1.592, 34.523]}
                rotation={[-Math.PI, 1.058, -Math.PI]}
              >
                <mesh
                  name="Object_33"
                  geometry={nodes.Object_33.geometry}
                  material={materials.Bench_Baked}
                />
              </group>
              <group
                name="Plane029_15"
                position={[3.306, 1.576, 38.832]}
                rotation={[Math.PI, -1.425, Math.PI]}
              >
                <mesh
                  name="Object_35"
                  geometry={nodes.Object_35.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane033_16"
                position={[5.93, 1.576, 42.837]}
                rotation={[0, 1.425, 0]}
              >
                <mesh
                  name="Object_37"
                  geometry={nodes.Object_37.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane035_17"
                position={[-5.91, 1.576, 42.529]}
                rotation={[-Math.PI, 1.458, -Math.PI]}
              >
                <mesh
                  name="Object_39"
                  geometry={nodes.Object_39.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane037_18"
                position={[-3.511, 1.576, 38.859]}
                rotation={[0, -1.458, 0]}
              >
                <mesh
                  name="Object_41"
                  geometry={nodes.Object_41.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane038_19"
                position={[6.635, 1.576, 28.944]}
                rotation={[-Math.PI, 0.677, -Math.PI]}
              >
                <mesh
                  name="Object_43"
                  geometry={nodes.Object_43.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane039_20"
                position={[-6.574, 1.576, 28.912]}
                rotation={[-Math.PI, -0.584, -Math.PI]}
              >
                <mesh
                  name="Object_45"
                  geometry={nodes.Object_45.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="BezierCurve005_21"
                position={[-0.013, 1.689, 31.788]}
              >
                <mesh
                  name="Object_47"
                  geometry={nodes.Object_47.geometry}
                  material={materials.WaterChannelBaked}
                />
              </group>
              <group name="Plane003_22" position={[0, 1.55, 0]}>
                <mesh
                  name="Object_49"
                  geometry={nodes.Object_49.geometry}
                  material={materials.OuterFloorBaked}
                />
                <mesh
                  name="Object_50"
                  geometry={nodes.Object_50.geometry}
                  material={materials.GLow}
                />
              </group>
              <group name="Plane002_23">
                <mesh
                  name="Object_52"
                  geometry={nodes.Object_52.geometry}
                  material={materials.InnerFloorBaked}
                />
              </group>
              <group name="Plane026_24" position={[0, 1.55, 0]}>
                <mesh
                  name="Object_54"
                  geometry={nodes.Object_54.geometry}
                  material={materials.PolyRingBaked}
                />
              </group>
              <group
                name="Plane023_25"
                position={[11.215, 2.103, 21.44]}
                rotation={[-Math.PI, 0.683, -Math.PI]}
              >
                <mesh
                  name="Object_56"
                  geometry={nodes.Object_56.geometry}
                  material={materials.ColumnBaked}
                />
              </group>
              <group
                name="Plane025_26"
                position={[11.712, 1.773, -19.567]}
                rotation={[-Math.PI, -0.773, -Math.PI]}
              >
                <mesh
                  name="Object_58"
                  geometry={nodes.Object_58.geometry}
                  material={materials.ColumnBaked}
                />
              </group>
              <group
                name="Plane041_27"
                position={[0, 12.66, 0]}
                rotation={[-Math.PI, 0, -Math.PI]}
              >
                <mesh
                  name="Object_60"
                  geometry={nodes.Object_60.geometry}
                  material={materials.Roof_fabric_baked}
                />
              </group>
              <group
                name="BezierCurve004_28"
                position={[-0.013, 2.051, 31.788]}
              >
                <mesh
                  name="Object_62"
                  geometry={nodes.Object_62.geometry}
                  material={materials.Water}
                />
              </group>
              <group
                name="Plane010_29"
                position={[0, -2.113, 0]}
                scale={[4.789, 1.57, 4.789]}
              >
                <mesh
                  name="Object_64"
                  geometry={nodes.Object_64.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane030_30"
                position={[0, -1.25, 8.024]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[3.024, 0.991, 3.024]}
              >
                <mesh
                  name="Object_66"
                  geometry={nodes.Object_66.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane042_31"
                position={[0, -1.25, -7.749]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[3.024, 0.991, 3.024]}
              >
                <mesh
                  name="Object_68"
                  geometry={nodes.Object_68.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane011_32"
                position={[4.575, 0, -4.949]}
                scale={[1.116, 0.686, 1.116]}
              >
                <mesh
                  name="Object_70"
                  geometry={nodes.Object_70.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane012_33"
                position={[4.043, 0, -16.045]}
                rotation={[0, -0.683, 0]}
                scale={0.686}
              >
                <mesh
                  name="Object_72"
                  geometry={nodes.Object_72.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane013_34"
                position={[-4.794, 0, 15.607]}
                rotation={[0, 0.993, 0]}
                scale={0.686}
              >
                <mesh
                  name="Object_74"
                  geometry={nodes.Object_74.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane015_35"
                position={[-4.159, 0, -16.049]}
                rotation={[-Math.PI, 0.858, -Math.PI]}
                scale={0.686}
              >
                <mesh
                  name="Object_76"
                  geometry={nodes.Object_76.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane017_36"
                position={[4.574, 0, 15.728]}
                rotation={[-Math.PI, 1.132, -Math.PI]}
                scale={0.686}
              >
                <mesh
                  name="Object_78"
                  geometry={nodes.Object_78.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane043_37"
                position={[-4.734, 0, -4.949]}
                scale={[1.116, 0.686, 1.116]}
              >
                <mesh
                  name="Object_80"
                  geometry={nodes.Object_80.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane044_38"
                position={[4.575, 0, 4.207]}
                scale={[1.116, 0.686, 1.116]}
              >
                <mesh
                  name="Object_82"
                  geometry={nodes.Object_82.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Plane045_39"
                position={[-4.734, 0, 4.207]}
                scale={[1.116, 0.686, 1.116]}
              >
                <mesh
                  name="Object_84"
                  geometry={nodes.Object_84.geometry}
                  material={materials.SockelBaked}
                />
              </group>
              <group
                name="Cube037_40"
                position={[8.707, 2.08, 7.62]}
                rotation={[0, Math.PI / 4, 0]}
              >
                <mesh
                  name="Object_86"
                  geometry={nodes.Object_86.geometry}
                  material={materials.FrameBaked}
                />
              </group>
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

useGLTF.preload('/platform.glb');
