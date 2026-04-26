import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ import the auth hook

const EditProfile = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login method from context

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [profile, setProfile] = useState({
    name: storedUser.name || "",
    age: storedUser.age || "",
    dob: storedUser.dob || "",
    gender: storedUser.gender || "",
    address: storedUser.address || "",
    email: storedUser.email || "", // read-only
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(profile));
    login(); // ✅ update auth context in case it's needed
    alert("Profile updated successfully!");
    navigate("/"); // ✅ Redirect to dashboard
  };

  return (
    <div className="max-w-xl mx-auto font-['Roboto']">
      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/40 p-8 sm:p-12">
        <div className="flex flex-col items-center mb-12">
          <div className="p-3 bg-gray-50 rounded-2xl mb-4">
            <span className="text-3xl">✏️</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight text-center">
            Update Profile
          </h2>
          <p className="text-gray-400 text-sm mt-1">Manage your account details</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Age</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* DOB */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Birth Date</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 outline-none"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Location</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              rows={2}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none resize-none"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-3 ml-1">Email (Restricted)</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-300 cursor-not-allowed italic text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-5 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all active:scale-[0.98] shadow-xl shadow-gray-200 mt-4"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
