const HeroSliderSkeleton = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-2xl bg-base-200 animate-pulse">
      {/* Background shimmer */}
      <div className="absolute inset-0 bg-linear-to-r from-base-300 via-base-200 to-base-300 animate-[shimmer_2s_infinite]"></div>
      
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content Skeleton */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Title */}
            <div className="h-12 lg:h-16 w-3/4 rounded-lg bg-base-300"></div>

            {/* Subtitle */}
            <div className="h-6 w-full rounded-lg bg-base-300"></div>
            <div className="h-6 w-5/6 rounded-lg bg-base-300"></div>

            {/* CTA Button */}
            <div className="h-12 w-40 rounded-full bg-base-300"></div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons Skeleton */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-base-300"></div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-base-300"></div>

      {/* Dots Skeleton */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full bg-base-300"
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSliderSkeleton;
