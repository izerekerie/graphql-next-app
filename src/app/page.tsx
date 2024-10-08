import dynamic from "next/dynamic";

const Books = dynamic(() => import("./components/Books"), { ssr: false });
export default function Home() {
  return (
    <div>
      <Books />
    </div>
  );
}
