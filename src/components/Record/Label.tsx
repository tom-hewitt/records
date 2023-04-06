import { ibmPlexMono } from "@/fonts";

export const Label: React.FC<{
  album: string;
  artist: string;
  price: string;
}> = ({ album, artist, price }) => {
  return (
    <div
      className={ibmPlexMono.className}
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        padding: "5px 7px",
        gap: "15px",
        background: "white",
        boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
        borderRadius: "4px",

        right: "10px",
        top: "10px",

        fontSize: "12px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <strong>{album.toUpperCase()}</strong>
        <span>{artist.toUpperCase()}</span>
      </div>
      <span>{price}</span>
    </div>
  );
};
