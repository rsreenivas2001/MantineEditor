import { MantineProvider } from "@mantine/core";
import dynamic from "next/dynamic";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";


const TextEditor = dynamic(() => import("./editor"), { ssr: false });

export default function Page() {
  return (
    <div className="px-[330px]">
      <MantineProvider>
        <TextEditor />
      </MantineProvider>
    </div>
  )
}