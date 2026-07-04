import Image from "next/image";
import FeedTest from "@/features/feed/components/FeedTest";
import FeedPage from "@/features/feed/components/FeedPage";
export default function Home() {
  return (
    <main>
      <h1>MemeVerse</h1>
      <FeedPage />;

    </main>
  );
}
