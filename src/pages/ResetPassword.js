import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const resetPassword = async () => {
    try {
      toast.loading();
      const response = await axios.post("/api/auth/reset-password", {
        password,
        token: params.token,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error("Expired or Invalid Link");
      }
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    // <div className="flex justify-center items-center h-screen">
    //   <div className="w-[400px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-300">
    //     <h1 className="font-semibold text-3xl text-primary">
    //       CHANGE YOUR PASSWORD
    //     </h1>

    //     <input
    //       type="password"
    //       className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
    //       placeholder="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //       value={password}
    //     />

    //     <input
    //       type="password"
    //       className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
    //       placeholder="confirm password"
    //       onChange={(e) => setConfirmPassword(e.target.value)}
    //       value={confirmpassword}
    //     />

    //     <div className="flex justify-between items-end">
    //       <button
    //         className="py-1 px-5 text-white bg-primary"
    //         onClick={resetPassword}
    //       >
    //         RESET PASSWORD
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50 bg-[url('https://i.pinimg.com/originals/e6/ec/a9/e6eca9e180b4d7d9767558a63843e20c.jpg')]">
        <div>
          <h3 className="text-4xl font-bold text-purple-600">
            Enter your New Password
          </h3>
        </div>
        <div className="w-full px-6 py-6 mt-12 overflow-hidden bg-transparent shadow-md sm:max-w-md sm:rounded-lg">
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
              onClick={resetPassword}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
