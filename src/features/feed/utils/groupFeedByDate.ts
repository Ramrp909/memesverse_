import type { FeedGroup, FeedItem } from "../types/feed.model";

export function groupFeedByDate(posts: FeedItem[]): FeedGroup[] {
  const grouped = new Map<string, FeedItem[]>();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  posts.forEach((post) => {
    const postDate = new Date(post.createdAt);
    postDate.setHours(0, 0, 0, 0);

    const diff =
      (today.getTime() - postDate.getTime()) /
      (1000 * 60 * 60 * 24);

    let label: string;

    if (diff === 0) {
      label = "Today";
    } else if (diff === 1) {
      label = "Yesterday";
    } else {
      label = postDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    if (!grouped.has(label)) {
      grouped.set(label, []);
    }

    grouped.get(label)!.push(post);
  });

  return Array.from(grouped.entries()).map(([label, posts]) => {
    const firstPost = posts[0];

    return {
      label,

      date: firstPost.createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),

      dropTime: "00:00 UTC",

      posts,
    };
  });
}