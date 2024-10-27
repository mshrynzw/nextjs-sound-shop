"use client"

import React from "react"
import {motion, AnimatePresence} from "framer-motion"
import {useModal} from "@/context/ModalContext"
import styles from "@/components/modal/Modal.module.css"

const Modal: React.FC = () => {
  const {isOpen, modalContent, closeModal} = useModal()

  const overlayVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1}
  }

  const modalVariants = {
    hidden: {opacity: 0, y: -50, scale: 0.95},
    visible: {opacity: 1, y: 50, scale: 1}
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-10 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          >
          <motion.div
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleOverlayClick}
          >
            <motion.div
              className="relative z-50 flex w-full items-center justify-center"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{type: "spring", damping: 25, stiffness: 500}}
            >
              <div className="flex flex-col rounded-lg bg-white/10 px-12 py-8 text-center text-white">
                <div className="h-full w-full">
                  <div className="flex w-full flex-col items-center gap-4 divide-y">
                    <div className="text-base font-bold uppercase tracking-widest">{modalContent?.title}</div>
                    <div className={`pt-2 space-y-4 h-[400px] overflow-y-auto ${styles.scrollContainer}`}>{modalContent?.content}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal