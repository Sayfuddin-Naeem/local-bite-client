const ReviewCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-base-content-300"></div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-base-content-300 rounded w-24"></div>
          <div className="h-4 bg-base-content-300 rounded w-12"></div>
        </div>
        <div className="h-4 bg-base-content-300 rounded w-3/4"></div>
        <div className="h-4 bg-base-content-300 rounded w-full"></div>
        <div className="h-4 bg-base-content-300 rounded w-2/3"></div>
        <div className="flex justify-between pt-3">
          <div className="h-8 bg-base-content-300 rounded-full w-24"></div>
          <div className="h-8 bg-base-content-300 rounded-full w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;