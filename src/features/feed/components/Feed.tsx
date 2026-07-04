import { useState, useEffect, useRef, useCallback, useMemo} from "react";
import { PostCard } from "@/features/post/components/PostCard";
import { DateDivider } from "./DateDivider";
import type { FeedGroup } from "../utils/groupFeedByDate";

interface FeedProps {
  groupedPosts: FeedGroup[];
  onOpenDetail?: (...args: any[]) => void;
  onAuthRequired?: () => void;
  onShare?: (...args: any[]) => void;
}

export function Feed({
  groupedPosts,
  onOpenDetail,
  onAuthRequired,
  onShare,
}: FeedProps) {
  const sections = useMemo(() => groupedPosts, [groupedPosts]);
  return (
    // <main style={{ maxWidth: 512, margin: "0 auto", padding: "16px 12px 96px" }}>
    //   <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    //     {/* Today section */}
    //     <DateDivider label="TODAY" meta={`${TODAY_DROP.date} · ${TODAY_DROP.posts.length} posts`} />
    //     {TODAY_DROP.posts.map((post, i) => (
    //       <PostCard
    //         key={post.id}
    //         post={post}
    //         index={i + 1}
    //         total={TODAY_DROP.posts.length}
    //         onOpenDetail={onOpenDetail}
    //         onAuthRequired={onAuthRequired}
    //         onShare={onShare}
    //       />
    //     ))}

    //     {/* End of today */}
    //     <div style={{ textAlign: "center", padding: "12px 0", fontFamily: "'Onest', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--mv-text-dim)" }}>
    //       — end of today · scroll for previous drops —
    //     </div>

    //     {/* Archive */}
    //     {loadedDays.map(day => (
    //       <div key={day.date} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    //         <DateDivider label={day.label} meta={`${day.date} · ${day.posts.length} posts`} />
    //         {day.posts.map((post, i) => (
    //           <PostCard
    //             key={post.id}
    //             post={post}
    //             index={i + 1}
    //             total={day.posts.length}
    //             onOpenDetail={onOpenDetail}
    //             onAuthRequired={onAuthRequired}
    //             onShare={onShare}
    //           />
    //         ))}
    //       </div>
    //     ))}

    //     {/* Loading spinner */}
    //     {loading && (
    //       <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
    //         <div style={{
    //           width: 20, height: 20, border: "2px solid #6366f1",
    //           borderTopColor: "transparent", borderRadius: "50%",
    //           animation: "spin 1s linear infinite",
    //         }} />
    //       </div>
    //     )}

    //     {/* End of history */}
    //     {allLoaded && (
    //       <div style={{ textAlign: "center", padding: "32px 0", fontFamily: "'Onest', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--mv-text-dim)" }}>
    //         Beginning of history
    //       </div>
    //     )}

    //     {/* Scroll sentinel */}
    //     <div ref={bottomRef} style={{ height: 1 }} />
    //   </div>

    //   <style>{`
    //     @keyframes spin { to { transform: rotate(360deg); } }
    //     .hidden { display: none; }
    //     @media (min-width: 640px) { .sm\\:flex { display: flex !important; } .sm\\:block { display: block !important; } .sm\\:max-w-sm { max-width: 384px; } .sm\\:mb-8 { margin-bottom: 32px; } .sm\\:rounded-2xl { border-radius: 16px !important; } }
    //     @media (min-width: 768px) { .md\\:flex-row { flex-direction: row !important; } .md\\:flex-\\[3\\] { flex: 3 !important; } .md\\:flex-\\[2\\] { flex: 2 !important; } .md\\:max-w-\\[980px\\] { max-width: 980px; } .md\\:max-h-\\[90vh\\] { max-height: 90vh; } .md\\:rounded-2xl { border-radius: 16px !important; } .md\\:h-auto { height: auto !important; } .md\\:border-t-0 { border-top: none !important; } .md\\:border-l { border-left: 1px solid var(--mv-border-sub) !important; } .md\\:hidden { display: none !important; } }
    //   `}</style>
    // </main>
    <main
  style={{
    maxWidth: 512,
    margin: "0 auto",
    padding: "16px 12px 96px",
  }}
>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}
  >
    {sections.map((section) => (
      <div
        key={section.title}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <DateDivider
          label={section.title.toUpperCase()}
          meta={`${section.posts.length} posts`}
        />

        {section.posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            index={index + 1}
            total={section.posts.length}
            onOpenDetail={onOpenDetail}
            onAuthRequired={onAuthRequired}
            onShare={onShare}
          />
        ))}
      </div>
    ))}
  </div>
</main>
  );
}
