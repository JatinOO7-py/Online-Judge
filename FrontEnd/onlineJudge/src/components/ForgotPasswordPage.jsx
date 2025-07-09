import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await forgotPassword(email);
      setSuccess("Password reset link sent to your email.");
      setError(null);
      console.log("Forgot password successful:", response);
    } catch (err) {
      setError("Error sending password reset email.");
      setSuccess(null);
      console.error("Forgot password error:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#e9dad2] text-white overflow-hidden">
      <header className="flex items-center justify-between p-4 bg-gray-800">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
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
              <h2 className="mt-6 text-3xl font-extrabold">Forgot Password</h2>
              <p className="mt-2 text-sm">
                Enter your email address to reset your password.
              </p>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-500 text-sm">{success}</div>}
            <form
              className="mt-8 space-y-6"
              onSubmit={handleForgotPasswordSubmit}
            >
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="forgot-password-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="forgot-password-email"
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
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send reset link
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-4/10 flex items-center justify-center bg-[#e8d9d4] h-full">
          <img
            src="/1.png"
            alt="Illustration"
            className="h-auto max-h-full w-full"
          />
        </div>
      </main>
    </div>
  );
}

export default ForgotPasswordPage;
