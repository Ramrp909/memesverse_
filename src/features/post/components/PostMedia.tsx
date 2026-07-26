"use client";

import VideoPlayer from "@/features/video/components/VideoPlayer";
import type { FeedItem } from "@/features/feed/types/feed.model";

interface PostMediaProps {
  post: FeedItem;
  onOpenDetail: () => void;
}

export default function PostMedia({
  post,
  onOpenDetail,
}: PostMediaProps) {
  const isVideo = post.mediaType === "video";

  return (
    <div
      className="bg-black"
      onClick={!isVideo ? onOpenDetail : undefined}
      style={{
        cursor: !isVideo ? "pointer" : "default",
      }}
    >
      {isVideo ? (
        <VideoPlayer
          src={post.mediaUrl}
          poster={post.thumbnailUrl}
          small
        />
      ) : (
//         <div className="group relative overflow-hidden rounded-lg h-[500px]">
//           <img
//   src={post.mediaUrl}
//   alt={post.title}
//   className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
//   style={{
//     maxHeight: "65vh",
//   }}
// />
<div className="group relative h-[500px] w-full overflow-hidden rounded-lg flex items-center justify-center">
  <img
    src={post.mediaUrl}
    alt={post.title}
    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
  />
          <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/10" />
        </div>
      )}
    </div>
  );
}