import { FeedMapper } from "../mapper/feed.mapper";
import { FeedRepository } from "../repository/feed.repository";

export class FeedService {
  static async getFeed(cursor?: number) {
    const response = await FeedRepository.getFeed(cursor);

    return {
      items: FeedMapper.toModels(response.data),

      pagination: response.pagination,
    };
  }
}