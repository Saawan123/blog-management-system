export interface CommentReply {
  ID: string;
  Author: string;
  Text: string;
}

export interface Comment {
  ID: string;
  Author: string;
  Text: string;
  Replies: CommentReply[];
}

export interface ContentSection {
  section: string;
  text: string;
}

export interface CardData {
  ID: string;
  Title: string;
  Author: string;
  Content: ContentSection[];
  Likes: number;
  Shares: number;
  Comments: Comment[];
}