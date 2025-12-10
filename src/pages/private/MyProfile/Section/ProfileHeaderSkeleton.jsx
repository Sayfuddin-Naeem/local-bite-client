function ProfileHeaderSkeleton() {
  return (
    <div className="bg-linear-to-r from-primary to-secondary rounded-2xl shadow-2xl p-8 mb-8 animate-pulse relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image Skeleton */}
        <div className="w-32 h-32 rounded-full bg-white/30"></div>

        {/* Text Skeleton */}
        <div className="flex-1 space-y-4 w-full">
          <div className="h-8 bg-white/40 rounded-lg w-48 mx-auto md:mx-0"></div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <div className="h-6 w-32 bg-white/30 rounded-lg"></div>
            <div className="h-6 w-40 bg-white/30 rounded-lg"></div>
            <div className="h-6 w-24 bg-white/30 rounded-lg"></div>
          </div>

          <div className="flex gap-3 justify-center md:justify-start">
            <div className="h-10 w-32 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderSkeleton;
