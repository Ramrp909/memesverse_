"use client";
import { useState, useEffect, useRef, useCallback} from "react";
import {
  ThumbsUp, ThumbsDown, Share2, X, Lock,
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw,
  MessageCircle, Eye, Send, ChevronLeft, Link, Settings,
} from "lucide-react";
import {
  ThemeCtx,
  useTheme,
  C,
  tc,
} from "./context/ThemeContext";

import { useCountdown } from "./hooks/useCountDown"
import { useInfiniteArchive } from "./hooks/useInfiniteArchive";

import Logo from "./components/Logo";
import HeaderCountdown from "./components/HeaderCountDown"
import GoogleButton from "./components/GoogleButton"
import ShareToast from "./components/ShareToast";
import { Post } from "./types/post";
import AuthModal from "./components/AuthModal";
import PostDetail from "./components/PostDetail"
import SettingsDrawer from "./components/SettingsDrawer";
import PostCard from "./components/PostCard";
import DateDivider from "./components/DateDivider";
import { TODAY } from "./data/today";


// ─── app ──────────────────────────────────────────────────────────────────────

export default function TestingUi() {
  const [dark, setDark]             = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth]     = useState(false);
  const [detailPost, setDetailPost] = useState<Post | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { days, sentinel, hasMore } = useInfiniteArchive();
  const c = C(dark);

  function promptAuth() { setDetailPost(null); setShowAuth(true); }

  const D2 = "'Onest',sans-serif";
  const B2 = "'DM Sans',sans-serif";

  return (
    <ThemeCtx.Provider value={dark}>
      <div className="min-h-screen transition-colors duration-300" style={{ background: c.bg, fontFamily: B2 }}>

        {showAuth && (
          <AuthModal onClose={() => setShowAuth(false)} onLogin={() => { setIsLoggedIn(true); setShowAuth(false); }} />
        )}
        {detailPost && (
          <PostDetail post={detailPost} onClose={() => setDetailPost(null)} isLoggedIn={isLoggedIn} onAuthPrompt={promptAuth} />
        )}

        {/* settings drawer */}
        <SettingsDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          dark={dark}
          setDark={setDark}
          isLoggedIn={isLoggedIn}
          onSignIn={() => setShowAuth(true)}
          onSignOut={() => setIsLoggedIn(false)}
        />

        {/* header */}
        <header className="sticky top-0 z-20 border-b transition-colors duration-300"
          style={{ background: c.hdr, backdropFilter: "blur(16px)", borderColor: c.borderSub }}>
          <div className="max-w-2xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2 h-12">
            <Logo />
            <HeaderCountdown />

            {/* avatar / profile button — opens settings drawer */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex-shrink-0 transition-all hover:opacity-80 active:scale-95"
              title="Settings"
            >
              {isLoggedIn ? (
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&auto=format"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2"
                  // style={{ ringColor: "#6366f1" }}
                  style={{
  boxShadow: "0 0 0 2px #6366f1",
}}
                />
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                  style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", fontFamily: "'Onest',sans-serif" }}>
                  ?
                </div>
              )}
            </button>
          </div>
        </header>

        {/* feed */}
        <main className="max-w-2xl mx-auto px-3 sm:px-4 pt-4 pb-24 space-y-3">

          {/* today label */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: c.borderSub }} />
            <div className="text-center">
              <p className="text-sm font-black uppercase" style={{ fontFamily: D2, letterSpacing: "-0.01em", color: c.text }}>Today</p>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: D2, color: c.textDim }}>
                Jun 26, 2026 · {TODAY.length} posts
              </p>
            </div>
            <div className="flex-1 h-px" style={{ background: c.borderSub }} />
          </div>

          {TODAY.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} total={TODAY.length}
              isLoggedIn={isLoggedIn} onAuthPrompt={() => setShowAuth(true)} onOpenDetail={() => setDetailPost(post)} />
          ))}

          <p className="text-center py-3 text-[10px] font-bold uppercase tracking-widest"
            style={{ fontFamily: D2, color: c.textDim }}>
            — end of today · scroll for previous drops —
          </p>

          {days.map((day) => (
            <div key={day.date} className="space-y-3">
              <DateDivider day={day} />
              {day.posts.map((post, i) => (
                <PostCard key={`${day.date}-${post.id}`} post={post} index={i} total={day.posts.length}
                  isLoggedIn={isLoggedIn} onAuthPrompt={() => setShowAuth(true)} onOpenDetail={() => setDetailPost(post)} />
              ))}
            </div>
          ))}

          <div ref={sentinel} />

          {hasMore ? (
            <div className="flex justify-center py-6">
              <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: "#6366f1", borderTopColor: "transparent" }} />
            </div>
          ) : (
            <p className="text-center py-8 text-[10px] font-bold uppercase tracking-widest"
              style={{ fontFamily: D2, color: c.textDim }}>Beginning of history</p>
          )}
        </main>
      </div>
    </ThemeCtx.Provider>
  );
}
