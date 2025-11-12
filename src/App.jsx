import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ApisPage from "./pages/ApisPage";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <div className="min-h-screen transition-colors duration-300  dark:text-darkText bg-gray-50 dark:bg-[#0f1117] ">
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/apis" element={<ApisPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    </div>
  );
}
