import { AnimatedPlane } from "./AnimatedPlane";
import { CursorHighlight } from "./CursorHighlight";
import { Label } from "./Label";

export interface RecordInfo {
  album: string;
  artist: string;
  price: string;
  cover: string;
}

export const Record: React.FC<{
  info: RecordInfo;
  size: number;
  primary: boolean;
}> = ({ info, size, primary }) => {
  return (
    <AnimatedPlane width={size} height={size} disabled={!primary}>
      <CursorHighlight
        highlightWidth={size}
        highlightHeight={size}
        overlay={<Label {...info} />}
      >
        <img
          src={info.cover}
          style={{ height: "100%", width: "100%" }}
          draggable="false"
        />
      </CursorHighlight>
    </AnimatedPlane>
  );
};
