import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/campaigns/${id}`
        );
        setCampaign(res.data);
      } catch {
        alert("Failed to load campaign details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAISummary = async () => {
      try {
        const res = await axios.post(`http://localhost:8080/api/ai/summary`, {
          campaignId: id,
        });
        setSummary(res.data.summary);
      } catch {
        setSummary("Summary not available.");
      }
    };

    fetchCampaignDetails();
    fetchAISummary();
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-24 font-['Roboto']">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-gray-900 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-300 font-bold uppercase tracking-widest text-[10px]">Retrieving Intel...</p>
      </div>
    );

  if (!campaign)
    return (
      <div className="max-w-2xl mx-auto py-24 font-['Roboto']">
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-16 text-center shadow-sm">
          <p className="text-gray-300 font-bold uppercase tracking-widest text-xs">Record missing from ledger</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto font-['Roboto']">
      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/40 p-8 sm:p-12">
        <div className="flex flex-col items-center mb-12">
          <div className="p-3 bg-gray-50 rounded-2xl mb-4">
            <span className="text-3xl">📄</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight text-center">
            Campaign Brief
          </h2>
          <p className="text-gray-400 text-sm mt-1">Deployment specifications and results</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Target Segment</p>
            <p className="text-lg font-black text-gray-900">{campaign.segmentName}</p>
          </div>
          <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Audience Size</p>
            <p className="text-lg font-black text-gray-900">{campaign.audienceSize} users</p>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Message Payload</label>
            <div className="p-6 bg-white border border-gray-100 rounded-[2rem] text-gray-700 leading-relaxed shadow-sm">
              {campaign.message}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="px-6 py-4 bg-green-50/50 border border-green-100 rounded-2xl flex items-center justify-between">
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Delivered</span>
              <span className="text-sm font-black text-green-700">{campaign.sentCount}</span>
            </div>
            <div className="px-6 py-4 bg-red-50/50 border border-red-100 rounded-2xl flex items-center justify-between">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Failed</span>
              <span className="text-sm font-black text-red-600">{campaign.failedCount}</span>
            </div>
          </div>
        </div>

        <div className="p-8 bg-blue-50/30 border border-blue-100 rounded-[2rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">🤖</span>
          </div>
          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>✨</span> AI Insight Summary
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            {summary || "Strategic analysis is pending..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
