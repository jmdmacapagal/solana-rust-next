import { AiOutlineQuestionCircle } from "react-icons/ai";

export const renderHelpSection = (tokenSymbol) => {
  const isDarkMode = true;

  return (
    <div
      className={`p-4 rounded-lg ${
        isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
      }`}
    >
      <div className="flex items-center mb-3">
        <AiOutlineQuestionCircle className="mr-2 text-purple-500" size={18} />
        <h4 className={`font-medium text-white`}>Need Help?</h4>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <a
          href="#chart"
          className={`text-gray-400 hover:text-purple-500 flex items-center text-xs transition-colors duration-200 py-1`}
        >
          <span className="mr-1 text-purple-500">-</span>
          How to Buy Guide
        </a>
        <a
          href="#about"
          className={`text-gray-400 hover:text-purple-500 flex items-center text-xs transition-colors duration-200 py-1`}
        >
          <span className="mr-1 text-purple-500">-</span>
          About {tokenSymbol}
        </a>

        <a
          href="#chart"
          className={`text-gray-400 hover:text-purple-500 flex items-center text-xs transition-colors duration-200 py-1`}
        >
          <span className="mr-1 text-purple-500">-</span>
          Token Information
        </a>

        <a
          href="#chart"
          className={`text-gray-400 hover:text-purple-500 flex items-center text-xs transition-colors duration-200 py-1`}
        >
          <span className="mr-1 text-purple-500">-</span>
          Frequently Asked Questions
        </a>
      </div>
    </div>
  );
};
