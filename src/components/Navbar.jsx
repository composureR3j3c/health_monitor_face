// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Sun, Moon, Search, Menu, X } from "lucide-react";

export default function Navbar() {
  // const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  return (
    <nav
      className={`flex items-center justify-between px-6 py-3 shadow-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-2">
          <img src="/Mlogo.png" alt="Logo" className="h-8 rounded-full " />
        </a>
        <span className="font-bold text-xl">Health Watch</span>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        <a href="/apis" className="hover:text-blue-500 transition">
          APIs
        </a>
        <a href="/" className="hover:text-blue-500 transition">
          Metrics
        </a>
        <a href="#logs" className="hover:text-blue-500 transition">
          Logs
        </a>
        <a href="#settings" className="hover:text-blue-500 transition">
          Settings
        </a>
      </div>

      {/* Search + Theme toggle */}
      <div className="hidden md:flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2 top-2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-1 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-darkBg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        <img
          src="logo.png"
          alt="User"
          className="h-8 w-8 rounded-full cursor-pointer"
        />
      </div>

      {/* Mobile menu */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-200"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {menuOpen && (
        <div
          className={`absolute top-16 left-0 w-full ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
          } flex flex-col items-center gap-4 py-4 shadow-md md:hidden z-10`}
        >
          <a href="/apis" onClick={() => setMenuOpen(false)}>
            APIs
          </a>
          <a href="/" onClick={() => setMenuOpen(false)}>
            Metrics
          </a>
          <a href="#logs" onClick={() => setMenuOpen(false)}>
            Logs
          </a>
          <a href="#settings" onClick={() => setMenuOpen(false)}>
            Settings
          </a>
          <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-darkBg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        </div>
      )}
    </nav>
  );
}
