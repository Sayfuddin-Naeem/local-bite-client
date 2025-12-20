import { Plus } from "lucide-react";

function Header({ onNavigate }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold font-popins text-base-content mb-2">
          My Reviews
        </h1>
        <p className="text-neutral font-inter">
          Manage all your food reviews in one place
        </p>
      </div>

      <button
        onClick={onNavigate}
        className="btn bg-primary text-white border-0 rounded-2xl gap-2 hover:bg-[oklch(70%_0.18_45)] shadow-lg"
      >
        <Plus className="w-5 h-5" />
        Add New Review
      </button>
    </div>
  );
}

export default Header;
