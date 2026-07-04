import { FeedItem } from "../types/feed.model";

export interface FeedGroup {
  title: string;
  posts: FeedItem[];
}

export function groupFeedByDate(posts: FeedItem[]): FeedGroup[] {
  const grouped = new Map<string, FeedItem[]>();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  posts.forEach((post) => {
    const date = new Date(post.createdAt);
    date.setHours(0, 0, 0, 0);

    const diff =
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

    let label = "";

    if (diff === 0) {
      label = "Today";
    } else if (diff === 1) {
      label = "Yesterday";
    } else {
      label = date.toLocaleDateString("en-US", {
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

  return Array.from(grouped.entries()).map(([title, posts]) => ({
    title,
    posts,
  }));
}