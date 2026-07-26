
import { interactionActions } from "@/features/interactions/state/interaction.actions";
import { FeedMapper } from "../mapper/feed.mapper";
import { FeedRepository } from "../repository/feed.repository";

export class FeedService {
  static async getFeed(cursor?: number) {
    const response = await FeedRepository.getFeed(cursor);

    const items = FeedMapper.toModels(response.data);

    interactionActions.initializeInteractions(
      FeedMapper.toInteractionMap(response.data)
    );

    return {
      items,
      pagination: response.pagination,
    };
  }
}