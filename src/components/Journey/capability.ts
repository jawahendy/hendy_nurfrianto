// Decides between the live WebGL town and the pre-rendered stills
export type Capability = 'pending' | 'webgl' | 'static'

export const detectCapability = (): { mode: Capability; isLowPower: boolean; isReducedMotion: boolean } => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let hasWebGL = false
  try {
    const probe = document.createElement('canvas')
    hasWebGL = Boolean(probe.getContext('webgl2') ?? probe.getContext('webgl'))
  } catch {
    hasWebGL = false
  }
  const nav = navigator as Navigator & { deviceMemory?: number }
  const isLowPower =
    (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4 || window.innerWidth < 768
  return { mode: hasWebGL ? 'webgl' : 'static', isLowPower, isReducedMotion }
}
