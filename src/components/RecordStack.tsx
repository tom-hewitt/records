"use client";

import { PropsWithChildren, RefObject, useRef, useState } from "react";
import { Record } from "./Record";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { ibmPlexMono } from "@/fonts";
import Image from "next/image";
import { VariantInfo, RecordInfo } from "@/data";

const RECORD_SIZE = 500;
const SCALE_FACTOR = 0.05;
const STACK_GAP = 50;
const BELOW_GAP = 580;

export const RecordStack: React.FC<{ records: RecordInfo[] }> = ({
  records,
}) => {
  const [selected, setSelected] = useState(0);

  return (
    <div
      style={{
        position: "relative",
        width: RECORD_SIZE,
        height: RECORD_SIZE,
      }}
    >
      {records
        .map((info, i) => (
          <motion.div
            style={{
              position: "absolute",
            }}
            animate={{
              y: (i < selected ? BELOW_GAP : 0) + (selected - i) * STACK_GAP,
              scale: 1 - (i - selected) * SCALE_FACTOR,
            }}
            transition={{ ease: "easeInOut" }}
            onClick={() => setSelected(i)}
            key={`${info.album}${info.artist}`}
          >
            <Record info={info} size={500} primary={i === selected} />
          </motion.div>
        ))
        .reverse()}
    </div>
  );
};

export const RecordStackPage: React.FC<{ records: RecordInfo[] }> = ({
  records,
}) => {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ container });

  const progress = useTransform(
    scrollYProgress,
    (latest) => -latest * (records.length - 1)
  );

  const [primary, setPrimary] = useState(0);

  progress.on("change", (latest) => {
    const latestPrimary = Math.round(latest);

    if (latestPrimary !== primary) {
      setPrimary(latestPrimary);
    }
  });

  return (
    <motion.div
      ref={container}
      style={{
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",

        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
      animate={{ background: records[primary].background }}
    >
      {records.map((record, i) => (
        <RecordPage
          record={record}
          progress={progress}
          i={i}
          primary={primary}
          key={`${record.album}${record.artist}`}
        />
      ))}
    </motion.div>
  );
};

export const RecordPage: React.FC<{
  record: RecordInfo;
  i: number;
  progress: MotionValue;
  primary: number;
}> = ({ record, i, progress, primary }) => {
  const offset = useTransform(progress, (latest) => i - latest);

  return (
    <div
      id={record.id}
      style={{
        minHeight: "100vh",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <a href={`#${record.id}`} draggable="false">
        <StackRecord info={record} offset={offset} primary={i === primary} />
      </a>

      <StackRecordInfo info={record} offset={offset} />
    </div>
  );
};

const StackRecord: React.FC<{
  info: RecordInfo;
  offset: MotionValue;
  primary: boolean;
}> = ({ info, offset, primary }) => {
  const translateY = useTransform(offset, (latest) => {
    if (latest < 0) {
      if (latest > -1) {
        return -latest * BELOW_GAP;
      }

      return BELOW_GAP + -(latest + 1) * STACK_GAP;
    }

    return -latest * STACK_GAP;
  });

  const scale = useTransform(offset, (latest) => 1 - latest * 0.05);

  const zIndex = useTransform(offset, (latest) => 100 - latest);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 180,
        left: 200,
        height: 500,
        width: 500,

        zIndex,

        translateY,
        scale,
      }}
    >
      <Record info={info} size={500} primary={primary} label />
    </motion.div>
  );
};

const StackRecordInfo: React.FC<{ info: RecordInfo; offset: MotionValue }> = ({
  info,
  offset,
}) => {
  const opacity = useTransform(offset, (latest) =>
    Math.max(1 - 2 * Math.abs(latest), 0)
  );

  const scale = useTransform(offset, (latest) => 1 - 0.5 * Math.abs(latest));

  return (
    <motion.div
      className={ibmPlexMono.className}
      style={{
        marginLeft: 800,
        marginRight: 150,
        display: "flex",
        flexDirection: "column",
        opacity,
        scale,
        gap: 20,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <strong style={{ fontSize: 36 }}>{info.album.toUpperCase()}</strong>
        <span style={{ fontSize: 24 }}>{info.artist.toUpperCase()}</span>
      </div>
      <RecordVariants info={info} />
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Button primaryColor={info.background}>ADD TO BAG</Button>
        <Button>ADD TO WISHLIST</Button>
      </div>
      <div style={{ fontSize: 12 }}>
        <span>{info.description}</span>
      </div>
    </motion.div>
  );
};

const RecordVariants: React.FC<{
  info: RecordInfo;
}> = ({ info }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      {info.variants.map((variant, i) => (
        <RecordVariant
          record={info}
          variant={variant}
          selected={i === selected}
          key={i}
        />
      ))}
    </div>
  );
};

const RecordVariant: React.FC<{
  record: RecordInfo;
  variant: VariantInfo;
  selected?: boolean;
}> = ({ record, variant, selected }) => {
  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
        gap: 10,
        borderRadius: 10,
        cursor: "pointer",

        outlineWidth: 2,
        outlineStyle: "solid",
        outlineColor: "rgba(0, 0, 0, 0)",
      }}
      initial={selected ? "selected" : "unselectedInitial"}
      whileHover={selected ? "selectedHover" : "unselectedHover"}
      variants={{
        unselectedInitial: {
          background: "rgba(0, 0, 0, 0)",
        },
        unselectedHover: {
          outlineColor: "rgba(0, 0, 0, 0)",
        },
        selected: {
          background: "rgba(0, 0, 0, 0.05)",
        },
        selectedHover: {
          background: "rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <motion.div
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
          width: 80,
          height: 80,
        }}
        variants={{
          unselectedHover: { scale: 1.05 },
          selectedHover: { scale: 1.05 },
        }}
      >
        <Image
          src={record.cover}
          alt={`Cover art for ${variant.type}`}
          width={80}
          height={80}
        />
      </motion.div>
      {/* <Record info={info} size={80} primary /> */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <strong>{variant.type}</strong>
        <div style={{ flex: "1" }} />
        <span>{variant.price}</span>
      </div>
    </motion.div>
  );
};

const Button: React.FC<PropsWithChildren<{ primaryColor?: string }>> = ({
  primaryColor,
  children,
}) => {
  return (
    <motion.div
      className={ibmPlexMono.className}
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "8px 12px",
        gap: 10,
        background: primaryColor ? "black" : undefined,
        color: primaryColor ? primaryColor : "black",
        border: "1px solid #000000",
        borderRadius: 5,

        fontSize: 16,

        cursor: "pointer",
      }}
      initial={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0)" }}
      whileHover={{
        scale: 1.05,
        boxShadow: primaryColor ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : undefined,
      }}
      whileTap={{
        scale: 1.03,
      }}
    >
      {children}
    </motion.div>
  );
};
