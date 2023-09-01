import { useFrame } from '@react-three/fiber';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { EntityManager, FollowPathBehavior } from 'yuka';
import { useZustStore } from './useStore';
import * as THREE from 'three';
const mgrContext = createContext();

// entity manager

export const Manager = ({ children }) => {
  const [mgr] = useState(() => new EntityManager(), []);
  const [actionState, updateActionState, navMesh, heroRef] = useZustStore(
    (state) => [
      state.actionState,
      state.actions.updateActionState,
      state.navMesh,
      state.heroRef,
    ]
  );
  useEffect(() => {
    if (!navMesh) {
      return;
    }

    mgr.entities.forEach((entity) => {
      const toRegion = entity.navMesh.getRandomRegion();
      entity.position.copy(toRegion.centroid);
      entity.toRegion = toRegion;
      const followPathBehavior = new FollowPathBehavior();
      followPathBehavior.nextWaypointDistance = 0.1;
      followPathBehavior.active = false;
      entity.steering.add(followPathBehavior);
    });
  }, [navMesh, mgr.entities]);

  const findNextPath = (_delta) => {
    mgr.entities.forEach((entity) => {
      const followPathBehavior = entity.steering.behaviors[0];
      if (actionState[entity.name] === 'walking') {
        entity.currentEnergy -= _delta;
        if (entity.currentEnergy < 0) {
          updateActionState[entity.name]('idle');
          entity.maxForce = 0;
          entity.maxSpeed = 0;
          followPathBehavior.active = false;
          followPathBehavior.path.clear();
        } else if (entity.currentRegion === entity.toRegion) {
          entity.maxForce = 1;
          entity.maxSpeed = 2;
          entity.fromRegion = entity.toRegion;
          entity.toRegion = entity.navMesh.getRandomRegion();
          const from = entity.position;
          const to = entity.toRegion.centroid;
          const path = entity.navMesh.findPath(from, to);
          followPathBehavior.path.clear();
          followPathBehavior.active = true;

          for (const point of path) {
            followPathBehavior.path.add(point);
            entity.rotateTo(point, _delta * 5);
          }
        }
      } else if (actionState[entity.name] === 'talking') {
        // stops the entity and increases the energy slower

        if (heroRef.current) {
          const heroWorldPosition = heroRef.current.getWorldPosition(
            new THREE.Vector3()
          );
          entity.rotateTo(heroWorldPosition, _delta * 5);
        }
        entity.currentEnergy += _delta;
        entity.maxForce = 0;
        entity.maxSpeed = 0;
        followPathBehavior.active = false;
        followPathBehavior.path.clear();
      } else if (actionState[entity.name] === 'listening') {
        if (heroRef.current) {
          const heroWorldPosition = heroRef.current.getWorldPosition(
            new THREE.Vector3()
          );
          entity.rotateTo(heroWorldPosition, _delta * 5);
        }
        entity.currentEnergy += _delta;
        entity.maxForce = 0;
        entity.maxSpeed = 0;
        followPathBehavior.active = false;
        followPathBehavior.path.clear();
      } else {
        entity.currentEnergy += 3 * _delta;
        if (entity.currentEnergy >= entity.maxEnergy) {
          updateActionState[entity.name]('walking');
          entity.maxForce = 1;
          entity.maxSpeed = 2;
          entity.fromRegion = entity.toRegion;
          entity.toRegion = entity.navMesh.getRandomRegion();
          const from = entity.position;
          const to = entity.toRegion.centroid;
          const path = entity.navMesh.findPath(from, to);
          followPathBehavior.path.clear();
          followPathBehavior.active = true;

          for (const point of path) {
            followPathBehavior.path.add(point);
            entity.rotateTo(point, _delta);
          }
        }
      }
    });
  };

  useFrame((state, _delta) => {
    mgr.update(_delta);
    findNextPath(_delta);
  });

  return <mgrContext.Provider value={mgr}>{children}</mgrContext.Provider>;
};

//reusable yuka hook

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
