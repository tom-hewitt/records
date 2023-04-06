"use client";

import { useState } from "react";
import { Record, RecordInfo } from "./Record";
import { motion } from "framer-motion";

const RECORD_SIZE = 500;
const SCALE_FACTOR = 0.05;
const STACK_GAP = 50;
const BELOW_GAP = 550;

export const RecordStack: React.FC<{ records: RecordInfo[] }> = ({
  records,
}) => {
  const [selected, setSelected] = useState(0);

  return (
    <div
      style={{ position: "relative", width: RECORD_SIZE, height: RECORD_SIZE }}
    >
      {records
        .map((info, i) => (
          <motion.div
            style={{
              position: "absolute",
            }}
            animate={{
              y: (i < selected ? BELOW_GAP : 0) + (selected - i * STACK_GAP),
              scale: 1 - (i - selected) * SCALE_FACTOR,
              filter: `brightness(${100 - (i - selected) * 5}%)`,
            }}
            transition={{ ease: "easeInOut" }}
            onClick={() => setSelected(i)}
          >
            <Record info={info} size={500} key={i} primary={i === selected} />
          </motion.div>
        ))
        .reverse()}
    </div>
  );
};
