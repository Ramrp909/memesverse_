export interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}


export const DUMMY_COMMENTS: Comment[] = [
  { id: 1, user: "ByteWizard",  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&auto=format", text: "This is literally me every single Monday morning 💀", time: "2h ago", likes: 342 },
  { id: 2, user: "DankFactory", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&auto=format", text: "The accuracy is physically painful", time: "1h ago", likes: 189 },
  { id: 3, user: "MemeLord99",  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format", text: "sent this to my entire team lmao", time: "45m ago", likes: 94 },
  { id: 4, user: "NullPointer", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=64&h=64&fit=crop&auto=format", text: "I felt this in my soul. Weekly meeting trauma.", time: "30m ago", likes: 67 },
  { id: 5, user: "ChaosAgent",  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&fit=crop&auto=format", text: "top 10 anime betrayals 😭", time: "12m ago", likes: 41 },
];