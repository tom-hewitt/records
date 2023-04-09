import { RecordStackPage } from "@/components/RecordStack";
import { records } from "@/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Albums of the Year 2022 | Record Store",
  description:
    "Browser the Albums of the Year 2022 collection on Record Store.",
};

export default function Collection() {
  return <RecordStackPage records={records} />;
}
