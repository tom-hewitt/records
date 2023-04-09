"use client";

import type { ComponentType, PropsWithChildren } from "react";
import { motion, useSpring } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const ROTATION_FACTOR = -20;

export const AnimatedPlane: React.FC<
  PropsWithChildren<{
    width: number;
    height: number;
    disabled?: boolean;
  }>
> = ({ children, width, height, disabled }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current || disabled) {
      return;
    }

    const { x, y, width, height } = ref.current.getBoundingClientRect();

    const centerX = width / 2;
    const centerY = height / 2;

    const mouseX = event.clientY - y - centerY;
    const mouseY = event.clientX - x - centerX;

    const degreeX = (mouseX / width) * ROTATION_FACTOR;
    const degreeY = (mouseY / height) * ROTATION_FACTOR;

    rotateX.set(-degreeX);
    rotateY.set(degreeY);
  };

  const handleMouseEnd = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      transition={spring}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        width,
        height,
      }}
    >
      <motion.div
        ref={ref}
        whileHover={{
          scale: disabled ? 1 : 1.05,
          y: disabled ? -height / 50 : height / 25,
        }}
        whileTap={{ scale: 1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseEnd}
        transition={spring}
        style={{
          width: "100%",
          height: "100%",
          rotateX,
          rotateY,
        }}
      >
        <div
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
          }}
        >
          <motion.div
            transition={spring}
            style={{
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              position: "absolute",
            }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
