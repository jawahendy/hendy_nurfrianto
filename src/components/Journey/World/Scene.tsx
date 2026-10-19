'use client'

import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import {
  MathUtils,
  Object3D,
  Vector3,
  type DirectionalLight,
  type Group,
  type InstancedMesh,
  type OrthographicCamera,
} from 'three'
import { STAGES, STAGE_SPACING } from '@/constants/data/journey'
import { journey, walker } from '../store'
import Character from './Character'
import { Car, Lawn, Pin, Tree, Truck } from './Kit'
import { LandmarkModel, PIN_HEIGHT } from './Landmarks'
import { C } from './palette'

const ROAD_START = -24
const ROAD_END = (STAGES.length - 1) * STAGE_SPACING + 24
const ROAD_LENGTH = ROAD_END - ROAD_START
const ROAD_MID = (ROAD_START + ROAD_END) / 2

const CAMERA_OFFSET = new Vector3(20, 19, 20)
const VIEW_DIR = CAMERA_OFFSET.clone().negate().normalize()
const SCREEN_RIGHT = new Vector3().crossVectors(VIEW_DIR, new Vector3(0, 1, 0)).normalize()
const SCREEN_UP = new Vector3().crossVectors(SCREEN_RIGHT, VIEW_DIR).normalize()

const focus = new Vector3()
const center = new Vector3()

// Keeps the current stop at a fixed screen anchor: left of centre beside the
// desktop card, upper half above the mobile sheet.
const CameraRig = ({ isBackdrop }: { isBackdrop: boolean }) => {
  const camera = useThree((s) => s.camera) as OrthographicCamera
  const size = useThree((s) => s.size)
  const light = useRef<DirectionalLight>(null)
  const followX = useRef(0)

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    const isCompact = size.width < 1024
    const targetZoom = isCompact
      ? Math.min(size.width / 16, size.height / 26)
      : Math.min(size.width / 30, size.height / 18)
    camera.zoom = journey.reducedMotion ? targetZoom : MathUtils.damp(camera.zoom, targetZoom, 4, delta)

    // Backdrop mode has no walker: drift slowly up and down the road around
    // the page's stop so the town keeps moving behind the panels
    const stopX = Math.round(journey.stage) * STAGE_SPACING
    const target = isBackdrop
      ? stopX + (journey.reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.04) * 26)
      : walker.x
    followX.current = journey.reducedMotion ? target : MathUtils.damp(followX.current, target, 5, delta)

    const halfW = size.width / 2 / camera.zoom
    const halfH = size.height / 2 / camera.zoom
    const anchorX = isBackdrop || isCompact ? 0 : -0.22
    const anchorY = isBackdrop ? 0 : isCompact ? 0.42 : -0.04

    // Frame the stop, not just the walker: aim between the road and the landmark.
    // Phones frame the walker itself so the feet stay above the stage sheet
    focus.set(followX.current, 1, isBackdrop ? -3 : isCompact ? walker.z : -4.8)
    center
      .copy(focus)
      .addScaledVector(SCREEN_RIGHT, -anchorX * halfW)
      .addScaledVector(SCREEN_UP, -anchorY * halfH)

    camera.position.copy(center).add(CAMERA_OFFSET)
    camera.lookAt(center)
    camera.updateProjectionMatrix()

    if (light.current) {
      light.current.position.set(center.x + 10, 22, center.z + 8)
      light.current.target.position.set(center.x, 0, center.z)
      light.current.target.updateMatrixWorld()
    }
  })

  return (
    <directionalLight
      ref={light}
      intensity={1.75}
      color="#ffffff"
      castShadow
      shadow-mapSize={[2048, 2048]}
      shadow-bias={-0.0004}
      shadow-normalBias={0.03}
      shadow-camera-left={-34}
      shadow-camera-right={34}
      shadow-camera-top={34}
      shadow-camera-bottom={-34}
      shadow-camera-near={1}
      shadow-camera-far={80}
    />
  )
}

const RoadDashes = () => {
  const mesh = useRef<InstancedMesh>(null)
  const count = Math.floor(ROAD_LENGTH / 2.4)

  useLayoutEffect(() => {
    if (!mesh.current) return
    const dummy = new Object3D()
    for (let i = 0; i < count; i += 1) {
      dummy.position.set(ROAD_START + 1.2 + i * 2.4, 0.045, -0.7)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  }, [count])

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} receiveShadow>
      <boxGeometry args={[1.2, 0.02, 0.16]} />
      <meshStandardMaterial color={C.roadLine} roughness={0.9} />
    </instancedMesh>
  )
}

const Ground = () => (
  <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[ROAD_MID, 0, 0]} receiveShadow>
      <planeGeometry args={[ROAD_LENGTH + 200, 220]} />
      <meshStandardMaterial color={C.ground} roughness={1} />
    </mesh>
    <mesh position={[ROAD_MID, 0.02, -0.7]} receiveShadow>
      <boxGeometry args={[ROAD_LENGTH, 0.04, 4.2]} />
      <meshStandardMaterial color={C.road} roughness={0.95} />
    </mesh>
    {[-2.95, 1.55].map((z) => (
      <mesh key={z} position={[ROAD_MID, 0.06, z]} receiveShadow>
        <boxGeometry args={[ROAD_LENGTH, 0.12, 0.3]} />
        <meshStandardMaterial color={C.curb} roughness={0.9} />
      </mesh>
    ))}
    <RoadDashes />
    {/* Sidewalk between the road and the yards: the walker's path */}
    <mesh position={[ROAD_MID, 0.1, -3.45]} receiveShadow>
      <boxGeometry args={[ROAD_LENGTH, 0.06, 1.1]} />
      <meshStandardMaterial color={C.yard} roughness={0.95} />
    </mesh>
  </group>
)

type VehicleKind = 'box' | 'container' | 'car'

interface Lane {
  z: number
  direction: 1 | -1
  speed: number
  fleet: { kind: VehicleKind; body: string }[]
}

// Two-way traffic. Each lane moves at one speed with even spacing, so
// vehicles never catch up with each other.
const LANES: Lane[] = [
  {
    z: 0.35,
    direction: 1,
    speed: 4.2,
    fleet: [
      { kind: 'box', body: C.cobalt },
      { kind: 'car', body: C.wall },
      { kind: 'container', body: C.cobaltDeep },
      { kind: 'car', body: C.cobalt },
      { kind: 'box', body: C.cobaltDeep },
      { kind: 'car', body: C.teal },
      { kind: 'container', body: C.cobalt },
      { kind: 'car', body: C.wall },
    ],
  },
  {
    z: -1.75,
    direction: -1,
    speed: 3.4,
    fleet: [
      { kind: 'car', body: C.cobalt },
      { kind: 'box', body: C.cobalt },
      { kind: 'car', body: C.wall },
      { kind: 'container', body: C.cobaltDeep },
      { kind: 'car', body: C.teal },
      { kind: 'box', body: C.cobaltDeep },
      { kind: 'car', body: C.cobalt },
    ],
  },
]

const Vehicle = ({ kind, body }: { kind: VehicleKind; body: string }) =>
  kind === 'car' ? (
    <Car position={[0, 0, 0]} body={body} />
  ) : (
    <Truck position={[0, 0, 0]} body={body} cargo={kind} />
  )

const LaneTraffic = ({ lane }: { lane: Lane }) => {
  const refs = useRef<(Group | null)[]>([])
  const gap = ROAD_LENGTH / lane.fleet.length

  useFrame((state) => {
    // Reduced motion parks the traffic at its starting slots
    const t = journey.reducedMotion ? 0 : state.clock.elapsedTime
    refs.current.forEach((g, i) => {
      if (!g) return
      const travelled = (i * gap + t * lane.speed) % ROAD_LENGTH
      g.position.x = lane.direction === 1 ? ROAD_START + travelled : ROAD_END - travelled
    })
  })

  return (
    <group>
      {lane.fleet.map((v, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          position={[0, 0.04, lane.z]}
          rotation={[0, lane.direction === 1 ? 0 : Math.PI, 0]}
        >
          <Vehicle kind={v.kind} body={v.body} />
        </group>
      ))}
    </group>
  )
}

const Traffic = () => (
  <group>
    {LANES.map((lane) => (
      <LaneTraffic key={lane.z} lane={lane} />
    ))}
  </group>
)

// Deterministic scatter so server and client agree and the town never reshuffles
const seeded = (seed: number) => {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const Scatter = () => {
  const items = useMemo(() => {
    const rand = seeded(42)
    const list: { x: number; z: number; s: number; lawn: boolean }[] = []
    for (let x = ROAD_START; x < ROAD_END; x += 3.4) {
      // Front verge: low trees only, so the walker stays visible
      if (rand() > 0.45) list.push({ x: x + rand() * 2, z: 4 + rand() * 3, s: 0.7 + rand() * 0.35, lawn: rand() > 0.6 })
      // Far edge behind the landmarks
      if (rand() > 0.35) list.push({ x: x + rand() * 2, z: -15 - rand() * 4, s: 0.9 + rand() * 0.5, lawn: false })
    }
    return list
  }, [])

  return (
    <group>
      {items.map(({ x, z, s, lawn }) => (
        <group key={`${x.toFixed(2)}:${z.toFixed(2)}`}>
          {lawn && <Lawn position={[x, 0.03, z]} size={[2.4, 2]} />}
          <Tree position={[x, 0, z]} scale={s} />
        </group>
      ))}
    </group>
  )
}

// Each employer gets its own paved lot, like a site on a logistics map
const Yard = ({ index }: { index: number }) => (
  <group>
    <RoundedBox args={[14.2, 0.1, 11.2]} radius={0.04} smoothness={2} position={[0, 0.05, -8.9]} receiveShadow>
      <meshStandardMaterial color={C.yard} roughness={0.95} />
    </RoundedBox>
    <mesh position={[0, 0.11, -3.6]} receiveShadow>
      <boxGeometry args={[12.6, 0.02, 0.08]} />
      <meshStandardMaterial color={C.cobaltSoft} roughness={0.9} />
    </mesh>
    <BayMarkings position={[index % 2 === 0 ? -4.6 : 4.4, 0.11, -12.4]} />
  </group>
)

// Dashed parking-bay outline, the yard paint of a logistics site
const BayMarkings = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {Array.from({ length: 5 }).map((_, i) => (
      <mesh key={`h${i}`} position={[-1.6 + i * 0.8, 0, -1.1]}>
        <boxGeometry args={[0.45, 0.02, 0.1]} />
        <meshStandardMaterial color={C.paint} roughness={0.9} />
      </mesh>
    ))}
    {Array.from({ length: 5 }).map((_, i) => (
      <mesh key={`f${i}`} position={[-1.6 + i * 0.8, 0, 1.1]}>
        <boxGeometry args={[0.45, 0.02, 0.1]} />
        <meshStandardMaterial color={C.paint} roughness={0.9} />
      </mesh>
    ))}
    {[-2, 0, 2].map((x) => (
      <mesh key={`v${x}`} position={[x, 0, 0]}>
        <boxGeometry args={[0.1, 0.02, 2.3]} />
        <meshStandardMaterial color={C.paint} roughness={0.9} />
      </mesh>
    ))}
  </group>
)

const StagePins = ({ activeIndex }: { activeIndex: number }) => (
  <group>
    {STAGES.map((stage, i) => {
      const isActive = i === activeIndex
      const x = i * STAGE_SPACING
      return (
        <group key={stage.id} position={[x, 0, -7]}>
          <Pin position={[0, PIN_HEIGHT[stage.landmark], 0]} isActive={isActive} />
          <Html
            position={[0, PIN_HEIGHT[stage.landmark] + 1.6, 0]}
            center
            zIndexRange={[20, 0]}
            style={{ pointerEvents: 'none' }}
          >
            <span className="j-tag" data-active={isActive}>
              <span className="j-tag-id">{String(i).padStart(2, '0')}</span>
              {stage.label}
            </span>
          </Html>
        </group>
      )
    })}
  </group>
)

interface SceneProps {
  activeIndex: number
  isLowPower: boolean
  // 'backdrop' renders only the environment (no walker, no pins) behind detail routes
  mode?: 'journey' | 'backdrop'
}

const Scene = ({ activeIndex, isLowPower, mode = 'journey' }: SceneProps) => (
  <Canvas
    orthographic
    flat
    shadows={!isLowPower}
    dpr={isLowPower || mode === 'backdrop' ? [1, 1.25] : [1, 1.75]}
    camera={{ position: [20, 19, 20], zoom: 40, near: 0.1, far: 200 }}
    gl={{ antialias: true, powerPreference: 'high-performance' }}
    aria-hidden
  >
    <color attach="background" args={[C.backdrop]} />
    <hemisphereLight args={['#f4f8ff', '#d3dcee', 1.5]} />
    <CameraRig isBackdrop={mode === 'backdrop'} />
    <Ground />
    <Traffic />
    <Scatter />
    <Suspense fallback={null}>
      {STAGES.map((stage, i) => (
        <group key={stage.id} position={[i * STAGE_SPACING, 0, 0]}>
          <Yard index={i} />
          <LandmarkModel type={stage.landmark} />
        </group>
      ))}
    </Suspense>
    {mode === 'journey' && (
      <>
        <StagePins activeIndex={activeIndex} />
        <Character />
      </>
    )}
  </Canvas>
)

export default Scene
