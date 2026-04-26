import React, { useEffect, useState } from "react";
import axios from "axios";

const SegmentPreview = () => {
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rules = JSON.parse(localStorage.getItem("segmentRules"));
    const logic = localStorage.getItem("segmentLogic");

    const fetchPreview = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/segments/preview",
          { rules, logic }
        );
        setPreviewData(response.data.users || []);
      } catch {
        alert("Failed to fetch preview data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, []);

  return (
    <div className="w-full font-['Roboto']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl">
              <span className="text-xl">👥</span>
            </div>
            Audience Sample
          </h2>
          <p className="text-gray-400 text-sm mt-1">Live preview of matching customers</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Sample Size: <span className="text-gray-900">{previewData.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-gray-100 border-t-gray-900 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300 font-bold uppercase tracking-widest text-[10px]">Filtering Database...</p>
        </div>
      ) : previewData.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-16 text-center shadow-sm">
          <p className="text-gray-300 font-bold uppercase tracking-widest text-xs">No matching profiles found</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-gray-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Spend</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Visits</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {previewData.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-gray-900">{user.name}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm text-gray-500 font-medium">{user.email}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        ₹{user.totalSpend}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">
                        {user.visits}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-xs text-gray-400 font-medium">
                        {user.lastActive}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentPreview;
