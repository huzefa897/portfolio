import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 text-white">
        {/* Top glow */}
        <div className="pointer-events-none fixed inset-x-0 top-[-120px] h-[280px] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.35),transparent_60%)]" />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
