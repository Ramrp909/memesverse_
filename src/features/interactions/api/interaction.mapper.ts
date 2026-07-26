import type {
  InteractionApiState,
  InteractionState,
} from "../types";

export const mapInteractionState = (
  interaction: InteractionApiState
): InteractionState => ({
  liked: interaction.liked,
  bookmarked: interaction.bookmarked,

  likes: interaction.likes_count,
  comments: interaction.comments_count,
  bookmarks: interaction.bookmarks_count,
  shares: interaction.shares_count,
  views: interaction.views_count,
});