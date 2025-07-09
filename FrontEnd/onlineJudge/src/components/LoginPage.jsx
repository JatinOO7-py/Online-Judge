import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#e9dad2] text-white overflow-hidden">
      <header className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center">
          <img
            src="/HackathonHub.png"
            alt="HackathonHub Logo"
            className="h-8 w-8 mr-2"
          />
          <div className="text-2xl font-bold">HackathonHub</div>
        </div>
        <Link
          to="/online-compiler"
          className="group flex items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Online Compiler
        </Link>
      </header>
      <main className="flex w-full h-screen ">
        <div className="w-2/5 flex items-center justify-center p-10 bg-gray-800 h-full">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold">Welcome!</h2>
              <p className="mt-2 text-sm">
                Access your account in seconds.
                <br /> Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-500 hover:text-blue-400"
                >
                  Sign up
                </Link>
                .
              </p>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <img
                        src="https://www.svgrepo.com/show/348348/eye-crossed.svg"
                        alt="Hide Password"
                        className="h-5 w-5 text-gray-500"
                      />
                    ) : (
                      <img
                        src="https://www.svgrepo.com/show/103061/eye.svg"
                        alt="Show Password"
                        className="h-5 w-5 text-gray-500"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-500 hover:text-blue-400"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in to your account
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-4/10 flex items-center justify-center bg-[#e8d9d4] h-full">
          <img
            src="/Stu.jpg"
            alt="Illustration"
            className="h-auto max-h-full w-full"
          />
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
