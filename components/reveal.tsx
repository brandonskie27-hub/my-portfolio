"use client"

import { motion, MotionConfig, type HTMLMotionProps } from "framer-motion"

// reducedMotion="user" drops the slide for visitors who ask for less motion and
// keeps only the fade. Branching on useReducedMotion() in render instead caused a
// hydration mismatch, since it is null on the server.
export function Reveal({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        {...props}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}
