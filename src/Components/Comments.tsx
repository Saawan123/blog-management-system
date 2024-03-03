import React, { useState } from "react";

const Comments = ({ comment }: any) => {
  const [replies, setReplies] = useState(comment.replies || []);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const addReply = () => {
    const newReply = {
      id: generateUniqueId(), // Implement this function to generate unique IDs
      text: replyText,
    };
    setReplies([...replies, newReply]);
    setShowReplyInput(false);
    setReplyText("");
  };

  return (
    <div>
      <p>{comment.text}</p>
      {replies?.map((reply: any) => (
        <div key={reply.id} style={{ marginLeft: "20px" }}>
          {/* Recursively render comments for replies, or use a separate Reply component */}
          <Comments comment={reply} />
        </div>
      ))}
      {showReplyInput ? (
        <>
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={addReply}>Reply</button>
        </>
      ) : (
        <button onClick={() => setShowReplyInput(true)}>
          Reply to Comment
        </button>
      )}
    </div>
  );
}

export default Comments;
