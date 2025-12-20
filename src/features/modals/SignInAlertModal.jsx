import { AlertTriangle, BadgeInfo, LogIn } from "lucide-react";

const SignInAlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  foodName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box rounded-2xl max-w-md">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center shrink-0">
            <BadgeInfo className="w-6 h-6 text-info" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold font-popins text-xl text-base-content mb-2">
              SignIn?
            </h3>
            <p className="text-neutral font-inter">
              Please sign in to add the{" "}
              <span className="font-semibold text-base-content">
                {foodName}
              </span>{" "}
              review to your favorites.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="btn btn-ghost rounded-2xl"
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-error rounded-2xl text-white gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
    </div>
  );
};

export default SignInAlertModal;
