import { motion } from "framer-motion";

import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

      {/* NAVBAR */}

      <nav className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 bg-[#020617]/80">

        <Link
          to="/"
          className="text-2xl font-bold flex items-center gap-2"
        >
          <Sparkles className="text-cyan-400" />

          AI SaaS
        </Link>

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition"
          >
            Get Started
          </Link>

        </div>
      </nav>

      {/* HERO */}

      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28">

        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold max-w-5xl leading-tight relative z-10"
        >
          Your Premium AI Workspace For Modern Productivity
        </motion.h1>

        <p className="mt-8 text-slate-400 max-w-2xl text-lg relative z-10">
          Build, create, research, and automate workflows
          using powerful AI conversations.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 mt-10 relative z-10">

          <Link
            to="/signup"
            className="px-8 py-4 rounded-2xl bg-cyan-500 hover:scale-105 transition flex items-center justify-center gap-2"
          >
            Start Free

            <ArrowRight size={20} />
          </Link>

          <Link
            to="/login"
            className="px-8 py-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
          >
            Login
          </Link>

        </div>

      </section>

    </div>
  );
};

export default LandingPage;