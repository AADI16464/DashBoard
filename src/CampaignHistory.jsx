import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: "c1",
      name: "Spring Sale",
      segment: "Inactive Users",
      sentDate: "2025-05-15",
      status: "Sent",
    },
    {
      id: "c2",
      name: "Welcome Campaign",
      segment: "New Users",
      sentDate: "2025-05-20",
      status: "Scheduled",
    },
    {
      id: "c3",
      name: "Holiday Discount",
      segment: "All Users",
      sentDate: "2025-06-01",
      status: "Draft",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/campaigns");
        setCampaigns(res.data || []);
      } catch {
        alert("Failed to load campaign history.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/campaign/${id}`);
  };

  return (
    <div className="w-full font-['Roboto']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl">
              <span className="text-xl">📋</span>
            </div>
            Campaign Ledger
          </h2>
          <p className="text-gray-400 text-sm mt-1">Audit log of all deployments</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Count: <span className="text-gray-900">{campaigns.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-gray-100 border-t-gray-900 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300 font-bold uppercase tracking-widest text-[10px]">Syncing Data...</p>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-16 text-center shadow-sm">
          <p className="text-gray-300 font-bold uppercase tracking-widest text-xs">No records found</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-gray-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Identity</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Audience</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Timestamp</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {campaigns
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <span className="text-[11px] font-mono font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">
                          #{campaign.id.slice(-6).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-gray-900">{campaign.segmentName}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-2">
                          <div className="px-2.5 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-green-600 border border-gray-100">
                            {campaign.sentCount} OK
                          </div>
                          <div className="px-2.5 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-red-400 border border-gray-100">
                            {campaign.failedCount} ERR
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-xs text-gray-500 font-medium">
                          {new Date(campaign.createdAt).toLocaleDateString()}
                          <span className="block text-[10px] text-gray-300 font-bold uppercase mt-0.5">{new Date(campaign.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => handleViewDetails(campaign.id)}
                          className="px-5 py-2 bg-white border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all text-[10px] font-black uppercase tracking-widest shadow-sm"
                        >
                          View
                        </button>
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

export default CampaignHistory;
