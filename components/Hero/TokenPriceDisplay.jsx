export const renderTokenPriceDisplay = (
  tokenSymbol,
  perTokenSolPrice,
  currency
) => {
  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-emerald-500/10 rounded-xl p-4 flex items-center justify-center space-x-3 mb-6">
      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
        <img src="/logo.png" alt={tokenSymbol} className="w-6 h-6" />
      </div>
      <span className={`text-lg font-medium text-white`}>
        1 {tokenSymbol} ={" "}
      </span>
      <div className="px-3 py-1.5 rounded-lg bg-purple-500/20">
        <span className="text-lg font-bold text-purple-500">
          {perTokenSolPrice} {currency}
        </span>
      </div>
    </div>
  );
};
