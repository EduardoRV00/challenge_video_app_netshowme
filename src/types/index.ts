// src/types/index.ts

export interface Video {
  id: string;
  title: string;
  created_at: string;
  category: number;
  hls_path: string;
  description: string;
  thumbnail: string;
  site_id: number;
  views: number;
  likes: number;
  viewIncremented?: boolean;
}
