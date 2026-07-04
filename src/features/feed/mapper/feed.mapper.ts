import { FeedApiItem } from "../types/feed.api";
import { FeedItem } from "../types/feed.model";

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
}