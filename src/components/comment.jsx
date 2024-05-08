import { useState } from "react";

const CommentFeature = () => {
  const [commentValue, setCommentValue] = useState("");
  const [comment, setComment] = useState([]);
  const [replyBox, setReplyBox] = useState([]);

  const onComment = () => {
    const newMessage = {
      id: Math.random(),
      message: commentValue,
      dateTime: getCurrentDateTime(),
    };

    if (commentValue.trim() !== "") {
      setComment((prevMsg) => [newMessage, ...prevMsg]);
    }

    setCommentValue("");
  };

  const onDelete = (id) => {
    setComment((prevMessage) => prevMessage.filter((msg) => msg.id !== id));
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      onComment();
    }
  };

  const onReply = (id) => {
    setReplyBox((reply) => {
      if (reply.includes(id)) {
        return reply.filter((prev) => prev.id !== id);
      } else {
        return [...reply, id];
      }
    });
  };

  const onCancel = (id) => {
    setReplyBox((reply) => reply.filter((prev) => prev !== id));
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return currentDate.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="p-10 flex flex-row gap-3">
        <input
          className="border-slate-600 border-2 h-10 w-72 indent-2"
          type="text"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          placeholder="Enter comment..."
          onKeyDown={onEnter}
        />
        <button
          onClick={onComment}
          className="active:scale-95 bg-blue-600 text-white font-semibold text-base rounded-md px-4 py-2"
        >
          Comment
        </button>
      </div>

      {/* Display the comment list */}
      <div className="p-10 pt-0">
        {comment.map((comment) => (
          <div key={comment.id} className=" mb-5">
            <span className=" flex items-end gap-3">
              <p className="">{comment.message}</p>
              <p className="text-[10px]">{comment.dateTime}</p>
            </span>
            <button
              onClick={() => onReply(comment.id)}
              className="text-xs text-slate-400 mb-2"
            >
              reply
            </button>
            <button
              className="text-xs text-red-500 mb-2 ml-2"
              onClick={() => onDelete(comment.id)}
            >
              delete
            </button>

            {replyBox.includes(comment.id) && (
              <div className=" space-y-2">
                <input type="text" className="border border-slate-600 " />
                <div className=" flex items-center gap-1">
                  <button className=" bg-blue-500 text-white font-semibold px-2 py-1 text-xs">
                    Save
                  </button>
                  <button
                    onClick={() => onCancel(comment.id)}
                    className="bg-red-500 text-white font-semibold text-xs px-2 py-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentFeature;
