export interface VideoProject {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  duration: string;
  specs: {
    fps: number;
    resolution: string;
    codec: string;
  };
}

export interface GraphicProject {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  challenge: string;
  solution: string;
  client: string;
  year: number;
  tags: string[];
}


