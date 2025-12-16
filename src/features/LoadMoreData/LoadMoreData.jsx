import { Loader, Star } from "lucide-react";

function LoadMoreData({
  hasMore,
  handleLoadMore,
  isPending,
  totalItem,
  itemName,
}) {
  return (
    <>
      {hasMore && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="btn btn-wide bg-primary text-white border-0 rounded-2xl hover:bg-[oklch(70%_0.18_45)] shadow-lg gap-2"
          >
            {isPending ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>Load More {itemName}</>
            )}
          </button>
        </div>
      )}

      {/* No More Items Message */}
      {!hasMore && totalItem > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 text-neutral bg-white px-6 py-3 rounded-full shadow-lg">
            <Star className="w-5 h-5 text-primary" />
            <span className="font-inter">
              You've reached the end of your {itemName.toLowerCase()}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default LoadMoreData;
