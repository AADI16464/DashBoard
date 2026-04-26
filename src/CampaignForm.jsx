import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CampaignForm = () => {
  const [segments, setSegments] = useState([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState("");
  const [message, setMessage] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/segments");
        setSegments(res.data || []);
      } catch {
        alert("Failed to load segments.");
      }
    };

    fetchSegments();
  }, []);

  const handleAISuggestions = async () => {
    setAiLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/ai/messages", {
        objective: "bring back inactive users",
      });
      setAiSuggestions(res.data.suggestions || []);
    } catch {
      alert("Failed to fetch AI suggestions.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedSegmentId || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/campaigns", {
        segmentId: selectedSegmentId,
        message,
      });
      navigate("/campaign-history");
    } catch {
      alert("Campaign submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto font-['Roboto']">
      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/40 p-8 sm:p-12">
        <div className="flex flex-col items-center mb-12">
          <div className="p-3 bg-gray-50 rounded-2xl mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight text-center">
            Launch Campaign
          </h2>
          <p className="text-gray-400 text-sm mt-1">Deploy message to segment</p>
        </div>

        <div className="space-y-10">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1">Target Segment</label>
            <select
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 outline-none"
              value={selectedSegmentId}
              onChange={(e) => setSelectedSegmentId(e.target.value)}
            >
              <option value="">Select Audience</option>
              {segments.map((segment) => (
                <option key={segment.id} value={segment.id}>
                  {segment.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4 ml-1">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest">Message Content</label>
              <button
                onClick={handleAISuggestions}
                disabled={aiLoading}
                className="text-[10px] font-black text-blue-500 hover:text-blue-600 uppercase tracking-widest flex items-center gap-1.5 transition-all"
              >
                <span>✨</span> {aiLoading ? "ANALYZING..." : "AI SUGGEST"}
              </button>
            </div>
            <textarea
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none resize-none"
              rows={5}
              placeholder="Hi [Name], check out our new collection!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {aiSuggestions.length > 0 && (
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest ml-1">AI Drafts</label>
              <div className="grid grid-cols-1 gap-2">
                {aiSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(suggestion)}
                    className="text-left p-4 bg-blue-50/30 border border-blue-100/50 hover:bg-white hover:border-blue-300 rounded-2xl text-sm text-gray-600 transition-all active:scale-[0.99]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-bold text-white transition-all active:scale-[0.98] shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-black shadow-gray-200"
            }`}
          >
            {loading ? "DEPLOYING..." : "LAUNCH CAMPAIGN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
