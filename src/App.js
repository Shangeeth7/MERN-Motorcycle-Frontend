import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import "./index.css";
import { useSelector } from "react-redux";
import ApplyDoctor from "./pages/ApplyDoctor";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border">
            <div class="flex justify-center items-center">
              <div
                class="spinner-border  text-purple-500 animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span class="visually-hidden text-3xl">🛞</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoutes>
              <ApplyDoctor />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
        <Route
          path="/verifyemail/:token"
          element={
            <PublicRoutes>
              <VerifyEmail />
            </PublicRoutes>
          }
        />

        <Route
          path="/resetpassword/:token"
          element={
            <PublicRoutes>
              <ResetPassword />
            </PublicRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export function ProtectedRoutes({ children }) {
  const user = localStorage.getItem("user");
  if (user !== "" && user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export function PublicRoutes({ children }) {
  const user = localStorage.getItem("user");
  if (user !== "" && user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default App;
