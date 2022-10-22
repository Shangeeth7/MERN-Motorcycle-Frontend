import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const { loading } = useSelector((state) => state.alerts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {
    if (password === confirmPassword) {
      const userObj = {
        name,
        password,
        email,
        confirmPassword,
      };
      try {
        dispatch(showLoading());
        const response = await axios.post("/api/auth/register", userObj);
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message, {
            duration: 5000,
          });
          toast(" Redirecting to Login Page  ", {
            duration: 2000,
          });
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());

        toast.error("Something went wrong");
      }
    } else {
      toast.error("Passwords Not Matched");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50 bg-[url('https://i.pinimg.com/originals/e6/ec/a9/e6eca9e180b4d7d9767558a63843e20c.jpg')]">
        <div>
          <h3 className="text-4xl font-bold text-purple-600">
            Hello, Nice to Meet YA !
          </h3>
        </div>
        <div className="w-full px-6 py-6 mt-12 overflow-hidden bg-transparent shadow-md sm:max-w-md sm:rounded-lg">
          <div>
            <label className="block  text-sm font-medium text-gray-700 undefined">
              Name
            </label>
            <div className="flex  flex-col items-start">
              <input
                type="text"
                name="name"
                className="block h-10 w-full pl-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 undefined">
              Email
            </label>
            <div className="flex flex-col items-start">
              <input
                type="text"
                name="email"
                className="block h-10 w-full pl-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 undefined">
              Password
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="password"
                className="block h-10 w-full pl-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 undefined">
              Confirm Password
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="password_confirmation"
                className="block h-10 w-full pl-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              onClick={registerUser}
            >
              Register
            </button>
          </div>
          <div className="mt-4 text-purple-700">
            <u>
              Already have an account ?
              <span>
                <a className="text-white hover:underline" href="/login">
                  Log in
                </a>
              </span>
            </u>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
