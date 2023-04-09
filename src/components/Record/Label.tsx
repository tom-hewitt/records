import { ibmPlexMono } from "@/fonts";

export const Label: React.FC<{
  album: string;
  artist: string;
}> = ({ album, artist }) => {
  return (
    <div
      className={ibmPlexMono.className}
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        padding: "5px 7px",
        background: "white",
        boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
        borderRadius: "4px",

        right: "10px",
        top: "10px",

        color: "black",

        fontSize: "12px",
      }}
    >
      <strong>{album.toUpperCase()}</strong>
      <span>{artist.toUpperCase()}</span>
    </div>
  );
};
