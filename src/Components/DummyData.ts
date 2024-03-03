import { cardData } from "../lib/interface";

export const DummyData: cardData[] = [
  {
    ID: "post1",
    Title: "Post Title",
    Author: "Author Name",
    Content: [{ section: "Section 1", text: "This is some text." }],
    Likes: 0,
    Shares: 0,
    Comments: [
      {
        ID: "comment1",
        Author: "Commenter Name",
        Text: "This is a comment.",
        Replies: [
          {
            ID: "reply1",
            Author: "Reply Author",
            Text: "This is a reply to the comment."
          },
          {
            ID: "reply11",
            Author: "Reply Author",
            Text: "This is a reply to the comment."
          }
        ]
      },
      {
        ID: "comment2",
        Author: "Commenter Name",
        Text: "This is a comment.",
        Replies: [
          {
            ID: "reply134",
            Author: "Reply Author",
            Text: "This is a reply to the comment."
          },
          {
            ID: "reply115",
            Author: "Reply Author",
            Text: "This is a reply to the comment."
          }
        ]
      },
      {
        ID: "comment3",
        Author: "Commenter Name",
        Text: "This is a comment.",
        Replies: [
          {
            ID: "reply111",
            Author: "Reply Author",
            Text: "This is a reply to the comment."
          },
          {
            ID: "reply1122",
            Author: "Reply Author",
            Text: "This is a reply to the comment."
          }
        ]
      }
    ]
  },
  

  {
    ID: "post2",
    Title: "Post Title",
    Author: "Author Name",
    Content: [{ section: "Section 2", text: "This is some text." }],
    Likes: 0,
    Shares: 0,
    Comments: [
      {
        ID: "comment2",
        Author: "Commenter Name",
        Text: "This is a comment.",
        Replies: [
          {
            ID: "reply2",
            Author: "Reply Author",
            Text: "This is a reply to the comment."
          },
          {
            ID: "reply22",
            Author: "Reply Author",
            Text: "This is a reply to the comment."
          }
        ]
      }
    ]
  },

  {
    ID: "post3",
    Title: "Post Title",
    Author: "Author Name",
    Content: [{ section: "Section 3", text: "This is some text." }],
    Likes: 0,
    Shares: 0,
    Comments: [
      {
        ID: "comment3",
        Author: "Commenter Name",
        Text: "This is a comment.",
        Replies: [
          {
            ID: "reply3",
            Author: "Reply Author",
            Text: "This is a reply to the comment."
          },
          {
            ID: "reply33",
            Author: "Reply Author",
            Text: "This is a reply to the comment."
          }
        ]
      }
    ]
  },
];
