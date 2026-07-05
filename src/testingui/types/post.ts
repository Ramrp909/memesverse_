export type MediaType = "image" | "video";

export interface Post {
  id: number;
  type: MediaType;
  src: string;
  poster?: string;
  caption: string;
  views: number;
  likes: number;
  dislikes: number;
}

export interface DayDrop {
  date: string;
  label: string;
  dropTime: string;
  posts: Post[];
}