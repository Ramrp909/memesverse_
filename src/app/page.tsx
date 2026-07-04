import Image from "next/image";
import FeedTest from "@/features/feed/components/FeedTest";

import FeedPage from "@/features/feed/components/FeedPage";
import { Header } from "@/features/header/components/Header";
export default function Home() {
  return (
    <main>
      <Header />
      <FeedPage />;

    </main>
  );
}
