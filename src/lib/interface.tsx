interface Reply {
  ID: string;
  Author: string;
  Text: string;
}

interface Comment {
  ID: string;
  Author: string;
  Text: string;
  Replies: Reply[];
}

interface ContentSection {
  section: string;
  text: string;
}

export interface cardData {
  ID: string;
  Title: string;
  Author: string;
  Content: ContentSection[];
  Likes: number;
  Shares: number;
  Comments: Comment[];
}
