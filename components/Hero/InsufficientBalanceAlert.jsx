import { BsFillInfoCircleFill, BsCurrencyDollar } from "react-icons/bs";

export const renderInsufficientBalanceAlert = (
  userSolBalance,
  minSolBalance
) => {
  return (
    <>
      {userSolBalance < minSolBalance && (
        <div
          className={`text-center text-xs text-gray-400 mb-4 bg-purple-500/5 py-2 px-4 rounded-lg flex items-center justify-center`}
        >
          <BsFillInfoCircleFill className="mr-2" size={14} />
          <span>You don't have the minimum balance of {minSolBalance} SOL</span>
        </div>
      )}
    </>
  );
};
