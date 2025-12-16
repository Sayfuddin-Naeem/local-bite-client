import { Check, Edit2, Trash2, X } from "lucide-react";
import { useState } from "react";
import { formatCommentDate } from "../../../../utils/auth.utils";

const CommentItem = ({ comment, currentUserId, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const isOwner = currentUserId === comment?.user?._id;

  const handleSaveEdit = () => {
    if (editText.trim() && editText.length <= 300) {
      onEdit(comment._id, editText);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-3 p-4 bg-base-200 rounded-2xl hover:bg-base-300 transition-colors">
      <div className="avatar">
        <div className="w-10 h-10 rounded-full ring-2 ring-primary/20">
          <img src={comment?.user?.photoURL} alt={comment?.user?.displayName} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="font-semibold font-inter text-base-content">
              {comment?.user?.displayName}
            </p>
            <p className="text-xs text-neutral">
              {formatCommentDate(comment?.createdAt)}
            </p>
          </div>

          {isOwner && !isEditing && (
            <div className="flex gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-ghost btn-xs btn-circle text-primary hover:bg-primary hover:text-white"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => onDelete(comment)}
                className="btn btn-ghost btn-xs btn-circle text-error hover:bg-error hover:text-white"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="textarea textarea-bordered w-full rounded-xl resize-none"
              rows="2"
              maxLength="300"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral">
                {editText.length}/300
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  disabled={!editText.trim() || editText.length > 300}
                  className="btn btn-xs btn-success gap-1 text-white rounded-full"
                >
                  <Check className="w-3 h-3" />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="btn btn-xs btn-ghost gap-1 rounded-full"
                >
                  <X className="w-3 h-3" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-base-content font-inter">{comment.text}</p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;