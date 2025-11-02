export const renderLoaderOverlay = (isLoading) => {
  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};
