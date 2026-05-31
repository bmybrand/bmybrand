'use client'

import React from 'react'
import Matter from 'matter-js'

type GravityProps = {
  children: React.ReactNode
  className?: string
  gravity?: { x: number; y: number }
  draggable?: boolean
}

type MatterBodyProps = {
  children: React.ReactNode
  x?: string | number
  y?: string | number
  angle?: number
  matterBodyOptions?: Matter.IBodyDefinition
}

type RegisteredBody = {
  body: Matter.Body
  element: HTMLDivElement
  width: number
  height: number
}

type GravityContextValue = {
  registerBody: (
    element: HTMLDivElement,
    options: {
      x?: string | number
      y?: string | number
      angle?: number
      matterBodyOptions?: Matter.IBodyDefinition
    }
  ) => () => void
}

const GravityContext = React.createContext<GravityContextValue | null>(null)

function resolvePosition(value: string | number | undefined, max: number, fallback: number) {
  if (typeof value === 'number') return value
  if (typeof value === 'string' && value.endsWith('%')) {
    const parsed = Number.parseFloat(value)
    if (!Number.isNaN(parsed)) return (parsed / 100) * max
  }
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    if (!Number.isNaN(parsed)) return parsed
  }
  return fallback
}

export default function Gravity({
  children,
  className,
  gravity = { x: 0, y: 1 },
  draggable = false,
}: GravityProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const engineRef = React.useRef<Matter.Engine | null>(null)
  const runnerRef = React.useRef<Matter.Runner | null>(null)
  const mouseConstraintRef = React.useRef<Matter.MouseConstraint | null>(null)
  const frameRef = React.useRef<number | null>(null)
  const bodiesRef = React.useRef<RegisteredBody[]>([])
  const wallsRef = React.useRef<Matter.Body[]>([])

  React.useEffect(() => {
    const engine = Matter.Engine.create({
      gravity: { x: gravity.x, y: gravity.y, scale: 0.0028 },
    })
    const runner = Matter.Runner.create()

    engineRef.current = engine
    runnerRef.current = runner
    Matter.Runner.run(runner, engine)

    const syncBodies = () => {
      bodiesRef.current.forEach(({ body, element, width, height }) => {
        element.style.transform = `translate(${body.position.x - width / 2}px, ${body.position.y - height / 2}px) rotate(${body.angle}rad)`
      })
      frameRef.current = requestAnimationFrame(syncBodies)
    }

    frameRef.current = requestAnimationFrame(syncBodies)

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      if (mouseConstraintRef.current) Matter.World.remove(engine.world, mouseConstraintRef.current)
      if (wallsRef.current.length > 0) Matter.World.remove(engine.world, wallsRef.current)
      Matter.Runner.stop(runner)
      Matter.Engine.clear(engine)
    }
  }, [gravity.x, gravity.y])

  React.useEffect(() => {
    const container = containerRef.current
    const engine = engineRef.current
    if (!container || !engine) return

    const buildBounds = () => {
      if (wallsRef.current.length > 0) {
        Matter.World.remove(engine.world, wallsRef.current)
      }

      const width = container.clientWidth
      const height = container.clientHeight
      const thickness = 60

      wallsRef.current = [
        Matter.Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }), // Bottom
        Matter.Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }), // Top
        Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }), // Left
        Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }), // Right
      ]

      Matter.World.add(engine.world, wallsRef.current)
    }

    buildBounds()

    const observer = new ResizeObserver(() => buildBounds())
    observer.observe(container)

    const handleMouseLeave = () => {
      if (mouseConstraintRef.current) {
        ;(mouseConstraintRef.current as any).mouse.button = -1
        ;(mouseConstraintRef.current as any).body = null
      }
    }

    if (draggable) {
      const mouse = Matter.Mouse.create(container)
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.18,
          render: { visible: false },
        },
      })

      container.addEventListener('mouseleave', handleMouseLeave)
      mouseConstraintRef.current = mouseConstraint
      Matter.World.add(engine.world, mouseConstraint)
    }

    return () => {
      container.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
      if (mouseConstraintRef.current) {
        Matter.World.remove(engine.world, mouseConstraintRef.current)
        mouseConstraintRef.current = null
      }
    }
  }, [draggable])

  const registerBody = React.useCallback<GravityContextValue['registerBody']>((element, options) => {
    const engine = engineRef.current
    const container = containerRef.current
    if (!engine || !container) return () => {}

    const width = element.offsetWidth
    const height = element.offsetHeight
    const x = resolvePosition(options.x, container.clientWidth, container.clientWidth / 2)
    const y = resolvePosition(options.y, container.clientHeight, container.clientHeight / 4)

    const body = Matter.Bodies.rectangle(x, y, width, height, {
      friction: 0.5,
      restitution: 0.2,
      ...options.matterBodyOptions,
    })

    if (typeof options.angle === 'number') {
      Matter.Body.setAngle(body, (options.angle * Math.PI) / 180)
    }

    Matter.World.add(engine.world, body)

    const registeredBody = { body, element, width, height }
    bodiesRef.current.push(registeredBody)

    return () => {
      bodiesRef.current = bodiesRef.current.filter((entry) => entry !== registeredBody)
      Matter.World.remove(engine.world, body)
    }
  }, [])

  const contextValue = React.useMemo(() => ({ registerBody }), [registerBody])

  return (
    <GravityContext.Provider value={contextValue}>
      <div ref={containerRef} className={`relative overflow-hidden ${className ?? ''}`}>
        {children}
      </div>
    </GravityContext.Provider>
  )
}

export function MatterBody({
  children,
  x,
  y,
  angle = 0,
  matterBodyOptions,
}: MatterBodyProps) {
  const context = React.useContext(GravityContext)
  const ref = React.useRef<HTMLDivElement | null>(null)
  const registeredRef = React.useRef(false)
  const registerBody = context?.registerBody

  React.useEffect(() => {
    if (!registerBody || !ref.current) return

    let cleanup: (() => void) | undefined
    let frame: number | null = null
    let cancelled = false

    const registerWhenReady = () => {
      if (cancelled || !ref.current) return
      if (registeredRef.current) return

      const parent = ref.current.parentElement
      const hasElementSize = ref.current.offsetWidth > 0 && ref.current.offsetHeight > 0
      const hasParentSize = Boolean(parent && parent.clientWidth > 0 && parent.clientHeight > 0)

      if (!hasElementSize || !hasParentSize) {
        frame = requestAnimationFrame(registerWhenReady)
        return
      }

      cleanup = registerBody(ref.current, { x, y, angle, matterBodyOptions })
      registeredRef.current = true
    }

    frame = requestAnimationFrame(registerWhenReady)

    return () => {
      cancelled = true
      if (frame !== null) cancelAnimationFrame(frame)
      registeredRef.current = false
      cleanup?.()
    }
  }, [registerBody])

  return (
    <div ref={ref} className="absolute left-0 top-0 will-change-transform" style={{ touchAction: 'none' }}>
      {children}
    </div>
  )
}
