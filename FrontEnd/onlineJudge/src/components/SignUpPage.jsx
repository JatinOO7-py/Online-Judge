import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";

function SignUpPage() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    programmingLanguage: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signUp(formData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/login");
      console.log("Registration successful:", response);
    } catch (err) {
      setError("Registration failed");
      console.error("Registration error:", err);
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
      <main className="flex w-full h-screen">
        <div className="w-2/5 flex items-center justify-center p-10 bg-gray-800 h-full">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold">
                Create an account
              </h2>
              <p className="mt-2 text-sm">
                Start your website in seconds.
                <br /> Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-500 hover:text-blue-400"
                >
                  Sign in
                </Link>
                .
              </p>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="userName" className="sr-only">
                    Username
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
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
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
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
                <div>
                  <label htmlFor="programmingLanguage" className="sr-only">
                    Preferred Programming Language
                  </label>
                  <select
                    id="programmingLanguage"
                    name="programmingLanguage"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    value={formData.programmingLanguage}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select your preferred programming language
                    </option>
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-4/10 flex items-center justify-center bg-[#e8d9d4] h-full">
          <img
            src="/2.png"
            alt="Illustration"
            className="h-auto max-h-full w-full"
          />
        </div>
      </main>
    </div>
  );
}

export default SignUpPage;
