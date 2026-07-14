"use client";

import { useEffect, useState } from "react";
import FeedPage from "@/features/feed/components/FeedPage";
import { Header } from "@/features/header/components/Header";
import type { FeedItem } from "@/features/feed/types/feed.model";
import { PostDetail } from "../features/post/components/PostDetail";
import AuthModal from "../features/auth/components/AuthModal";
import SettingsDrawer from "@/features/settings/components/SettingsDrawer";
import ShareToast from "@/shared/components/ShareToast";

export default function Home() {
  const [selectedPost, setSelectedPost] = useState<FeedItem | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;
    const timer = window.setTimeout(() => setShowToast(false), 1800);
    return () => window.clearTimeout(timer);
  }, [showToast]);

  return (
    <main className="min-h-screen bg-[var(--mv-bg)] text-[var(--mv-text)] transition-colors duration-300">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col">
        <Header onSettingsOpen={() => setShowSettings(true)} />
        <FeedPage
          onOpenDetail={(post) => setSelectedPost(post)}
          onAuthRequired={() => setShowAuth(true)}
          onShare={() => setShowToast(true)}
        />
      </div>

      <PostDetail
        post={selectedPost}
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        onAuthRequired={() => setShowAuth(true)}
        onShare={() => setShowToast(true)}
      />

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
      <SettingsDrawer
  open={showSettings}
  onClose={() => setShowSettings(false)}
  isLoggedIn={false}
  onSignIn={() => setShowAuth(true)}
  onSignOut={() => {
    // TODO: Connect AuthProvider
    console.log("Sign out");
  }}
/>
      <ShareToast visible={showToast} message="Post shared" />
    </main>
  );
}
