import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateSegment = () => {
  const navigate = useNavigate();
  const [segmentName, setSegmentName] = useState("");
  const [rules, setRules] = useState([{ field: "", operator: "", value: "" }]);
  const [logic, setLogic] = useState("AND");
  const [audienceSize, setAudienceSize] = useState(null);
  const resultRef = useRef(null);

  const handleRuleChange = (index, key, value) => {
    const updated = [...rules];
    updated[index][key] = value;
    setRules(updated);
  };

  const addRule = () => {
    setRules([...rules, { field: "", operator: "", value: "" }]);
  };

  const previewAudience = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/segments/preview", {
        rules,
        logic,
      });
      setAudienceSize(res.data.size);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      alert("Failed to preview audience.");
    }
  };

  const saveSegment = async () => {
    try {
      await axios.post("http://localhost:8080/api/segments", {
        name: segmentName,
        rules,
        logic,
      });
      navigate("/campaign-form");
    } catch {
      alert("Failed to save segment.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto font-['Roboto']">
      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/40 p-8 sm:p-12">
        <div className="flex flex-col items-center mb-12">
          <div className="p-3 bg-gray-50 rounded-2xl mb-4">
            <span className="text-3xl">🎯</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight text-center">
            Audience Creation
          </h2>
          <p className="text-gray-400 text-sm mt-1">Define your target group</p>
        </div>

        <div className="space-y-10">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1">Segment Name</label>
            <input
              type="text"
              placeholder="e.g. VIP Summer Shoppers"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Conditions</label>
            <div className="space-y-4">
              {rules.map((rule, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-3 p-5 bg-gray-50/50 border border-gray-100 rounded-2xl transition-all hover:bg-white hover:shadow-md hover:shadow-gray-100">
                  <select
                    value={rule.field}
                    onChange={(e) => handleRuleChange(index, "field", e.target.value)}
                    className="flex-1 p-3.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/10 text-gray-900 text-sm outline-none"
                  >
                    <option value="">Field</option>
                    <option value="spend">Spend</option>
                    <option value="visits">Visits</option>
                    <option value="inactiveDays">Inactivity</option>
                  </select>

                  <select
                    value={rule.operator}
                    onChange={(e) => handleRuleChange(index, "operator", e.target.value)}
                    className="flex-1 p-3.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/10 text-gray-900 text-sm outline-none"
                  >
                    <option value="">Operator</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value="=">=</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Value"
                    value={rule.value}
                    onChange={(e) => handleRuleChange(index, "value", e.target.value)}
                    className="flex-1 p-3.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/10 text-gray-900 text-sm outline-none placeholder:text-gray-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={addRule}
            className="w-full py-4 bg-white border border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            <span>+</span> Add Condition
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-gray-50 border border-gray-100 rounded-2xl">
            <label className="text-gray-400 font-bold text-xs uppercase tracking-widest">Logic Flow</label>
            <div className="flex bg-white p-1 rounded-xl border border-gray-100">
              <button
                onClick={() => setLogic("AND")}
                className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all ${logic === "AND" ? "bg-gray-900 text-white shadow-lg" : "text-gray-300 hover:text-gray-500"}`}
              >
                AND
              </button>
              <button
                onClick={() => setLogic("OR")}
                className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all ${logic === "OR" ? "bg-gray-900 text-white shadow-lg" : "text-gray-300 hover:text-gray-500"}`}
              >
                OR
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <button
              onClick={previewAudience}
              className="w-full py-4 bg-white border border-gray-100 text-gray-900 rounded-2xl font-bold transition-all hover:bg-gray-50 text-sm"
            >
              Preview Audience
            </button>

            <button
              onClick={saveSegment}
              className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all active:scale-[0.98] text-sm shadow-xl shadow-gray-200"
            >
              Save Segment
            </button>
          </div>

          {audienceSize !== null && (
            <div
              ref={resultRef}
              className="mt-6 p-5 bg-blue-50 border border-blue-100 rounded-2xl text-blue-600 font-bold text-center text-sm animate-pulse"
            >
              Estimated Reach: {audienceSize} users
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateSegment;
