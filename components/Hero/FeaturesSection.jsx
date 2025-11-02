import { One, Two, Three, Four } from "../SVG";

export const renderFeaturesSetion = () => {
  const isDarkMode = true;
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-10">
      <div
        className={`px-3 py-3 rounded-xl ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } flex items-center`}
      >
        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
          <One />
        </div>
        <div>
          <p className={`text-xs text-gray-400`}>Early Access</p>
          <p className={`text-sm font-medium text-white`}>Limited presale</p>
        </div>
      </div>

      <div
        className={`px-4 py-3 rounded-3xl ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } flex items-center`}
      >
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-3">
          <Two />
        </div>
        <div>
          <p className={`text-xs text-gray-400`}>For You</p>
          <p className={`text-sm font-medium text-white`}>Exclusive Benefits</p>
        </div>
      </div>

      <div
        className={`px-4 py-3 rounded-3xl ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } flex items-center`}
      >
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-3">
          <Three />
        </div>

        <div>
          <p className={`text-xs text-gray-400`}>Low Starting</p>
          <p className={`text-sm font-medium text-white`}>Special Price</p>
        </div>
      </div>

      <div
        className={`px-4 py-3 rounded-3xl ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } flex items-center`}
      >
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-3">
          <Four />
        </div>

        <div>
          <p className={`text-xs text-gray-400`}>Earn More</p>
          <p className={`text-sm font-medium text-white`}>Referral Program</p>
        </div>
      </div>
    </div>
  );
};
