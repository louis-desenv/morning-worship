
export interface Video {
  id: string;
  title: string;
  speaker: string;
  thumbnailUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type AppState = 'loadingList' | 'listVisible' | 'loadingArticle' | 'articleVisible' | 'error';
