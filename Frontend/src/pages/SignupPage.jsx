import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ FIXED ENDPOINT
      const { data } = await api.post(
        "/api/auth/signup",
        formData
      );

      login(data);

      toast.success("Account created successfully");

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start chatting with powerful AI"
    >
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* NAME */}
        <div>
          <label className="text-sm text-slate-300">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            required
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            required
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-slate-300">Password</label>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 transition"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-slate-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-400 transition py-3 rounded-xl font-semibold"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      {/* LOGIN LINK */}
      <p className="text-center text-slate-400 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;