export interface FeedApiItem {
  id: number;
  title: string | null;
  file_url: string;
  thumbnail_url: string | null;
  type: "image" | "video";
  language: string | null;

  likes_count: number;
  views_count: number;
  bookmarks_count: number;
  shares_count: number;

  created_at: string;
}

export interface FeedApiResponse {
  status: string;

  data: FeedApiItem[];

  pagination: {
    has_next: boolean;
    next_cursor: number | null;
    limit: number;
  };
}