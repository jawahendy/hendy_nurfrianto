'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { Landmark } from '@/constants/data/journey'
import { SKILL_CRATES } from '@/constants/data/journey'
import { Block, Car, ContactBlob, Forklift, GableRoof, Lawn, OfficeBuilding, Pallet, Screen, Tree, Truck, WindowRow, useSrgbTextures } from './Kit'
import { journey } from '../store'
import { C } from './palette'

// Every landmark is authored in local space: road along x at z = 0,
// buildings behind it on -z, low props on +z so they never hide the walker.

const Start = () => (
  <group>
    {/* Signpost pointing down the road */}
    <Block size={[0.16, 2.6, 0.16]} position={[2.8, 1.3, -4.6]} color={C.wallShade} />
    <Block size={[1.8, 0.5, 0.12]} position={[3.5, 2.3, -4.6]} color={C.amber} radius={0.06} />
    <Block size={[1.4, 0.4, 0.12]} position={[3.3, 1.7, -4.6]} color={C.cobalt} radius={0.06} />
    {/* Bench */}
    <Block size={[1.6, 0.12, 0.5]} position={[-3.4, 0.5, -5.6]} color={C.crate} radius={0.04} />
    <Block size={[0.12, 0.45, 0.4]} position={[-4.05, 0.25, -5.6]} color={C.wallShade} />
    <Block size={[0.12, 0.45, 0.4]} position={[-2.75, 0.25, -5.6]} color={C.wallShade} />
    <Lawn position={[-4.5, 0.03, -7]} size={[4, 5]} />
    <Tree position={[-4.8, 0, -6.2]} scale={1.2} />
    <Tree position={[-3.6, 0, -8]} />
    <Tree position={[3.6, 0, -7.4]} scale={0.9} />
  </group>
)

const Campus = () => (
  <group position={[0, 0, -7.5]}>
    <Block size={[10, 0.4, 6.4]} position={[0, 0.2, 0.2]} color={C.wallShade} radius={0.05} />
    <Block size={[9, 3.2, 5]} position={[0, 2, -0.4]} color={C.wall} />
    <WindowRow position={[0, 2.4, 2.12]} width={8} count={6} height={1.1} />
    {/* Colonnade */}
    {Array.from({ length: 6 }).map((_, i) => (
      <mesh key={i} position={[-3.75 + i * 1.5, 2, 2.75]} castShadow>
        <cylinderGeometry args={[0.2, 0.22, 3.2, 14]} />
        <meshStandardMaterial color={C.wall} roughness={0.8} />
      </mesh>
    ))}
    <Block size={[9.6, 0.35, 6.2]} position={[0, 3.75, 0.2]} color={C.wallShade} radius={0.05} />
    <GableRoof width={9.6} depth={6.2} rise={1.6} position={[-4.8, 3.92, 0.2]} />
    {/* Flag */}
    <Block size={[0.1, 4.5, 0.1]} position={[5.6, 2.25, 2.6]} color={C.wallShade} />
    <Block size={[0.9, 0.55, 0.05]} position={[6.06, 4.15, 2.6]} color={C.cobalt} radius={0.02} />
    <Tree position={[-6, 0, 2.5]} />
    <Tree position={[6.8, 0, -1]} scale={1.1} />
  </group>
)

const Office = () => (
  <group position={[0, 0, -7]}>
    <Block size={[5.2, 4.2, 4.4]} position={[0, 2.1, 0]} color={C.wall} />
    <WindowRow position={[0, 1.3, 2.22]} width={4.4} count={4} />
    <WindowRow position={[0, 3, 2.22]} width={4.4} count={4} />
    <Block size={[1.1, 1.5, 0.1]} position={[1.6, 0.75, 2.22]} color={C.door} radius={0.04} />
    <Block size={[1.2, 0.6, 1]} position={[-1.2, 4.5, 0]} color={C.wallShade} />
    <Block size={[0.8, 0.5, 0.8]} position={[1, 4.45, -0.6]} color={C.wallShade} />
    <Lawn position={[4.6, 0.03, 0.6]} size={[3, 3.6]} />
    <Tree position={[4.6, 0, 0.6]} />
  </group>
)

const Headquarters = () => (
  <group position={[0, 0, -7.5]}>
    <Block size={[6, 9.5, 5]} position={[0, 4.75, 0]} color={C.wall} />
    {Array.from({ length: 5 }).map((_, i) => (
      <Block key={i} size={[5.2, 1.1, 0.1]} position={[0, 1.6 + i * 1.7, 2.52]} color={C.cobaltSoft} radius={0.04} roughness={0.3} />
    ))}
    {Array.from({ length: 5 }).map((_, i) => (
      <Block key={i} size={[0.1, 1.1, 4.2]} position={[3.02, 1.6 + i * 1.7, 0]} color={C.glass} radius={0.04} roughness={0.3} />
    ))}
    <Block size={[6.4, 0.4, 5.4]} position={[0, 9.7, 0]} color={C.cobalt} radius={0.08} />
    {/* Placement shuttle: Celerates sends its engineers down the road */}
    <Truck position={[-6.2, 0, 2.6]} body={C.cobalt} />
    <Lawn position={[5.4, 0.03, 0.5]} size={[3.2, 5]} />
    <Tree position={[5.4, 0, -0.8]} scale={1.1} />
    <Tree position={[5.2, 0, 1.6]} scale={0.85} />
  </group>
)

const CurtainShop = () => (
  <group position={[0, 0, -7]}>
    <Block size={[7, 3.6, 4.4]} position={[0, 1.8, 0]} color={C.wall} />
    {[-2.2, 0, 2.2].map((x) => (
      <group key={x} position={[x, 1.9, 2.24]}>
        <Block size={[1.6, 1.8, 0.06]} color={C.glass} radius={0.03} roughness={0.25} />
        {/* Gathered curtain folds */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[-0.62 + i * 0.13, 0, 0.08]} castShadow>
            <cylinderGeometry args={[0.07, 0.09, 1.8, 8]} />
            <meshStandardMaterial color={C.cobaltSoft} roughness={0.9} />
          </mesh>
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={`r${i}`} position={[0.62 - i * 0.13, 0, 0.08]} castShadow>
            <cylinderGeometry args={[0.07, 0.09, 1.8, 8]} />
            <meshStandardMaterial color={C.cobaltSoft} roughness={0.9} />
          </mesh>
        ))}
      </group>
    ))}
    {/* Striped awning */}
    {Array.from({ length: 8 }).map((_, i) => (
      <Block
        key={i}
        size={[0.86, 0.1, 1.3]}
        position={[-3.06 + i * 0.875, 3.1, 2.75]}
        rotation={[0.35, 0, 0]}
        color={i % 2 === 0 ? C.cobalt : C.wall}
        radius={0.03}
      />
    ))}
    <GableRoof width={7.2} depth={4.6} rise={1.2} position={[-3.6, 3.6, 0]} color={C.cobaltDeep} />
  </group>
)

const Mine = () => {
  const ring = useRef<Group>(null)
  useFrame((state) => {
    if (ring.current && !journey.reducedMotion) ring.current.rotation.y = state.clock.elapsedTime * 0.8
  })
  return (
    <group position={[0, 0, -7.5]}>
      {/* Site office, one floor */}
      <OfficeBuilding position={[0.6, 0, -1.2]} width={7} depth={4.2} floors={1} />
      {/* AR geo-marker spinning over the office */}
      <group ref={ring} position={[0.6, 4.2, -1.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.07, 10, 40]} />
          <meshStandardMaterial color={C.cobalt} roughness={0.3} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial color={C.cobaltSoft} roughness={0.3} />
        </mesh>
      </group>
      {/* Spoil heaps behind the office */}
      <mesh position={[-4.8, 0, -3.4]} scale={[1, 0.7, 0.8]} castShadow receiveShadow>
        <coneGeometry args={[2.6, 3.2, 9]} />
        <meshStandardMaterial color={C.sand} roughness={1} flatShading />
      </mesh>
      <mesh position={[5.4, 0, -3.6]} scale={[1, 0.6, 0.9]} castShadow receiveShadow>
        <coneGeometry args={[2, 2.6, 8]} />
        <meshStandardMaterial color={C.sandDeep} roughness={1} flatShading />
      </mesh>
      {/* Dump truck */}
      <group position={[4.4, 0, 2.2]} rotation={[0, -0.4, 0]} scale={0.8}>
        <Block size={[1.3, 1.2, 1.6]} position={[1.6, 1.2, 0]} color={C.cobalt} radius={0.12} />
        <Block size={[2.6, 1.1, 1.9]} position={[-0.4, 1.5, 0]} rotation={[0, 0, 0.12]} color={C.wallShade} radius={0.1} />
        <Block size={[2.4, 0.5, 1.6]} position={[-0.3, 2, 0]} rotation={[0, 0, 0.12]} color={C.sandDeep} radius={0.2} />
        {[1.6, -0.9].map((x) =>
          [-0.85, 0.85].map((z) => (
            <mesh key={`${x}${z}`} position={[x, 0.5, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.5, 0.5, 0.36, 16]} />
              <meshStandardMaterial color={C.tire} roughness={0.9} />
            </mesh>
          )),
        )}
      </group>
      {/* VR headset monument */}
      <group position={[-4.4, 0, 2.2]} scale={0.8}>
        <Block size={[1.6, 0.8, 1.6]} position={[0, 0.4, 0]} color={C.wall} radius={0.1} />
        <Block size={[2, 1, 1]} position={[0, 1.6, 0]} color={C.ink} radius={0.3} roughness={0.4} />
        <mesh position={[-0.45, 1.6, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.08, 20]} />
          <meshStandardMaterial color={C.cobaltSoft} roughness={0.2} />
        </mesh>
        <mesh position={[0.45, 1.6, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.08, 20]} />
          <meshStandardMaterial color={C.cobaltSoft} roughness={0.2} />
        </mesh>
        <Block size={[2.2, 0.18, 0.16]} position={[0, 1.75, -0.4]} color={C.ink} radius={0.06} />
      </group>
    </group>
  )
}

const PhoneMonument = () => (
  <group position={[0, 0, -7]}>
    {/* Two-floor office with the THRU app standing beside it */}
    <OfficeBuilding position={[1.8, 0, -1]} width={7} depth={4.4} floors={2} />
    <Block size={[2.8, 0.5, 1.8]} position={[-4.4, 0.25, 0.4]} color={C.wallShade} radius={0.08} />
    <Screen url="/image/journey/rn.webp" size={[1.8, 3.6]} position={[-4.4, 2.5, 0.4]} rotation={[-0.06, 0.2, 0]} />
    <Tree position={[-6.4, 0, -2.2]} />
  </group>
)

const Showroom = () => (
  <group position={[0, 0, -7.5]}>
    <Block size={[10, 0.3, 6]} position={[0, 0.15, 0]} color={C.wallShade} radius={0.05} />
    {[-4.8, 4.8].map((x) =>
      [-2.8, 2.8].map((z) => (
        <Block key={`${x}${z}`} size={[0.3, 3.4, 0.3]} position={[x, 2, z]} color={C.wall} radius={0.05} />
      )),
    )}
    {/* Glass showroom floor */}
    <mesh position={[0, 2, 0]}>
      <boxGeometry args={[9.4, 3.2, 5.4]} />
      <meshStandardMaterial color={C.glass} transparent opacity={0.28} roughness={0.1} depthWrite={false} />
    </mesh>
    <Car position={[-2, 0.3, 0.6]} rotation={[0, 0.5, 0]} body={C.cobalt} />
    <Car position={[2.2, 0.3, -0.6]} rotation={[0, -0.4, 0]} body={C.wall} />
    {/* Office floor above the showroom */}
    <Block size={[10.2, 0.3, 6.2]} position={[0, 3.75, 0]} color={C.cobalt} radius={0.06} />
    <Block size={[10, 2.1, 6]} position={[0, 4.95, 0]} color={C.wall} />
    <WindowRow position={[0, 5, 3.02]} width={9} count={6} height={0.95} />
    <group position={[5.02, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
      <WindowRow position={[0, 0, 0]} width={5} count={3} height={0.95} />
    </group>
    <Block size={[10.3, 0.3, 6.3]} position={[0, 6.15, 0]} color={C.cobalt} radius={0.06} />
    {/* App pylon: Auto2000 on the stores */}
    <Screen url="/image/journey/auto.webp" size={[1.8, 2.7]} position={[6.6, 2.4, 2.4]} rotation={[0, 0.5, 0]} frame={C.cobaltDeep} />
    <Block size={[0.3, 1, 0.3]} position={[6.6, 0.5, 2.4]} color={C.wallShade} />
  </group>
)

const Tank = ({ position, r = 1.5, h = 3 }: { position: [number, number, number]; r?: number; h?: number }) => (
  <group position={position}>
    <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[r, r, h, 28]} />
      <meshStandardMaterial color={C.wall} roughness={0.6} />
    </mesh>
    <mesh position={[0, h, 0]} scale={[1, 0.3, 1]} castShadow>
      <sphereGeometry args={[r, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={C.wall} roughness={0.6} />
    </mesh>
    <mesh position={[0, h * 0.62, 0]}>
      <cylinderGeometry args={[r + 0.03, r + 0.03, 0.35, 28]} />
      <meshStandardMaterial color={C.cobalt} roughness={0.5} />
    </mesh>
  </group>
)

const Refinery = () => (
  <group position={[0, 0, -7.5]}>
    {/* Two-floor project office; QIMS dashboard on its facade */}
    <OfficeBuilding position={[2, 0, -0.6]} width={7.2} depth={4.6} floors={2} />
    <Screen url="/image/journey/qims.webp" size={[2.1, 1.4]} position={[0.2, 3.6, 1.86]} frame={C.cobaltDeep} />
    {/* Inspected plant behind it */}
    <Tank position={[-4.2, 0, -1.8]} r={1.4} h={3} />
    <Tank position={[-4.6, 0, 1.6]} r={1} h={2.1} />
    <mesh position={[-1.6, 1.7, -3.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.13, 0.13, 5.6, 12]} />
      <meshStandardMaterial color={C.cobalt} roughness={0.5} />
    </mesh>
    <mesh position={[-1.6, 1.3, -3.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.13, 0.13, 5.6, 12]} />
      <meshStandardMaterial color={C.wallShade} roughness={0.5} />
    </mesh>
    {/* Flare stack */}
    <mesh position={[6.4, 3.5, -3.2]} castShadow>
      <cylinderGeometry args={[0.18, 0.28, 7, 12]} />
      <meshStandardMaterial color={C.wallShade} roughness={0.6} />
    </mesh>
    <mesh position={[6.4, 7.1, -3.2]}>
      <cylinderGeometry args={[0.32, 0.22, 0.3, 12]} />
      <meshStandardMaterial color={C.cobalt} roughness={0.5} />
    </mesh>
  </group>
)

const Crate = ({ url, position }: { url: string; position: [number, number, number] }) => {
  const [map] = useSrgbTextures([url])
  return (
    <group position={position}>
      {position[1] === 0 && <ContactBlob size={[1.6, 1.6]} position={[0, 0.06, 0]} />}
      <Block size={[1.05, 1.05, 1.05]} position={[0, 0.52, 0]} color={C.crate} radius={0.06} />
      <mesh position={[0, 0.52, 0.535]}>
        <planeGeometry args={[0.78, 0.78]} />
        <meshBasicMaterial map={map} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0.535, 0.52, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.78, 0.78]} />
        <meshBasicMaterial map={map} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}

const Warehouse = () => (
  <group position={[0, 0, -8.5]}>
    <Block size={[12, 4, 6.4]} position={[0, 2, -0.6]} color={C.wall} />
    <Block size={[12, 0.5, 6.4]} position={[0, 0.25, -0.6]} color={C.cobalt} radius={0.04} />
    <GableRoof width={12.4} depth={6.9} rise={1.6} position={[-6.2, 4, -0.6]} />
    {[-3.8, 0, 3.8].map((x) => (
      <group key={x} position={[x, 0, 2.62]}>
        {/* Framed roll-up door, half open on a dark bay with cargo inside */}
        <Block size={[2.8, 3.2, 0.1]} position={[0, 1.85, -0.02]} color={C.wallShade} radius={0.04} />
        <Block size={[2.4, 1.9, 0.1]} position={[0, 1.45, 0.02]} color={C.ink} radius={0.03} />
        <Block size={[2.4, 1, 0.14]} position={[0, 2.9, 0.04]} color={C.door} radius={0.03} />
        {[2.65, 2.9, 3.15].map((y) => (
          <Block key={y} size={[2.36, 0.04, 0.04]} position={[0, y, 0.13]} color={C.cobalt} radius={0.01} />
        ))}
        <Pallet position={[0, 0.5, -0.1]} rows={1} />
      </group>
    ))}
    {/* Skill crates staged on the yard */}
    {SKILL_CRATES.map((url, i) => {
      const col = i % 6
      const row = Math.floor(i / 6)
      // Stacked two high on the left of the yard, clear of the walker's spot
      return <Crate key={url} url={url} position={[-6.6 + col * 1.1, row * 1.05, 3.9]} />
    })}
    <Forklift position={[7.4, 0, 3.4]} rotation={[0, -0.9, 0]} />
  </group>
)

const Billboards = () => (
  <group position={[0, 0, -6.5]}>
    {[
      { url: '/image/journey/Luc.webp', x: -5.6, y: 0 },
      { url: '/image/journey/cele.webp', x: 0, y: -1.4 },
      { url: '/image/journey/mind.webp', x: 5.6, y: 0 },
    ].map(({ url, x, y }) => (
      <group key={url} position={[x, 0, y]}>
        <Block size={[0.3, 2.4, 0.3]} position={[-1.4, 1.2, 0]} color={C.wallShade} />
        <Block size={[0.3, 2.4, 0.3]} position={[1.4, 1.2, 0]} color={C.wallShade} />
        <Screen url={url} size={[4.2, 2.8]} position={[0, 3.9, 0]} rotation={[0, 0.25, 0]} frame={C.cobalt} />
      </group>
    ))}
    <Lawn position={[0, 0.03, 3]} size={[14, 2]} />
    <Tree position={[-7.6, 0, 1]} scale={0.9} />
    <Tree position={[7.8, 0, 0.8]} />
  </group>
)

const Gate = () => (
  <group position={[0, 0, -7]}>
    <Block size={[0.8, 5, 0.8]} position={[-4.2, 2.5, 0]} color={C.wall} />
    <Block size={[0.8, 5, 0.8]} position={[4.2, 2.5, 0]} color={C.wall} />
    <Block size={[9.4, 1.1, 0.9]} position={[0, 5.3, 0]} color={C.cobalt} radius={0.12} />
    <Block size={[6, 0.25, 0.1]} position={[0, 5.3, 0.48]} color={C.amber} radius={0.05} />
    <Truck position={[0, 0, -2.2]} rotation={[0, 0, 0]} />
    {/* Mailbox */}
    <group position={[5.8, 0, 2.1]}>
      <Block size={[0.14, 1.2, 0.14]} position={[0, 0.6, 0]} color={C.wallShade} />
      <Block size={[0.8, 0.6, 0.6]} position={[0, 1.45, 0]} color={C.cobalt} radius={0.22} />
      <Block size={[0.08, 0.4, 0.08]} position={[0.42, 1.7, 0.1]} color={C.amber} radius={0.02} />
    </group>
    <Lawn position={[-6.4, 0.03, 2]} size={[3, 4]} />
    <Tree position={[-6.4, 0, 1.6]} scale={1.1} />
  </group>
)

const LANDMARKS: Record<Landmark, () => JSX.Element> = {
  start: Start,
  campus: Campus,
  office: Office,
  hq: Headquarters,
  curtain: CurtainShop,
  mine: Mine,
  phone: PhoneMonument,
  showroom: Showroom,
  refinery: Refinery,
  warehouse: Warehouse,
  billboards: Billboards,
  gate: Gate,
}

// Height of each landmark's map pin, above its tallest part
export const PIN_HEIGHT: Record<Landmark, number> = {
  start: 3.6,
  campus: 7,
  office: 6,
  hq: 11.2,
  curtain: 6,
  mine: 5.8,
  phone: 6.6,
  showroom: 7.6,
  refinery: 8.4,
  warehouse: 7,
  billboards: 7,
  gate: 6.8,
}

export const LandmarkModel = ({ type }: { type: Landmark }) => {
  const Model = LANDMARKS[type]
  return <Model />
}
