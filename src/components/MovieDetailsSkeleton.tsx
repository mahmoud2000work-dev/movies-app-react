const MovieDetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 shimmer">
      <div className="w-full md:w-1/3 h-[500px] bg-gray-700 rounded-lg"></div>
      <div className="flex-1 space-y-4">
        <div className="h-8 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        <div className="h-32 bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
