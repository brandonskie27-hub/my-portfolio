"use client"

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

/** Wraps a grid/list of StaggerItem children so they reveal a beat apart
 *  instead of all at once. Use alongside Reveal, not instead of it - this
 *  only handles the cascade between items, not the section-level fade. */
export function StaggerGroup({ children, ...props }: HTMLMotionProps<"div">) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={itemVariants} {...props}>
      {children}
    </motion.div>
  )
}
