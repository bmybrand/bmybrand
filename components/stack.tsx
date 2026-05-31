'use client'

import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

type StackProps = {
  randomRotation?: boolean
  sensitivity?: number
  cards?: React.ReactNode[]
  animationConfig?: { stiffness: number; damping: number }
  sendToBackOnClick?: boolean
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  mobileClickOnly?: boolean
  mobileBreakpoint?: number
  onActiveIndexChange?: (index: number) => void
}

type StackCard = {
  id: number
  content: React.ReactNode
}

export type StackHandle = {
  next: () => void
  prev: () => void
}

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}: {
  children: React.ReactNode
  onSendToBack: () => void
  sensitivity: number
  disableDrag?: boolean
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack()
    } else {
      animate(x, 0, { type: 'spring', stiffness: 180, damping: 18 })
      animate(y, 0, { type: 'spring', stiffness: 180, damping: 18 })
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  )
}

const Stack = forwardRef<StackHandle, StackProps>(function Stack(
  {
    randomRotation = false,
    sensitivity = 200,
    cards = [],
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = false,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    mobileClickOnly = false,
    mobileBreakpoint = 768,
    onActiveIndexChange,
  },
  ref
) {
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [stack, setStack] = useState<StackCard[]>(() => cards.map((content, index) => ({ id: index + 1, content })))

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [mobileBreakpoint])

  useEffect(() => {
    setStack(cards.map((content, index) => ({ id: index + 1, content })))
  }, [cards])

  useEffect(() => {
    if (!onActiveIndexChange || stack.length === 0) return
    onActiveIndexChange(stack[stack.length - 1].id - 1)
  }, [onActiveIndexChange, stack])

  const shouldDisableDrag = mobileClickOnly && isMobile
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag

  const sendToBack = (id: number) => {
    setStack((prev) => {
      const newStack = [...prev]
      const index = newStack.findIndex((card) => card.id === id)
      if (index === -1) return prev
      const [card] = newStack.splice(index, 1)
      newStack.unshift(card)
      return newStack
    })
  }

  useImperativeHandle(ref, () => ({
    next() {
      if (stack.length > 1) {
        sendToBack(stack[stack.length - 1].id)
      }
    },
    prev() {
      setStack((prev) => {
        if (prev.length <= 1) return prev
        const last = prev[prev.length - 1]
        return [last, ...prev.slice(0, -1)]
      })
    },
  }), [stack])

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = window.setInterval(() => {
        sendToBack(stack[stack.length - 1].id)
      }, autoplayDelay)

      return () => window.clearInterval(interval)
    }
  }, [autoplay, autoplayDelay, stack, isPaused])

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0
        const isTopCard = index === stack.length - 1
        const depthFromTop = stack.length - index - 1
        const spreadX = depthFromTop === 0 ? 0 : depthFromTop % 2 === 0 ? -4 * depthFromTop : 6 * depthFromTop
        const spreadY = depthFromTop * 3

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag || !isTopCard}
          >
            <motion.div
              className="card"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                x: spreadX,
                y: spreadY,
                rotateZ: (depthFromTop % 2 === 0 ? -1 : 1) * depthFromTop * 1.2 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '90% 90%',
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        )
      })}
    </div>
  )
})

export default Stack
