"use client";

import type { PropsWithChildren } from "react";
import { motion, useSpring } from "framer-motion";
import React, { useRef } from "react";

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const CursorHighlight: React.FC<
  PropsWithChildren<{
    highlightWidth: number;
    highlightHeight: number;
    overlay?: JSX.Element;
  }>
> = ({ highlightWidth, highlightHeight, children, overlay = null }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const translateX = useSpring(0, spring);
  const translateY = useSpring(0, spring);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current) {
      return;
    }

    const { x, y } = ref.current.getBoundingClientRect();

    const centerX = highlightWidth / 2;
    const centerY = highlightHeight / 2;

    const mouseX = event.clientX - x - centerX;
    const mouseY = event.clientY - y - centerY;

    translateX.set(mouseX);
    translateY.set(mouseY);
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      transition={spring}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {children}
      <motion.div
        style={{
          position: "absolute",
          // border: "1px solid red",
          width: highlightWidth,
          height: highlightHeight,
          top: 0,
          left: 0,
          translateX,
          translateY,
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(217, 217, 217, 0.3) 0%, rgba(217, 217, 217, 0) 100%)",
          pointerEvents: "none",
        }}
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
      />
      {overlay}
    </motion.div>
  );
};
