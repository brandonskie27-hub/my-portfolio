"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"

export function Reveal({ children, ...props }: HTMLMotionProps<"div">) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
