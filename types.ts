
export interface Competitor {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  status: 'online' | 'offline';
}

export interface Post {
  id: string;
  competitorId: string;
  competitorName: string;
  competitorAvatar: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  groundingChunks?: GroundingChunk[];
}

export interface GroundingChunk {
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets?: {
        uri: string;
        title: string;
        snippet: string;
      }[];
    }[];
  }
}

export interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}
