export const renderCardHeading = (tokenSymbol) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-emerald-600 py-4 px-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold text-lg">
          Buy {tokenSymbol} Tokens
        </h3>
        <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
          Stage 1
        </span>
      </div>
      <p className="text-white ">Limited time offer - Secure your tokens now</p>
    </div>
  );
};
