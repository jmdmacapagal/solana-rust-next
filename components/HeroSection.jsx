import React, { useState, useEffect, useMemo, useRef } from "react";
import { FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { IoWalletOutline } from "react-icons/io5";
import { RxTokens } from "react-icons/rx";

import dynamic from "next/dynamic";

import Admin from "./Admin";

import { renderBgElements } from "./Hero/bgElements";
import { renderScrollToTopButton } from "./Hero/ScrollToTop";
import { renderCardHeading } from "./Hero/CardHeading";
import { renderHelpSection } from "./Hero/HelpSection";
import { renderFeaturesSetion } from "./Hero/FeaturesSection";
import { renderPriceInfoSection } from "./Hero/PriceInfoSection";
import { renderLoaderOverlay } from "./Hero/LoaderOverlay";
import { renderTokenPriceDisplay } from "./Hero/TokenPriceDisplay";
import { renderInsufficientBalanceAlert } from "./Hero/InsufficientBalanceAlert";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

const TOEKN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME;
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL;
const TOKEN_SUPPLY = process.env.NEXT_PUBLIC_TOKEN_SUPPLY;
const NEXT_PER_TOKEN_USD_PRICE =
  process.env.NEXT_PUBLIC_NEXT_PER_TOKEN_USD_PRICE;
const PER_TOKEN_USD_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE;
const PER_TOKEN_SOL_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_SOL_PRICE;
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;
const BLOCKCHAIN = process.env.NEXT_PUBLIC_BLOCKCHAIN;
const MIN_SOL_BALANCE = process.env.NEXT_PUBLIC_MIN_SOL_BALANCE;

const HeroSection = ({
  isDarkMode,
  wallet,
  isAdmin,
  loading,
  icoData,
  amount,
  userSolBalance,
  setAmount,
  createIcoAta,
  depositIco,
  buyTokens,
}) => {
  isDarkMode = true;

  const [selectedToken, setSelectedToken] = useState("SOL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSufficientBalance, setHasSufficientBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [contractInfo] = useState();
  const [tokenBalances] = useState();

  const bgColor = "bg-gray-900";
  const textColor = "text-white";
  const secondaryTextColor = "text-gray-400";
  const cardBg = "bg-gray-800";
  const cardBorder = "border-gray-700";
  const inputBg = "bg-gray-700 border-gray-600";

  const calculateProgressPercentage = () => {
    if (!icoData?.tokenSolde?.toString() || !icoData?.totalTokens?.toString())
      return 0;

    const availableSupply = Number(
      icoData?.tokensSold?.toString() + Number(icoData?.totalTokens?.toString())
    );

    const soldAmount = parseFloat(icoData?.tokensSold?.ToString() || 0);
    const totalSupply = parseFloat(availableSupply) || 1;

    const percentage = Math.min((soldAmount / totalSupply) * 100, 100);

    return parseFloat(percentage.toFixed(2));
  };

  const executePurchase = async () => {
    setIsLoading(true);

    const callingBuy = buyTokens();

    setIsLoading(false);
  };

  const getButtonMessage = () => {
    if (parse(Float) <= 0) {
      return "Enter an amount";
    }
    return "Buy Now";
  };

  const getTokenIcon = () => {
    return <img className="mr-2 w-4 h-4" src="/solana.svg" alt="SOL" />;
  };

  const getTokenButtonStyle = (token) => {
    const isSelected = selectedToken === token;

    return `flex items-center justify-center px-3 py-2 rounded-lg ${
      isSelected
        ? "bg-purple-700 text-white shadow-lg shadow-purple-700/30"
        : isDarkMode
        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    } transition-all duration-300 text-sm font-medium flex-1`;
  };

  const renderProgressSection = () => {
    return (
      <>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className={`text-xs ${secondaryTextColor}`}>Sale Progress</p>
            <p className="text-sm font-medium text-purple-500">
              {calculateProgressPercentage()}% Complete
            </p>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 relative progress-animation"
              style={{ width: `${calculateProgressPercentage()}%` }}
            >
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>

          <div className="flex justify-between mt-2">
            <p className={`text-xs ${secondaryTextColor}`}>
              Total Raised:{" "}
              <span className="font-medium">
                $
                {parseFloat(icoData?.tokensSold?.toString() || 0) *
                  parseFloat(PER_TOKEN_USD_PRICE) || 0 > 0
                  ? (
                      parseFloat(icoData?.tokensSold?.toString() || 0) *
                      parseFloat(PER_TOKEN_USD_PRICE || 0)
                    ).toFixed(2)
                  : "0"}
              </span>
            </p>

            <p className={`text-xs ${secondaryTextColor}`}>
              Tokens Left:{" "}
              <span className="font-medium text-emerald-500">
                {icoData?.totalTokens - icoData?.tokensSold} {TOKEN_SYMBOL}
              </span>
            </p>
          </div>
        </div>

        <style jsx>
          {`
            // progress bar animation
            .progress-animation {
              animation: progress 2s ease-out;
            }

            @keyframes progress {
              0% {
                width: 0%;
              }

              100% {
                width: ${calculateProgressPercentage()}%;
              }
            }

            // shimmer effect
            .shimmer {
              animation: shimmer 2s infinite linear;
              background: linear-gradient(
                to-right,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0) 100%
              );
              background-size: 200% 100%;
            }

            @keyframes shimmer {
              0% {
                background-position: -200% 0;
              }

              100% {
                background-position: 200% 0;
              }
            }
          `}
        </style>
      </>
    );
  };

  const renderActionButtons = () => {
    return (
      <>
        {wallet?.connected ? (
          <>
            {icoData ? (
              <>
                {userSolBalance < MIN_SOL_BALANCE ? (
                  <button
                    className={`w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white rounded-lg py-4 mb-4 flex items-center justify-between transition-all duration-300 font-medium shadow-lg`}
                  >
                    Insufficient Balance, Min req {MIN_SOL_BALANCE} SOL
                  </button>
                ) : (
                  <button
                    onClick={executePurchase}
                    disabled={!hasSufficientBalance}
                    className={`w-full ${
                      hasSufficientBalance
                        ? "bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700"
                        : isDarkMode
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-gray-300 cursor-not-allowed"
                    } text-white rounded-lg py-4 mb-4 flex items-center justify-center transition-all duration-300 font-medium shadow-lg ${
                      hasSufficientBalance ? "hover:shadow-purple-500/20" : ""
                    }`}
                  >
                    {getButtonMessage()}
                  </button>
                )}
              </>
            ) : (
              <button
                className={`w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white rounded-lg py-4 mb-4 flex items-center justify-center transition-all duration-300 font-medium shadow-lg`}
              >
                ICO needs to be initialized
              </button>
            )}
          </>
        ) : (
          <WalletMultiButton childStyle="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white rounded-lg py-4 mb-4 flex items-center justify-center transition-all duration-300 font-medium shadow-lg gap-2" />
        )}

        <style jsx>
          {`
            :global(.wallet-adapter-dropdown) {
              width: 100% !important;
            }

            :global(.wallet-adapter-button) {
              width: 100% !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
          `}
        </style>
      </>
    );
  };

  const renderBalanceSection = () => {
    return (
      <div
        className={`flex items-center ${
          isDarkMode ? "bg-gray-700/50" : "bg-gray-100"
        } rounded-lg px-4 py-3 mb-5`}
      >
        <div className="w-8 h-8 pl-2 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
          {getTokenIcon(selectedToken)}
        </div>
        <div>
          <p className={`text-xs ${secondaryTextColor}`}>Available Balance</p>
          <p className={`font-medium ${textColor}`}>
            {userSolBalance} <span className="text-sm">{selectedToken}</span>
          </p>
        </div>
      </div>
    );
  };

  const renderReferFriendButton = () => {
    return (
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="w-full py-4 px-6 rounded-lg bg-gray-800 hover:bg-gray-700 text-white my-4 font-medium transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <RxTokens />
        <span>ICO Details</span>
      </button>
    );
  };

  const renderTokenSelection = () => {
    return (
      <div className="mb-5">
        <div className="flex space-x-3">
          <button
            onClick={() => handleTokenSelect("SOL")}
            className={getTokenButtonStyle("SOL")}
          >
            <img src="/solana.svg" alt="Solana" className="w-4 h-4 mr-2" />
            {CURRENCY}
          </button>
        </div>
      </div>
    );
  };

  const renderTokenInputs = () => {
    return (
      <div className="space-y-4 mb-6">
        <div>
          <label
            className={`block ${secondaryTextColor} text-sm mb-2 font-medium`}
          >
            Quantity
          </label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full ${inputBg} ${textColor} rounded-lg border p-4 focus:ring-2 focus:ring-purple-500 transitiona-all duration-200`}
            />

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center bg-gray-800 dark:bg-grayt-600 px-3 py-1 rounded-lg">
              <span className={`text-sm ${textColor} mr-2`}>
                {TOKEN_SYMBOL}
              </span>
              <div className="w-6 h-6 pl-2 rounded-full flex items-center justify-center bg-gray-700 dark:bg-gray-500">
                <img
                  src="/logo.png"
                  alt={TOKEN_SYMBOL}
                  className="mr-3 w-4 h-4"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label
            className={`block ${secondaryTextColor} text-sm mb-2 font-medium`}
          >
            You Pay
          </label>
          <div className="relative">
            <input
              type="text"
              value={(parseInt(amount) * PER_TOKEN_SOL_PRICE).toFixed(3)}
              readOnly
              className={`w-full ${inputBg} ${textColor} rounded-lg border p-4`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center bg-gray-800 dark:bg-gray-600 px-3 py-1 rounded-lg">
              <span className={`text-sm ${textColor} mr-2`}>SOL</span>
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-700 dark:bg-gray-500">
                <img src="/solana.svg" alt="SOL" className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRightSideContent = () => {
    return (
      <div className="w-full lg:w-1/2 max-w-md mx-auto relative rounded-2xl  overflow-hidden z-10">
        {/* loading overlay */}
        {renderLoaderOverlay(isLoading)}

        {/* card glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl blur-lg opacity-20"></div>

        {/* card content */}
        {renderCardHeading(TOKEN_SYMBOL)}

        <div className="p-6">
          {renderInsufficientBalanceAlert(userSolBalance, MIN_SOL_BALANCE)}

          {/* price info */}
          {renderPriceInfoSection(
            PER_TOKEN_USD_PRICE,
            NEXT_PER_TOKEN_USD_PRICE
          )}

          {/* progress section */}
          {renderProgressSection()}

          {/* token price display */}
          {renderTokenPriceDisplay(TOKEN_SYMBOL, PER_TOKEN_SOL_PRICE, CURRENCY)}

          {/* Token selection */}
          {renderTokenSelection()}

          {/* Balance display */}
          {renderBalanceSection()}

          {/* amount inputs */}
          {renderTokenInputs()}

          {/* action buttons */}
          {renderActionButtons()}

          {/* refer a friend button */}
          {renderReferFriendButton()}

          {/* Help section */}
          {renderHelpSection(TOKEN_SYMBOL)}
        </div>
      </div>
    );
  };

  const renderLeftSideContent = () => {
    return (
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
        {/* status badge */}
        <div className="inline-block py-2 px-5 rounded-full bg-purple-500/10 mb-6 border border-purple-500/20">
          <p className="text-sm font-medium text-purple-500">
            Presale Live Now - Limited Time Offer
          </p>
        </div>

        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${textColor}`}
        >
          SOLANA
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500">
            &nbsp; ICO
          </span>
        </h1>

        <div className="relative mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500">
              Token Presale
            </span>
            <span className={textColor}> - Stage 1</span>
          </h2>

          <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full"></div>

          <p
            className={`${secondaryTextColor} text-base md:text-lg max-w-md mb-10 leading-relaxed`}
          >
            Join the future of blockchain innovation. Our revolutionary platform
            combines cutting-edge technology with decentralized finance to
            create a seamless eosystem for digital assets.
          </p>

          {/* features */}
          {renderFeaturesSetion()}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative w-full overflow-hidden ${bgColor}`}>
      {renderBgElements()}

      {/* main content */}
      <div className="max-w-[1024px] mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {renderLeftSideContent()}
          {renderRightSideContent()}
        </div>
      </div>

      {renderScrollToTopButton()}

      <Admin
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        wallet={wallet}
        isAdmin={isAdmin}
        loading={loading}
        icoData={icoData}
        amount={amount}
        userSolBalance={userSolBalance}
        // userTokenBalance={userTokenBalance}
        setAmount={setAmount}
        createIcoAta={createIcoAta}
        depositIco={depositIco}
        buyTokens={buyTokens}
        calculateProgressPercentage={calculateProgressPercentage}
      />
    </div>
  );
};

export default HeroSection;
