import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
        <div className="flex items-center">
          <img
            src="/HackathonHub.png"
            alt="HackathonHub Logo"
            className="h-8 w-8 mr-2"
          />
          <Link to="/home" className="text-2xl font-bold">
            HackathonHub
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <img
              src="/add_problem.png"
              alt="Add Problem Icon"
              className="h-6 w-6"
            />
            <Link to="/add-problem" className="hover:text-gray-400">
              Add Problem
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="/my_problems.png"
              alt="My Problems Icon"
              className="h-6 w-6"
            />
            <Link to="/my-problems" className="hover:text-gray-400">
              My Problems
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="/online_compiler.png"
              alt="Online Compiler Icon"
              className="h-6 w-6"
            />
            <Link to="/online-compiler" className="hover:text-gray-400">
              Online Compiler
            </Link>
          </div>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 hover:text-gray-400">
              <img
                src="/account_icon.png"
                alt="Account Icon"
                className="h-6 w-6"
              />
              <span>Account</span>
              <ChevronDownIcon className="w-5 h-5" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? "bg-gray-600" : ""
                      } flex items-center px-4 py-2 text-sm`}
                    >
                      <img
                        src="/profile_icon.png"
                        alt="Profile Icon"
                        className="h-5 w-5 mr-2"
                      />
                      My Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/edit-profile"
                      className={`${
                        active ? "bg-gray-600" : ""
                      } flex items-center px-4 py-2 text-sm`}
                    >
                      <img
                        src="/edit_icon.png"
                        alt="Edit Icon"
                        className="h-5 w-5 mr-2"
                      />
                      Edit Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? "bg-gray-600" : ""
                      } flex items-center w-full text-left px-4 py-2 text-sm`}
                    >
                      <img
                        src="/logout_icon.png"
                        alt="Logout Icon"
                        className="h-5 w-5 mr-2"
                      />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
