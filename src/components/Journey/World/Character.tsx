'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { MathUtils, type Group } from 'three'
import { dwellAmount, journey, walker, walkPosition } from '../store'
import { STAGE_SPACING } from '@/constants/data/journey'
import { ContactBlob } from './Kit'
import { C } from './palette'

// Procedural cartoon walker: big head, rounded hoodie, capsule limbs with
// knees and elbows. Swap for a rigged GLB later; the scene only depends on
// walker.x, walker.z and walker.speed.
const FACE_CAMERA = Math.PI / 4
// The walker uses the sidewalk at PATH_Z (traffic owns the road) and steps
// a little into each stop's yard at YARD_Z
const PATH_Z = -3.45
const YARD_Z = -4.05
// Top of the yard and sidewalk slabs, so the shoes stand on them, not in them
const GROUND_Y = 0.135

const CHEEK = '#f2a7a0'
const SHOE = '#ffffff'

const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a))

interface Joints {
  hipL: Group | null
  hipR: Group | null
  kneeL: Group | null
  kneeR: Group | null
  shoulderL: Group | null
  shoulderR: Group | null
  elbowL: Group | null
  elbowR: Group | null
}

interface LegProps {
  side: 1 | -1
  hipRef: (el: Group | null) => void
  kneeRef: (el: Group | null) => void
}

const Leg = ({ side, hipRef, kneeRef }: LegProps) => (
  <group ref={hipRef} position={[side * 0.13, 0.86, 0]}>
    <mesh position={[0, -0.13, 0]} castShadow>
      <capsuleGeometry args={[0.11, 0.26, 6, 12]} />
      <meshStandardMaterial color={C.pants} roughness={0.8} />
    </mesh>
    <group ref={kneeRef} position={[0, -0.36, 0]}>
      <mesh position={[0, -0.12, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.24, 6, 12]} />
        <meshStandardMaterial color={C.pants} roughness={0.8} />
      </mesh>
      {/* Sneaker: rounded toe with a cobalt sole */}
      <mesh position={[0, -0.42, 0.06]} scale={[1, 0.62, 1.45]} castShadow>
        <sphereGeometry args={[0.12, 16, 12]} />
        <meshStandardMaterial color={SHOE} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.48, 0.06]} scale={[1.02, 0.25, 1.48]}>
        <sphereGeometry args={[0.12, 16, 8]} />
        <meshStandardMaterial color={C.cobalt} roughness={0.6} />
      </mesh>
    </group>
  </group>
)

interface ArmProps {
  side: 1 | -1
  shoulderRef: (el: Group | null) => void
  elbowRef: (el: Group | null) => void
}

const Arm = ({ side, shoulderRef, elbowRef }: ArmProps) => (
  <group ref={shoulderRef} position={[side * 0.31, 1.47, 0]} rotation={[0, 0, side * 0.14]}>
    <mesh position={[0, -0.1, 0]} castShadow>
      <capsuleGeometry args={[0.085, 0.2, 6, 12]} />
      <meshStandardMaterial color={C.amber} roughness={0.75} />
    </mesh>
    <group ref={elbowRef} position={[0, -0.29, 0]}>
      <mesh position={[0, -0.09, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.17, 6, 12]} />
        <meshStandardMaterial color={C.amber} roughness={0.75} />
      </mesh>
      <mesh position={[0, -0.24, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.05, 14]} />
        <meshStandardMaterial color={C.amberDeep} roughness={0.75} />
      </mesh>
      <mesh position={[0, -0.33, 0]} castShadow>
        <sphereGeometry args={[0.09, 14, 12]} />
        <meshStandardMaterial color={C.skin} roughness={0.7} />
      </mesh>
    </group>
  </group>
)

const Character = () => {
  const root = useRef<Group>(null)
  const body = useRef<Group>(null)
  const upper = useRef<Group>(null)
  const head = useRef<Group>(null)
  const joints = useRef<Joints>({
    hipL: null,
    hipR: null,
    kneeL: null,
    kneeR: null,
    shoulderL: null,
    shoulderR: null,
    elbowL: null,
    elbowR: null,
  })
  const phase = useRef(0)
  const heading = useRef(FACE_CAMERA)

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    const g = root.current
    const j = joints.current
    if (
      !g || !body.current || !upper.current || !head.current ||
      !j.hipL || !j.hipR || !j.kneeL || !j.kneeR ||
      !j.shoulderL || !j.shoulderR || !j.elbowL || !j.elbowR
    ) {
      return
    }

    const target = journey.reducedMotion
      ? Math.round(journey.stage) * STAGE_SPACING
      : walkPosition(journey.stage) * STAGE_SPACING

    const dwell = journey.reducedMotion ? 1 : dwellAmount(journey.stage)
    const targetZ = PATH_Z + (YARD_Z - PATH_Z) * dwell

    const prevX = walker.x
    const prevZ = walker.z
    walker.x = journey.reducedMotion ? target : MathUtils.damp(walker.x, target, 3.2, delta)
    walker.z = journey.reducedMotion ? targetZ : MathUtils.damp(walker.z, targetZ, 4, delta)
    const step = Math.max(delta, 1e-4)
    const vx = (walker.x - prevX) / step
    const vz = (walker.z - prevZ) / step
    walker.speed = MathUtils.damp(walker.speed, Math.hypot(vx, vz), 8, delta)
    g.position.set(walker.x, GROUND_Y, walker.z)

    const isWalking = walker.speed > 0.35 && !journey.reducedMotion
    const stride = Math.min(walker.speed / 9, 1)

    // Turn along the shortest arc so crossing ±PI never spins the walker
    const wantHeading = isWalking ? Math.atan2(vx, vz) : FACE_CAMERA
    heading.current += wrapAngle(wantHeading - heading.current) * (1 - Math.exp(-8 * delta))
    g.rotation.y = heading.current

    phase.current += delta * (isWalking ? 5 + walker.speed * 0.9 : 0)
    const p = phase.current
    const swing = Math.sin(p) * 0.7 * stride

    // Legs: hip swing, knee folds as the leg passes under the body
    j.hipL.rotation.x = -swing
    j.hipR.rotation.x = swing
    j.kneeL.rotation.x = stride * (0.12 + 0.85 * Math.max(0, Math.sin(p + 1.3)))
    j.kneeR.rotation.x = stride * (0.12 + 0.85 * Math.max(0, Math.sin(p + 1.3 + Math.PI)))

    // Arms swing against the legs with soft elbows
    const t = state.clock.elapsedTime
    j.shoulderL.rotation.x = swing * 0.85
    j.shoulderR.rotation.x = -swing * 0.85
    j.elbowL.rotation.x = -(0.2 + 0.35 * stride)
    j.elbowR.rotation.x = -(0.2 + 0.35 * stride)

    // Body: bob on each step, a little twist, head counters it
    const isIdleMotion = !isWalking && !journey.reducedMotion
    const breathe = isIdleMotion ? Math.sin(t * 2) * 0.012 : 0
    body.current.position.y = Math.abs(Math.sin(p)) * 0.06 * stride + breathe
    upper.current.rotation.y = swing * 0.14
    head.current.rotation.y = -swing * 0.1
    head.current.rotation.z = isIdleMotion ? Math.sin(t * 0.8) * 0.06 : 0

    // Wave at the start
    const isWaving = !isWalking && journey.stage < 0.12 && !journey.reducedMotion
    j.shoulderR.rotation.z = MathUtils.damp(j.shoulderR.rotation.z, isWaving ? 2.7 : 0.14, 6, delta)
    j.elbowR.rotation.z = isWaving ? Math.sin(t * 8) * 0.45 : MathUtils.damp(j.elbowR.rotation.z, 0, 6, delta)
    if (isWaving) j.shoulderR.rotation.x = 0
  })

  const set = (key: keyof Joints) => (el: Group | null) => {
    joints.current[key] = el
  }

  return (
    <group ref={root} position={[0, GROUND_Y, YARD_Z]} scale={0.62}>
      <ContactBlob size={[1.1, 1.1]} position={[0, 0.01, 0]} />
      <group ref={body}>
        <Leg side={-1} hipRef={set('hipL')} kneeRef={set('kneeL')} />
        <Leg side={1} hipRef={set('hipR')} kneeRef={set('kneeR')} />

        {/* Hips */}
        <mesh position={[0, 0.9, 0]} scale={[1.05, 0.55, 0.8]} castShadow>
          <sphereGeometry args={[0.24, 18, 14]} />
          <meshStandardMaterial color={C.pants} roughness={0.8} />
        </mesh>

        <group ref={upper}>
          {/* Rounded hoodie torso */}
          <mesh position={[0, 1.2, 0]} scale={[1, 1, 0.78]} castShadow>
            <capsuleGeometry args={[0.25, 0.3, 8, 18]} />
            <meshStandardMaterial color={C.amber} roughness={0.75} />
          </mesh>
          <RoundedBox args={[0.3, 0.14, 0.06]} radius={0.03} smoothness={3} position={[0, 1.08, 0.19]}>
            <meshStandardMaterial color={C.amberDeep} roughness={0.75} />
          </RoundedBox>
          <mesh position={[0, 1.55, -0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.16, 0.07, 10, 24]} />
            <meshStandardMaterial color={C.amberDeep} roughness={0.75} />
          </mesh>
          {/* Laptop backpack */}
          <RoundedBox args={[0.42, 0.48, 0.2]} radius={0.09} smoothness={4} position={[0, 1.22, -0.25]} castShadow>
            <meshStandardMaterial color={C.cobalt} roughness={0.6} />
          </RoundedBox>
          <RoundedBox args={[0.36, 0.16, 0.06]} radius={0.05} smoothness={3} position={[0, 1.36, -0.36]}>
            <meshStandardMaterial color={C.cobaltDeep} roughness={0.6} />
          </RoundedBox>

          <Arm side={-1} shoulderRef={set('shoulderL')} elbowRef={set('elbowL')} />
          <Arm side={1} shoulderRef={set('shoulderR')} elbowRef={set('elbowR')} />

          <mesh position={[0, 1.63, 0]}>
            <cylinderGeometry args={[0.08, 0.09, 0.12, 14]} />
            <meshStandardMaterial color={C.skin} roughness={0.7} />
          </mesh>

          {/* Big cartoon head */}
          <group ref={head} position={[0, 1.95, 0]}>
            <mesh scale={[1, 0.95, 0.95]} castShadow>
              <sphereGeometry args={[0.34, 28, 22]} />
              <meshStandardMaterial color={C.skin} roughness={0.7} />
            </mesh>
            {/* Hair: cap plus a soft fringe */}
            <mesh position={[0, 0.08, -0.02]} scale={[1.03, 0.88, 1.03]} castShadow>
              <sphereGeometry args={[0.35, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2.05]} />
              <meshStandardMaterial color={C.hair} roughness={0.9} />
            </mesh>
            {[-0.15, 0, 0.15].map((x) => (
              <mesh key={x} position={[x, 0.21, 0.21]} scale={[1, 0.6, 0.75]}>
                <sphereGeometry args={[0.13, 14, 10]} />
                <meshStandardMaterial color={C.hair} roughness={0.9} />
              </mesh>
            ))}
            {[-1, 1].map((side) => (
              <group key={side}>
                <mesh position={[side * 0.33, -0.02, 0]}>
                  <sphereGeometry args={[0.07, 12, 10]} />
                  <meshStandardMaterial color={C.skin} roughness={0.7} />
                </mesh>
                {/* Eyes with a highlight */}
                <mesh position={[side * 0.12, 0, 0.3]} scale={[1, 1.35, 0.6]}>
                  <sphereGeometry args={[0.045, 12, 10]} />
                  <meshStandardMaterial color={C.ink} roughness={0.4} />
                </mesh>
                <mesh position={[side * 0.12 + 0.015, 0.025, 0.325]}>
                  <sphereGeometry args={[0.014, 8, 6]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh position={[side * 0.2, -0.08, 0.27]} scale={[1, 0.6, 0.4]}>
                  <sphereGeometry args={[0.045, 10, 8]} />
                  <meshStandardMaterial color={CHEEK} roughness={0.8} />
                </mesh>
              </group>
            ))}
            {/* Smile */}
            <mesh position={[0, -0.1, 0.31]} rotation={[0, 0, Math.PI]}>
              <torusGeometry args={[0.06, 0.013, 8, 16, Math.PI]} />
              <meshStandardMaterial color={C.ink} roughness={0.5} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

export default Character
