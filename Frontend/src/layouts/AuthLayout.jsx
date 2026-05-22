import { motion } from "framer-motion";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center overflow-hidden relative px-6">

      {/* Gradient Blur */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold">{title}</h1>

            <p className="text-slate-400 mt-3">
              {subtitle}
            </p>
          </div>

          {children}

        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;