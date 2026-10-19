'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, useTexture } from '@react-three/drei'
import { CanvasTexture, MathUtils, Shape, SRGBColorSpace, type Group, type Texture } from 'three'
import { journey } from '../store'
import { C } from './palette'

type Vec3 = [number, number, number]

interface BlockProps {
  size: Vec3
  position?: Vec3
  rotation?: Vec3
  color: string
  radius?: number
  roughness?: number
}

// Soft-edged block: the base material of the whole town
export const Block = ({ size, position, rotation, color, radius = 0.08, roughness = 0.85 }: BlockProps) => (
  <RoundedBox
    args={size}
    radius={Math.min(radius, Math.min(...size) / 2 - 0.001)}
    smoothness={2}
    position={position}
    rotation={rotation}
    castShadow
    receiveShadow
  >
    <meshStandardMaterial color={color} roughness={roughness} />
  </RoundedBox>
)

interface GableRoofProps {
  width: number
  depth: number
  rise: number
  position?: Vec3
  color?: string
}

// Triangular prism spanning `width` along x, ridge running along x
export const GableRoof = ({ width, depth, rise, position, color = C.cobalt }: GableRoofProps) => {
  const shape = useMemo(() => {
    const s = new Shape()
    s.moveTo(-depth / 2, 0)
    s.lineTo(depth / 2, 0)
    s.lineTo(0, rise)
    s.closePath()
    return s
  }, [depth, rise])

  const [px, py, pz] = position ?? [0, 0, 0]
  const slope = Math.atan2(rise, depth / 2)
  const slopeLength = Math.hypot(rise, depth / 2)
  const ribCount = Math.max(2, Math.floor(width / 0.9))

  return (
    <group>
      <mesh position={position} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <extrudeGeometry
          args={[shape, { depth: width, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 2 }]}
        />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Corrugation ribs on both slopes, plus the ridge cap */}
      {[1, -1].map((side) =>
        Array.from({ length: ribCount }).map((_, i) => (
          <mesh
            key={`${side}:${i}`}
            position={[
              px + (width / ribCount) * (i + 0.5),
              py + rise / 2 + Math.cos(slope) * 0.07,
              pz + side * (depth / 4 + Math.sin(slope) * 0.07),
            ]}
            rotation={[side * slope, 0, 0]}
          >
            <boxGeometry args={[0.07, 0.05, slopeLength]} />
            <meshStandardMaterial color={C.cobaltDeep} roughness={0.6} />
          </mesh>
        )),
      )}
      <mesh position={[px + width / 2, py + rise + 0.06, pz]}>
        <boxGeometry args={[width + 0.1, 0.12, 0.22]} />
        <meshStandardMaterial color={C.cobaltDeep} roughness={0.6} />
      </mesh>
    </group>
  )
}

export const Forklift = ({ position, rotation }: { position: Vec3; rotation?: Vec3 }) => (
  <group position={position} rotation={rotation}>
    <Block size={[1.4, 0.8, 1]} position={[0, 0.6, 0]} color={C.cobalt} radius={0.12} />
    <Block size={[0.1, 1.4, 0.1]} position={[-0.3, 1.5, 0.4]} color={C.ink} />
    <Block size={[0.1, 1.4, 0.1]} position={[-0.3, 1.5, -0.4]} color={C.ink} />
    <Block size={[0.9, 0.08, 0.9]} position={[-0.3, 2.2, 0]} color={C.ink} radius={0.02} />
    <Block size={[0.12, 1.6, 0.9]} position={[0.95, 0.8, 0]} color={C.ink} radius={0.04} />
    <Block size={[1, 0.08, 0.2]} position={[1.4, 0.15, 0.3]} color={C.ink} radius={0.02} />
    <Block size={[1, 0.08, 0.2]} position={[1.4, 0.15, -0.3]} color={C.ink} radius={0.02} />
    {[-0.4, 0.5].map((x) =>
      [-0.52, 0.52].map((z) => (
        <mesh key={`${x}${z}`} position={[x, 0.22, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.14, 12]} />
          <meshStandardMaterial color={C.tire} roughness={0.9} />
        </mesh>
      )),
    )}
  </group>
)

let blobTexture: CanvasTexture | null = null

// One shared radial falloff, drawn once, used as soft ground contact under props
const getBlobTexture = (): CanvasTexture => {
  if (blobTexture) return blobTexture
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(22, 32, 58, 0.55)')
    g.addColorStop(0.55, 'rgba(22, 32, 58, 0.22)')
    g.addColorStop(1, 'rgba(22, 32, 58, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
  }
  blobTexture = new CanvasTexture(canvas)
  return blobTexture
}

export const ContactBlob = ({ size, position = [0, 0.015, 0] }: { size: [number, number]; position?: Vec3 }) => {
  const map = useMemo(getBlobTexture, [])
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} renderOrder={1}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={map} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

export const Tree = ({ position, scale = 1 }: { position: Vec3; scale?: number }) => (
  <group position={position} scale={scale}>
    <ContactBlob size={[1.9, 1.9]} position={[0, 0.07, 0]} />
    <mesh position={[0, 0.45, 0]} castShadow>
      <cylinderGeometry args={[0.12, 0.16, 0.9, 8]} />
      <meshStandardMaterial color={C.trunk} roughness={0.9} />
    </mesh>
    <mesh position={[0, 1.55, 0]} castShadow>
      <sphereGeometry args={[0.75, 14, 12]} />
      <meshStandardMaterial color={C.leaf} roughness={0.85} />
    </mesh>
    <mesh position={[0.25, 1.15, 0.2]} castShadow>
      <sphereGeometry args={[0.45, 12, 10]} />
      <meshStandardMaterial color={C.leafDeep} roughness={0.85} />
    </mesh>
  </group>
)

export const Lawn = ({ position, size }: { position: Vec3; size: [number, number] }) => (
  <RoundedBox args={[size[0], 0.06, size[1]]} radius={0.03} smoothness={2} position={position} receiveShadow>
    <meshStandardMaterial color={C.lawn} roughness={1} />
  </RoundedBox>
)

export const Pallet = ({ position, rows = 2 }: { position: Vec3; rows?: number }) => (
  <group position={position}>
    <ContactBlob size={[1.9, 1.7]} position={[0, 0.01, 0]} />
    <Block size={[1.3, 0.14, 1.1]} position={[0, 0.07, 0]} color={C.crateDeep} radius={0.02} />
    {Array.from({ length: rows }).map((_, r) => (
      <group key={r}>
        <Block size={[0.6, 0.48, 0.52]} position={[-0.3, 0.4 + r * 0.5, -0.26]} color={C.crate} radius={0.04} />
        <Block size={[0.6, 0.48, 0.52]} position={[0.3, 0.4 + r * 0.5, -0.26]} color={C.crate} radius={0.04} />
        <Block size={[0.6, 0.48, 0.52]} position={[-0.3, 0.4 + r * 0.5, 0.27]} color={C.crate} radius={0.04} />
        <Block size={[0.6, 0.48, 0.52]} position={[0.3, 0.4 + r * 0.5, 0.27]} color={C.crate} radius={0.04} />
      </group>
    ))}
  </group>
)

interface VehicleProps {
  position: Vec3
  rotation?: Vec3
  body?: string
}

export const Car = ({ position, rotation, body = C.cobalt }: VehicleProps) => (
  <group position={position} rotation={rotation}>
    <Block size={[2.2, 0.5, 1.1]} position={[0, 0.45, 0]} color={body} radius={0.18} roughness={0.4} />
    <Block size={[1.2, 0.42, 0.96]} position={[-0.1, 0.86, 0]} color={C.glass} radius={0.14} roughness={0.2} />
    {[-0.7, 0.7].map((x) =>
      [-0.52, 0.52].map((z) => (
        <mesh key={`${x}${z}`} position={[x, 0.22, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.16, 14]} />
          <meshStandardMaterial color={C.tire} roughness={0.9} />
        </mesh>
      )),
    )}
  </group>
)

interface TruckProps extends VehicleProps {
  // 'box' is a white logistics trailer with a cobalt stripe; 'container' a ribbed shipping box
  cargo?: 'box' | 'container'
  cargoColor?: string
}

export const Truck = ({ position, rotation, body = C.cobalt, cargo = 'box', cargoColor }: TruckProps) => (
  <group position={position} rotation={rotation}>
    <Block size={[1.4, 1.4, 1.5]} position={[1.7, 0.95, 0]} color={body} radius={0.16} roughness={0.45} />
    <Block size={[0.1, 0.55, 1.2]} position={[2.42, 1.25, 0]} color={C.glass} radius={0.04} roughness={0.2} />
    <Block size={[3.2, 1.8, 1.6]} position={[-0.7, 1.15, 0]} color={cargoColor ?? (cargo === 'box' ? C.wall : C.teal)} radius={0.08} />
    {cargo === 'box' ? (
      [0.81, -0.81].map((z) => (
        <Block key={z} size={[2.6, 0.22, 0.04]} position={[-0.7, 1.35, z]} color={body} radius={0.01} />
      ))
    ) : (
      Array.from({ length: 9 }).map((_, i) => (
        <Block key={i} size={[0.06, 1.6, 1.66]} position={[-2.15 + i * 0.36, 1.15, 0]} color={C.tealDeep} radius={0.01} roughness={0.7} />
      ))
    )}
    <Block size={[3.24, 0.2, 1.64]} position={[-0.7, 0.3, 0]} color={C.cobaltDeep} radius={0.05} />
    {[1.7, -0.2, -1.6].map((x) =>
      [-0.72, 0.72].map((z) => (
        <mesh key={`${x}${z}`} position={[x, 0.3, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 14]} />
          <meshStandardMaterial color={C.tire} roughness={0.9} />
        </mesh>
      )),
    )}
  </group>
)

// Rounded window band laid on a facade facing +z
export const WindowRow = ({ position, width, count, height = 0.7 }: { position: Vec3; width: number; count: number; height?: number }) => {
  const gap = width / count
  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => (
        <Block
          key={i}
          size={[gap * 0.62, height, 0.08]}
          position={[-width / 2 + gap * (i + 0.5), 0, 0]}
          color={C.glass}
          radius={0.03}
          roughness={0.25}
        />
      ))}
    </group>
  )
}

export const useSrgbTextures = (urls: string[]): Texture[] =>
  useTexture(urls, (loaded) => {
    const list = Array.isArray(loaded) ? loaded : [loaded]
    list.forEach((t) => {
      t.colorSpace = SRGBColorSpace
      t.anisotropy = 4
    })
  }) as Texture[]

interface ScreenProps {
  url: string
  size: [number, number]
  position?: Vec3
  rotation?: Vec3
  frame?: string
}

// Framed screenshot panel: phones, billboards, monitors
export const Screen = ({ url, size, position, rotation, frame = C.ink }: ScreenProps) => {
  const [map] = useSrgbTextures([url])
  return (
    <group position={position} rotation={rotation}>
      <Block size={[size[0] + 0.3, size[1] + 0.3, 0.22]} color={frame} radius={0.12} roughness={0.5} />
      <mesh position={[0, 0, 0.115]}>
        <planeGeometry args={size} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
    </group>
  )
}

// Map pin over a landmark; turns amber and bobs when its stage is active
export const Pin = ({ position, isActive }: { position: Vec3; isActive: boolean }) => {
  const g = useRef<Group>(null)
  useFrame((state, delta) => {
    if (!g.current) return
    const s = MathUtils.damp(g.current.scale.x, isActive ? 1.25 : 0.9, 6, delta)
    g.current.scale.setScalar(s)
    g.current.position.y = position[1] + (isActive && !journey.reducedMotion ? Math.sin(state.clock.elapsedTime * 2.4) * 0.18 : 0)
  })
  const color = isActive ? C.amber : C.cobalt
  return (
    <group ref={g} position={position}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.42, 20, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <coneGeometry args={[0.32, 0.75, 20]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.55, 0.36]}>
        <sphereGeometry args={[0.14, 12, 10]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
    </group>
  )
}

interface OfficeBuildingProps {
  position?: Vec3
  width: number
  depth: number
  floors: 1 | 2
  roof?: 'flat' | 'gable'
  accent?: string
}

const FLOOR_HEIGHT = 2.3

// Generic low-rise office: the base building of every employer stop
export const OfficeBuilding = ({ position, width, depth, floors, roof = 'flat', accent = C.cobalt }: OfficeBuildingProps) => {
  const height = floors * FLOOR_HEIGHT
  const sideCount = Math.max(2, Math.round((depth - 1) / 1.4))
  return (
    <group position={position}>
      <Block size={[width, height, depth]} position={[0, height / 2, 0]} color={C.wall} />
      {Array.from({ length: floors }).map((_, f) => {
        const y = f * FLOOR_HEIGHT + 1.35
        return (
          <group key={f}>
            {f === 0 ? (
              <WindowRow position={[-width / 4 + 0.1, y, depth / 2 + 0.02]} width={width / 2 - 0.4} count={Math.max(1, Math.round(width / 3))} height={0.95} />
            ) : (
              <WindowRow position={[0, y, depth / 2 + 0.02]} width={width - 1} count={Math.max(2, Math.round(width / 1.5))} height={0.95} />
            )}
            <group position={[width / 2 + 0.02, y, 0]} rotation={[0, Math.PI / 2, 0]}>
              <WindowRow position={[0, 0, 0]} width={depth - 1} count={sideCount} height={0.95} />
            </group>
            {f > 0 && (
              <Block size={[width + 0.08, 0.14, depth + 0.08]} position={[0, f * FLOOR_HEIGHT, 0]} color={accent} radius={0.03} />
            )}
          </group>
        )
      })}
      {/* Entrance with a sign band over it */}
      <Block size={[1.3, 1.7, 0.1]} position={[width / 4, 0.85, depth / 2 + 0.03]} color={C.door} radius={0.04} />
      <Block size={[2, 0.32, 0.12]} position={[width / 4, 1.95, depth / 2 + 0.05]} color={accent} radius={0.04} />
      {roof === 'flat' ? (
        <>
          <Block size={[width + 0.2, 0.3, depth + 0.2]} position={[0, height + 0.15, 0]} color={accent} radius={0.06} />
          <Block size={[1.1, 0.55, 0.9]} position={[-width / 4, height + 0.55, -depth / 5]} color={C.wallShade} />
        </>
      ) : (
        <GableRoof width={width + 0.3} depth={depth + 0.4} rise={1.2} position={[-(width + 0.3) / 2, height, 0]} color={accent} />
      )}
    </group>
  )
}
