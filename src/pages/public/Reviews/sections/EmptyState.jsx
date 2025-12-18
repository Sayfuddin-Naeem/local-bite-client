import { Search } from "lucide-react";

const EmptyState = ({ searchQuery, onClear }) => {
  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-2xl font-bold font-popins text-base-content mb-3">
        {searchQuery ? `No results found for "${searchQuery}"` : 'No reviews yet'}
      </h3>
      <p className="text-neutral font-inter mb-6 max-w-md mx-auto">
        {searchQuery
          ? 'Try searching with different keywords or browse all reviews'
          : 'Be the first to share your food experience'}
      </p>
      {searchQuery && (
        <button onClick={onClear} className="btn btn-primary rounded-2xl">
          Clear Search
        </button>
      )}
    </div>
  );
};

export default EmptyState;