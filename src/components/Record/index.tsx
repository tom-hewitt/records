import Image from "next/image";
import { AnimatedPlane } from "./AnimatedPlane";
import { CursorHighlight } from "./CursorHighlight";
import { Label } from "./Label";
import { RecordInfo } from "@/data";

export const Record: React.FC<{
  info: RecordInfo;
  size: number;
  primary?: boolean;
  label?: boolean;
}> = ({ info, size, primary, label }) => {
  return (
    <AnimatedPlane width={size} height={size} disabled={!primary}>
      <CursorHighlight
        highlightWidth={size}
        highlightHeight={size}
        overlay={label ? <Label {...info} /> : undefined}
      >
        <Image
          src={info.cover}
          width={size}
          height={size}
          alt={`Cover art for ${info.album} by ${info.artist}`}
          draggable="false"
          priority
        />
      </CursorHighlight>
    </AnimatedPlane>
  );
};
