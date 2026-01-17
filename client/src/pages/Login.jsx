import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      navigate("/product-list");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header variant="auth" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold tracking-wide flex items-center justify-center gap-2">
            <span>FITZDO</span>

            <span className="font-bold text-xl leading-none">|</span>

            <span
              className="text-6xl italic font-normal translate-y-1"
              style={{ fontFamily: "'Allura', cursive" }}
            >
              Circle
            </span>
          </h1>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-6">Login to your Account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email - ID <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email - ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 border border-gray-400 px-3 outline-none focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Enter Your Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 border border-gray-400 px-3 pr-10 outline-none focus:border-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="relative inline-block">
              <div className="absolute inset-0 border border-black translate-x-1 translate-y-1"></div>

              <button
                type="submit"
                disabled={loading}
                className="relative bg-black text-white px-6 py-2 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="mt-6 text-sm text-center text-gray-700">
              <span>New user?</span>{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4 transition"
              >
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
