import { CardData } from "../lib/interface";

export const DummyData: CardData[] = [

  {
    ID: "post11",
    Title: "Another Post Title 11",
    Author: "Author Eleven",
    Content: [{ section: "Section 11", text: "This is some text for post 11." },
  
    { section: "Section 12", text: "This is some text for post 12." }],
    Likes: 11,
    Shares: 11,
    Comments: [
      {
        ID: "comment11",
        Author: "Commenter Eleven",
        Text: "This is a comment on post 11.",
        Replies: [
          {
            ID: "reply111",
            Author: "Reply Author Eleven",
            Text: "Reply to the comment on post 11."
          },
          {
            ID: "reply112",
            Author: "Another Reply Author",
            Text: "Another reply to the comment on post 11."
          }
        ]
      }
    ]
  },
  {
    ID: "post12",
    Title: "Another Post Title 12",
    Author: "Author Twelve",
    Content: [{ section: "Section 12", text: "Interesting content for post 12." }],
    Likes: 12,
    Shares: 12,
    Comments: [
      {
        ID: "comment12",
        Author: "Commenter Twelve",
        Text: "Engaging comment on post 12.",
        Replies: [
          {
            ID: "reply121",
            Author: "Reply Author Twelve",
            Text: "Engaging reply to the comment on post 12."
          }
        ]
      }
    ]
  },
  {
    ID: "post13",
    Title: "Another Post Title 13",
    Author: "Author Thirteen",
    Content: [{ section: "Section 13", text: "Exclusive content for post 13." }],
    Likes: 13,
    Shares: 13,
    Comments: []
  },
  {
    ID: "post14",
    Title: "Another Post Title 14",
    Author: "Author Fourteen",
    Content: [{ section: "Section 14", text: "Deep dive text for post 14." }],
    Likes: 14,
    Shares: 14,
    Comments: [
      {
        ID: "comment14",
        Author: "Commenter Fourteen",
        Text: "Thought-provoking comment on post 14.",
        Replies: []
      }
    ]
  },
  {
    ID: "post15",
    Title: "Another Post Title 15",
    Author: "Author Fifteen",
    Content: [{ section: "Section 15", text: "Detailed analysis text for post 15." }],
    Likes: 15,
    Shares: 15,
    Comments: [
      {
        ID: "comment15",
        Author: "Commenter Fifteen",
        Text: "Insightful comment on post 15.",
        Replies: [
          {
            ID: "reply151",
            Author: "Reply Author Fifteen",
            Text: "Insightful reply to the comment on post 15."
          }
        ]
      }
    ]
  },
  {
    ID: "post16",
    Title: "Another Post Title 16",
    Author: "Author Sixteen",
    Content: [{ section: "Section 16", text: "Curated content for post 16." }],
    Likes: 16,
    Shares: 16,
    Comments: []
  },
  {
    ID: "post17",
    Title: "Another Post Title 17",
    Author: "Author Seventeen",
    Content: [{ section: "Section 17", text: "Creative content for post 17." }],
    Likes: 17,
    Shares: 17,
    Comments: [
      {
        ID: "comment17",
        Author: "Commenter Seventeen",
        Text: "Creative comment on post 17.",
        Replies: [
          {
            ID: "reply171",
            Author: "Reply Author Seventeen",
            Text: "Creative reply to the comment on post 17."
          }
        ]
      }
    ]
  },
  {
    ID: "post18",
    Title: "Another Post Title 18",
    Author: "Author Eighteen",
    Content: [{ section: "Section 18", text: "Innovative text for post 18." }],
    Likes: 18,
    Shares: 18,
    Comments: []
  },
  {
    ID: "post19",
    Title: "Another Post Title 19",
    Author: "Author Nineteen",
    Content: [{ section: "Section 19", text: "Exploratory text for post 19." }],
    Likes: 19,
    Shares: 19,
    Comments: [
      {
        ID: "comment19",
        Author: "Commenter Nineteen",
        Text: "Exploratory comment on post 19.",
        Replies: []
      }
    ]
  },
  {
    ID: "post20",
    Title: "Another Post Title 20",
    Author: "Author Twenty",
    Content: [{ section: "Section 20", text: "Visionary text for post 20." }],
    Likes: 20,
    Shares: 20,
    Comments: [
      {
        ID: "comment20",
        Author: "Commenter Twenty",
        Text: "Visionary comment on post 20.",
        Replies: [
          {
            ID: "reply201",
            Author: "Reply Author Twenty",
            Text: "Visionary reply to the comment on post 20."
          }
        ]
      }
    ]
  }

];
