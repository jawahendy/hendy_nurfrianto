// Scroll progress lives outside React so the render loop can read it every frame
// without re-rendering the DOM layer.
export const journey = {
  // 0..(stageCount - 1), fractional while walking between stops
  stage: 0,
  reducedMotion: false,
}

export const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
  return t * t * (3 - 2 * t)
}

// Holds the walker at each stop for the first and last part of a section,
// so the visitor reads while standing still and walks while the card changes.
export const walkPosition = (stage: number): number => {
  const base = Math.floor(stage)
  return base + smoothstep(0.18, 0.82, stage - base)
}

// Written by the walker each frame, read by the camera rig
export const walker = {
  x: 0,
  z: 0,
  speed: 0,
}

// 1 while standing at a stop, 0 while walking the road between stops.
// Drops to 0 before walkPosition starts moving, so the walker steps out of
// the yard onto the road first and back in on arrival.
export const dwellAmount = (stage: number): number => {
  const t = stage - Math.floor(stage)
  return 1 - smoothstep(0.03, 0.15, Math.min(t, 1 - t))
}
