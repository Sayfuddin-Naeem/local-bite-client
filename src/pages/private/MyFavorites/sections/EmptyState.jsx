import { Heart } from "lucide-react";

// eslint-disable-next-line no-unused-vars
const EmptyState = ({ icon: Icon, title, description, actionText, onAction }) => {
  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-2xl font-bold font-popins text-base-content mb-3">
        {title}
      </h3>
      <p className="text-neutral font-inter mb-6 max-w-md mx-auto">
        {description}
      </p>
      {onAction && (
        <button 
          onClick={onAction}
          className="btn bg-primary text-white border-0 rounded-2xl gap-2 hover:bg-[oklch(70%_0.18_45)]"
        >
          <Heart className="w-5 h-5" />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;