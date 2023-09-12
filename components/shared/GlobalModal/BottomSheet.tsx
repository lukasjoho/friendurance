"use client"

import { FC } from "react"
import { motion } from "framer-motion"

interface BottomSheetProps {
  children: React.ReactNode
  size: any
}

const BottomSheet: FC<BottomSheetProps> = ({ children, size }: any) => {
  const variants = {
    hidden: (h: any) => ({
      y: h,
    }),
    visible: {
      y: 0,
    },
  }
  return (
    <motion.div
      id="body"
      className={`max-w-[800px] absolute min-h-[200px] bottom-0 w-full rounded-lg bg-red-500 backdrop-blur-2xl border p-6`}
      style={{ maxHeight: size.height }}
      variants={variants}
      custom={size.height}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
      }}
    >
      {children}
    </motion.div>
  )
}

export default BottomSheet
