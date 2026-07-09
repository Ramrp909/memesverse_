export interface FeedItem {
  id: number;
  title: string;
  mediaUrl: string;
  thumbnailUrl: string;
  mediaType: "image" | "video";
  language: string;
  likes: number
  views: number;
  bookmarks: number;
  shares: number;
  createdAt: Date;
}


export interface FeedGroup{
  date: string;
  label: string;
  dropTime: string;
  posts: FeedItem[];
}