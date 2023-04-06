import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { AnimatedPlane } from "@/components/Record/AnimatedPlane";
import { CursorHighlight } from "@/components/Record/CursorHighlight";
import { Record } from "@/components/Record";
import { RecordStack } from "@/components/RecordStack";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const records = [0, 1, 2];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 100,
          height: "100%",
          flex: "1",
        }}
      >
        <RecordStack
          records={[
            {
              album: "Man Alive!",
              artist: "King Krule",
              price: "£20",
              cover: "albums/man-alive.png",
            },
            {
              album: "Ants From Up There",
              artist: "Black Country New Road",
              price: "£22",
              cover: "albums/ants-from-up-there.png",
            },
            {
              album: "In Rainbows",
              artist: "Radiohead",
              price: "£24",
              cover: "albums/in-rainbows.png",
            },
          ]}
        />
      </div>
    </div>
  );
}
