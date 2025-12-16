import { User } from "lucide-react";

const AuthPrompt = ({ message, actionText, onAction }) => {
  return (
    <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 text-center border-2 border-primary/20">
      <User className="w-12 h-12 text-primary mx-auto mb-3" />
      <p className="text-base-content font-inter mb-4">{message}</p>
      <button
        onClick={onAction}
        className="btn bg-primary text-white border-0 rounded-full hover:bg-[oklch(70%_0.18_45)]"
      >
        {actionText}
      </button>
    </div>
  );
};

export default AuthPrompt;