export interface InteractionState {
  liked?: boolean;
  bookmarked?: boolean;

  likes: number;
  comments?: number;
  bookmarks: number;
  shares: number;
  views: number;
}
