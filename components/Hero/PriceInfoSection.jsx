export const renderPriceInfoSection = (currentPrice, nextPrice) => {
  return (
    <div className="flex justify-between bg-gradient-to-r from-purple-500/5 to-emerald-500.5 rounded-xl p-4 mb-5">
      <div className="text-center">
        <p className={`text-xs text-gray-400 mb-1`}>Current Price</p>
        <p className={`text-lg font-bold text-white`}>${currentPrice}</p>
      </div>
      <div className="h-auto w-px bg-gradient-to-b from-transparent via-gray-400/20 to-transparent"></div>
      <div className="text-center">
        <p className={`text-xs text-gray-400 mb-1`}>Next Stage</p>

        <p className={`text-lg font-bold text-white`}>${nextPrice}</p>
      </div>
    </div>
  );
};
