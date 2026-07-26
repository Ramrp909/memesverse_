import { FeedApiItem } from "../types/feed.api";
import { FeedItem } from "../types/feed.model";
import type { InteractionApiState } from "@/features/interactions/types";
export class FeedMapper {
  static toModel(item: FeedApiItem): FeedItem {
    return {
      id: item.id,
      title: item.title ?? "",
      mediaUrl: item.file_url,
      thumbnailUrl: item.thumbnail_url ?? item.file_url,
      mediaType: item.type,
      language: item.language ?? "",
      likes: item.likes_count,
      views: item.views_count,
      bookmarks: item.bookmarks_count,
      shares: item.shares_count,
      createdAt: new Date(item.created_at),
    };
  }

  static toModels(items: FeedApiItem[]): FeedItem[] {
    return items.map(this.toModel);
  }
  static toInteractionMap(
  items: FeedApiItem[]
): Record<number, InteractionApiState> {
  return Object.fromEntries(
    items.map((item) => [
      item.id,
      {
        liked: item.liked,
        bookmarked: item.bookmarked,

        likes_count: item.likes_count,
        comments_count: item.comments_count,

        bookmarks_count: item.bookmarks_count,
        shares_count: item.shares_count,
        views_count: item.views_count,
      },
    ])
  );
}
}