export const squaredDistance = (v1, v2) => {
  // Get the x, y, and z components of the vectors.
  const x1 = v1.x;
  const y1 = v1.y;
  const z1 = v1.z;
  const x2 = v2.x;
  const y2 = v2.y;
  const z2 = v2.z;

  // Calculate the squared differences between the x, y, and z components.
  const dx = x1 - x2;
  const dy = y1 - y2;
  const dz = z1 - z2;

  // Return the sum of the squared differences.
  return dx * dx + dy * dy + dz * dz;
};
