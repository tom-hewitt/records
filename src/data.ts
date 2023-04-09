export interface RecordInfo {
  id: string;
  album: string;
  artist: string;
  cover: string;
  background: string;
  variants: VariantInfo[];
  description: string;
}

export type VariantType = "LP" | "CD";

export interface VariantInfo {
  type: VariantType;
  price: string;
}

export const records: RecordInfo[] = [
  {
    id: "man-alive-king-krule",
    album: "Man Alive!",
    artist: "King Krule",
    cover: "/albums/man-alive.png",
    background: "#D8E3EE",
    variants: [
      { type: "LP", price: "£20" },
      { type: "CD", price: "£10" },
    ],
    description:
      "After two feverishly received albums as King Krule, plus another low-key outing under his own name, this extraordinarily gifted 25-year-old from Peckham in South London adds further depth and substance to his oeuvre with another wondrous long-player called Man Alive!. It arrives packed full of his trademark sonic ambition and compositional skill, as well as the now-familiar corrosive lyricism and lurid social observation.",
  },
  {
    id: "ants-from-up-there-black-country-new-road",
    album: "Ants From Up There",
    artist: "Black Country New Road",
    cover: "/albums/ants-from-up-there.png",
    background: "#CFAE81",
    variants: [{ type: "LP", price: "£22" }],
    description:
      "Black Country, New Road return with their second album Ants From Up There. Following on almost exactly a year to the day from the release of their acclaimed debut For the first time, the band have harnessed the momentum from that record and run full pelt into their second, with Ants From Up There managing to strike a skilful balance between feeling like a bold stylistic overhaul of what came before, as well as a natural progression.",
  },
  {
    id: "in-rainbows-radiohead",
    album: "In Rainbows",
    artist: "Radiohead",
    cover: "/albums/in-rainbows.png",
    background: "#EBAA64",
    variants: [
      { type: "LP", price: "£24" },
      { type: "CD", price: "£12" },
    ],
    description:
      "After 15 years of continual, radical transformation, Radiohead found themselves with time, freedom and acquired wisdom. In Rainbows is the result years of jumping into the unknown and pushing one another’s creativity.",
  },
];
