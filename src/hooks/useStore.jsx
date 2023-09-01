import { NavMeshLoader } from "yuka";
import { create } from "zustand";
import * as THREE from "three";
import { createConvexRegionHelper } from "../helpers/createConvexRegionHelper";
export const useZustStore = create((set, get) => {
  return {
    navMesh: null,
    heroRef: null,
    refs: {
      level: null,
    },
    actionState: {
      Jacob: "walking",
      Maya: "walking",
    },
    level: {
      geometry: new THREE.BufferGeometry(),
      material: new THREE.MeshBasicMaterial(),
    },
    clientState: null,
    updateClient: (_client) => {
      set({
        clientState: _client,
      });
    },
    actions: {
      loadNavMesh(url) {
        const loader = new NavMeshLoader();
        loader.load(url).then((navMesh) => {
          const { geometry, material } = createConvexRegionHelper(navMesh);
          set({ navMesh });
          set({ level: { geometry, material } });
        });
      },
      updateHeroRef(reference) {
        set({ heroRef: reference });
      },
      updateActionState: {
        Maya: (action) =>
          set((state) => ({
            actionState: {
              ...state.actionState,
              Maya: action,
            },
          })),
        Jacob: (action) =>
          set((state) => ({
            actionState: {
              ...state.actionState,
              Jacob: action,
            },
          })),
      },
    },
  };
});
