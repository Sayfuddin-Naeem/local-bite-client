import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

const AddCommentForm = ({ onSubmit, isSubmitting, userPhotoURL }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold font-popins text-base-content mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        Add a Comment
      </h3>

      <div className="flex gap-3">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full ring-2 ring-primary/20">
            <img src={userPhotoURL} alt="Your avatar" />
          </div>
        </div>

        <div className="flex-1">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts..."
            className="textarea textarea-bordered w-full rounded-2xl resize-none focus:outline-primary focus:outline-2"
            rows="3"
            maxLength="300"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-neutral">
              {commentText.length}/300
            </span>
            <button
              onClick={handleSubmit}
              disabled={!commentText.trim() || isSubmitting}
              className="btn btn-sm bg-primary text-white border-0 rounded-full hover:bg-[oklch(70%_0.18_45)] gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCommentForm;