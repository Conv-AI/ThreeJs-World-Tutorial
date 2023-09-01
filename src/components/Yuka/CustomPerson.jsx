import { Vehicle } from "yuka";

// Custom Person for initializing entity with navmesh and energy
class CustomPerson extends Vehicle {
  constructor(energy) {
    super();
    this.currentEnergy = energy;
    this.maxEnergy = energy;
    this.navMesh = null;
    this.currentRegion = null;
    this.fromRegion = null;
    this.toRegion = null;
  }

  update(delta) {
    super.update(delta);
    this.rotation.x = 0;
    this.rotation.z = 0;
    this.maxSpeed = 2;
    this.maxForce = 1;
    this.maxTurnRate = Math.PI / 16;
    const currentRegion = this.navMesh.getRegionForPoint(this.position, 1);

    if (currentRegion !== null) {
      this.currentRegion = currentRegion;

      const distance = this.currentRegion.distanceToPoint(this.position);
      this.position.y -= distance * 0.25;
    }

    return this;
  }
}

export { CustomPerson };
