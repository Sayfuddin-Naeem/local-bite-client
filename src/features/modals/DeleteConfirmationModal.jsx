import { AlertTriangle, Trash2 } from "lucide-react";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  reviewName,
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box rounded-2xl max-w-md">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold font-popins text-xl text-base-content mb-2">
              Delete Review?
            </h3>
            <p className="text-neutral font-inter">
              Are you sure you want to delete your review for{" "}
              <span className="font-semibold text-base-content">
                "{reviewName}"
              </span>
              ? This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="btn btn-ghost rounded-2xl"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="btn btn-error rounded-2xl text-white gap-2"
          >
            {isDeleting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Review
              </>
            )}
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
    </div>
  );
};

export default DeleteConfirmationModal;
