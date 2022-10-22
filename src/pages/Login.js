import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const { loading } = useSelector((state) => state.alerts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(loading);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async () => {
    const userObj = {
      password,
      email,
    };
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/auth/login", userObj);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("user", response.data.data);
        navigate("/");
      } else {
        dispatch(hideLoading());

        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  const sendResetPasswordLink = async () => {
    try {
      toast.loading("");
      const response = await axios.post("/api/auth/send-password-reset-link", {
        email,
      });
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        setShowForgotPassword(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" bg-[url('https://i.pinimg.com/originals/e6/ec/a9/e6eca9e180b4d7d9767558a63843e20c.jpg')]">
      {/* {!showForgotPassword && (
        <div className="w-[400px] flex space-y-5 flex-col shadow-lg border border-gray-300">
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
          </a>

          <div className="flex flex-col space-y-5 p-5">
            <input
              type="text"
              className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="py-1 px-5 text-white bg-primary"
              onClick={loginUser}
            >
              LOGIN
            </button>
            <div className="flex justify-between items-end">
              <div className="flex space-x-10">
                <Link className="underline text-primary" to="/register">
                  Click Here To Register
                </Link>
                <h1
                  className="underline text-primary cursor-pointer"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password
                </h1>
              </div>
            </div>
          </div>
        </div>
        
      )} */}
      {!showForgotPassword && (
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50 bg-[url('https://i.pinimg.com/originals/e6/ec/a9/e6eca9e180b4d7d9767558a63843e20c.jpg')]">
          <div>
            <h3 className="text-4xl font-bold text-purple-600">
              Welcome Back !
            </h3>
          </div>
          <div className="w-full px-6 py-6 mt-12 overflow-hidden bg-transparent shadow-md sm:max-w-md sm:rounded-lg">
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

            <div className="flex items-center justify-end mt-4">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                onClick={loginUser}
              >
                Login
              </button>
            </div>
            <div className="mt-4 text-purple-500">
              <u>
                New user ?
                <span>
                  <a
                    className=" text-purple-800 hover:underline"
                    href="/register"
                  >
                    Register
                  </a>
                </span>
              </u>
            </div>
            <div className="mt-4 text-purple-800 cursor-pointer">
              <u onClick={() => setShowForgotPassword(true)}>
                Forget Password ..?
              </u>
            </div>
          </div>
        </div>
      )}

      {/* {showForgotPassword && (
        <div className="flex flex-col space-y-5 w-[400px]">
          <h1 className="font-semibold text-3xl text-primary">
            Enter your email
          </h1>
          <input
            type="text"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="flex flex-col justify-between items-end space-y-5">
            <button
              className="py-1 px-5 text-white bg-primary w-full"
              onClick={sendResetPasswordLink}
            >
              SEND RESET PASSWORD LINK
            </button>
            <h1
              onClick={() => setShowForgotPassword(false)}
              className="cursor-pointer underline text-md text-primary text-left"
            >
              Click Here To Login
            </h1>
          </div>
        </div>
      )} */}
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50 bg-[url('https://i.pinimg.com/originals/e6/ec/a9/e6eca9e180b4d7d9767558a63843e20c.jpg')]">
        <div>
          <h3 className="text-4xl font-bold text-purple-600">
            Enter Your E-mail
          </h3>
        </div>
        <div className="w-full px-6 py-6 mt-12 overflow-hidden bg-transparent shadow-md sm:max-w-md sm:rounded-lg">
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

          <div className="flex items-center justify-end mt-4">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              onClick={sendResetPasswordLink}
            >
              Send Reset Password Link
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

export default Login;
