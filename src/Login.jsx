import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import './index.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      if (decoded.email_verified) {
        const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
        const user = {
          name: decoded.name || existingUser.name || "",
          email: decoded.email,
          picture: decoded.picture || "",
          age: existingUser.age || "",
          gender: existingUser.gender || "",
          address: existingUser.address || "",
        };
        login(credentialResponse.credential, user);
        if (!user.name || !user.age || !user.gender || !user.address) {
          navigate("/edit-profile");
        } else {
          navigate("/");
        }
      } else {
        alert("Please verify your email before logging in.");
      }
    } catch {
      alert("Login failed during decoding");
    }
  };

  const handleLoginError = () => {
    alert("Google Login Failed. Please try again.");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      const savedUser = JSON.parse(localStorage.getItem("manualUser") || "{}");
      if (
        savedUser?.email === form.email &&
        savedUser?.password === form.password
      ) {
        login("manual-token", savedUser);
        navigate("/");
      } else {
        alert("Invalid credentials. Try again or use Google login.");
      }
    } else {
      if (form.password !== form.confirmPassword) {
        return alert("Passwords do not match!");
      }
      const newUser = {
        name: form.name,
        age: form.age,
        dob: form.dob,
        address: form.address,
        email: form.email,
        password: form.password,
        gender: "",
      };
      localStorage.setItem("manualUser", JSON.stringify(newUser));
      alert("Account created. You can now log in.");
      setMode("login");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex flex-col items-center justify-center p-6 font-['Roboto']">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-white border border-gray-100 p-3 rounded-2xl shadow-sm mb-4">
            <img src="/logo.png" alt="Xeno Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">Xeno</h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">CRM & Analytics Hub</p>
        </div>

        <div className="bg-white border border-gray-100 p-10 sm:p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/40">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold text-gray-900">
              {mode === "login" ? "Welcome Back" : "Get Started"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">Please enter your details</p>
          </div>

          <form onSubmit={handleManualSubmit} className="space-y-5">
            {mode !== "login" && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none"
                  />
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 outline-none"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none"
                />
              </div>
            )}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-5 pr-14 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-[10px] font-bold text-gray-400 cursor-pointer select-none hover:text-blue-500 transition-colors"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>
            {mode !== "login" && (
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full pl-5 pr-14 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none"
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-4 text-[10px] font-bold text-gray-400 cursor-pointer select-none hover:text-blue-500 transition-colors"
                >
                  {showConfirm ? "HIDE" : "SHOW"}
                </span>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-lg shadow-gray-200 transition-all active:scale-[0.98]"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative text-[10px] font-bold text-gray-300 bg-white px-4 text-center uppercase tracking-widest">or</div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} width="100%" theme="outline" size="large" shape="pill" text="continue_with" />
          </div>

          <div className="text-center mt-10 text-sm">
            <span className="text-gray-400">
              {mode === "login" ? "New here?" : "Joined us before?"}
            </span>{" "}
            <span
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-gray-900 font-bold cursor-pointer hover:underline underline-offset-4 decoration-gray-200"
            >
              {mode === "login" ? "Create Account" : "Sign In"}
            </span>
          </div>
        </div>
        
        <p className="text-center mt-12 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Xeno Analytics
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
