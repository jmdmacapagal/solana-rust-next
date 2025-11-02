import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Six, Seven } from "./SVG/index";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { title: "Home", path: "#home", isScrollspy: true },
    { title: "Ico Chart", path: "#chart", isScrollspy: true },
    { title: "Roadmap", path: "#roadmap", isScrollspy: true },
    { title: "Features", path: "#features", isScrollspy: true },
    { title: "About", path: "#about", isScrollspy: true },
  ];

  const handleScrollSpy = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header-area">
      <div
        className={`xb-header ${
          isSticky ? "sticky" : ""
        } bg-gray-900 border-b border-gray-800`}
        style={{
          backdropFilter: isSticky ? "blur(10px)" : "none",
          backgroundColor: isSticky
            ? "rgba(17, 24, 39, 0.85)"
            : "rgb(17, 24, 39)",
        }}
      >
        <div className="container mx-auto">
          <div className="header__wrap ul_li_between flex items-center justify-between p-4">
            <div className="header-logo">
              <Link href="/">
                <div className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={70}
                    height={40}
                    priority
                  />
                  <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-emerald-500">
                    Solaris
                  </span>
                </div>
              </Link>
            </div>

            <div className="main-menu__wrap ul_li navbar navbar-expand-lg hidden lg:block">
              <nav className={`main-menu ${isMobileMenuOpen ? "show" : ""}`}>
                <ul className="flex space-x-8">
                  {menuItems.map((item, index) => (
                    <li key={index} className="relative group">
                      {item.isScrollspy ? (
                        <a
                          href={item.path}
                          className="scrollspy-btn text-gray-300 hover:text-white transition-colors duration-300 py-2 px-1 font-medium"
                          onClick={(e) => handleScrollSpy(e, item.path)}
                        >
                          <span>{item.title}</span>
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                      ) : (
                        <Link
                          href={item.path}
                          className="text-gray-300 hover:text-white transition-colors duration-300 py-2 px-1 font-medium"
                        >
                          <span>{item.title}</span>
                          <span className="absolute -bottom-1 left-0 w-0 h-0,5 bg-gradient-to-r from-purple-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="header-btn ul_li flex items-center space-x-4">
              {mounted && (
                <div className="wallet-button-wrapper">
                  <WalletMultiButton className="wallet-button" />
                  <style jsx>{`
                    :global(.wallet-adapter-button) {
                      background: linear-gradient(
                        to right,
                        rgb(168, 85, 247),
                        rgb(16, 185, 129)
                      ) !important;
                      transition: all 0.3s ease;
                      border-radius: 0.5rem !important;
                      padding: 0.75rem 1.25rem !important;
                    }
                    :global(.wallet-adapter-button:hover) {
                      background: linear-gradient(
                        to right,
                        rgb(147, 51, 234),
                        rgb(5, 150, 105)
                      ) !important;
                      transform: translateY(-2px);
                      box-shadow: 0 8px 20px rgba(147, 51, 231, 0.2);
                    }
                    :global(.wallet-adapter-button-trigger) {
                      background: linear-gradient(
                        to right,
                        rgb(168, 85, 247),
                        rgb(16, 185, 129)
                      ) !important;
                    }
                  `}</style>
                </div>
              )}
              <div className="header-bar-mobile lg:hidden">
                <button
                  className="xb-nav-mobile text-white p-2 focust:outline-none"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle Menu"
                >
                  {isMobileMenuOpen ? <Seven /> : <Six />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu bg-gray-900 overflow-hidden transition-all duration-500 lg:hidden">
          <div className="container mx-auto p-4">
            <ul className="flex flex-col space-y-4">
              {menuItems.map((item, index) => (
                <li key={index} className="border-b border-gray-800 pb-2">
                  {item.isScrollspy ? (
                    <a
                      href={item.path}
                      className="scrollspy-btn text-gray-300 hover:text-purple-500 transition-colors duration-300 block py-2"
                      onClick={(e) => handleScrollSpy(e, item.path)}
                    >
                      <span>{item.title}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-gray-300 hover:text-purple-500 transition-colors duration-300 block py-2"
                    >
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
