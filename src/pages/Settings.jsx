import { useState, useEffect } from "react";
import { Moon, Sun, Save } from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [settings, setSettings] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("settings")) || {
        baseUrl: "http://localhost:9090/api",
        pollingInterval: 60,
        refreshRate: 5,
        theme: localStorage.getItem("theme") || "dark",
      }
    );
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  // Theme handling
 
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    alert("Settings saved successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-5">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-teal-700 dark:text-teal-400 mb-6 tracking-tight">
          ⚙️ Dashboard Settings
        </h1>

        <div className="space-y-6">
          {/* Base URL */}
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
              API Base URL
            </label>
            <input
              type="text"
              name="baseUrl"
              value={settings.baseUrl}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Polling Interval */}
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
              Polling Interval (sec)
            </label>
            <input
              type="number"
              name="pollingInterval"
              value={settings.pollingInterval}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Theme Toggle */}
          {/* <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
            <div>
              <h3 className="text-sm text-gray-600 dark:text-gray-400">
                Theme Mode
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Current: {settings.theme === "dark" ? "Dark" : "Light"}
              </p>
            </div> */}
            {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {settings.theme === "dark" ? (
                <Sun className="text-yellow-400" size={20} />
              ) : (
                <Moon className="text-gray-800" size={20} />
              )}
            </button> */}
          {/* </div> */}

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-teal-700 dark:bg-teal-400 dark:text-gray-900 text-gray-100 font-semibold rounded-lg py-2 hover:bg-yellow-400 transition"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
