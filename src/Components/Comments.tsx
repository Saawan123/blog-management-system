import { useState } from "react";

const Comments = ({ comment }: any) => {
  const [replies, setReplies] = useState(comment.Replies || []);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addReply = () => {
    if (!replyText.trim()) return; // Prevent adding empty replies
    const newReply = {
      id: generateUniqueId(),
      text: replyText,
    };
    setReplies([...replies, newReply]);
    setShowReplyInput(false);
    setReplyText("");
  };

  return (
    <div className="bg-white p-4 mb-2 border-b border-gray-200">
      <div className="flex space-x-2">
        <div className="shrink-0">
          <img
            src="https://via.placeholder.com/40" 
            alt="user profile"
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">Username</p> {/* Placeholder for commenter's name */}
          <p className="text-gray-800">{comment.Text || comment.text}</p>
          {/* Interactive reply link */}
          <button
            className="text-sm text-blue-500 hover:text-blue-600 font-semibold mt-1"
            onClick={() => setShowReplyInput(!showReplyInput)}
          >
            Reply
          </button>
        </div>
      </div>
      <div className="space-y-2 mt-3 pl-12">
        {replies.map((reply: any) => (
          <div key={reply.id} className="mt-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
            <Comments comment={reply} />
          </div>
        ))}
      </div>
      {showReplyInput && (
        <div className="mt-3 flex space-x-2">
          <input
            className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Add a reply..."
            autoFocus
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onClick={addReply}
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;
