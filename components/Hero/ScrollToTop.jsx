import { Five } from "../SVG";

export const renderScrollToTopButton = () => {
  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-emerald-600 text-white shadow-lg shadow-purple-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Scroll to top"
      >
        <Five />
      </button>
    </div>
  );
};
