import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Layers, Megaphone, Clock, TrendingUp, Mail, MessageCircle, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useAuth } from "./AuthContext";

const DashboardOverview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const campaignData = [
    { name: "Jan", campaigns: 4, sent: 1200 },
    { name: "Feb", campaigns: 6, sent: 1800 },
    { name: "Mar", campaigns: 8, sent: 2400 },
    { name: "Apr", campaigns: 5, sent: 1500 },
    { name: "May", campaigns: 9, sent: 2800 },
    { name: "Jun", campaigns: 7, sent: 2100 },
  ];

  const segmentData = [
    { name: "Active Users", value: 450 },
    { name: "Inactive Users", value: 180 },
    { name: "New Users", value: 120 },
    { name: "VIP Customers", value: 85 },
  ];

  const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"];

  const recentActivity = [
    { id: 1, type: "campaign", message: "Spring Sale campaign sent", time: "2 hours ago" },
    { id: 2, type: "segment", message: "New segment 'High Spenders' created", time: "5 hours ago" },
    { id: 3, type: "campaign", message: "Welcome Campaign scheduled", time: "1 day ago" },
    { id: 4, type: "segment", message: "Segment 'Inactive Users' updated", time: "2 days ago" },
  ];

  const stats = [
    {
      id: 1,
      label: "Total Segments",
      value: 12,
      icon: <Layers className="w-8 h-8 text-purple-600" />,
      bg: "bg-purple-100",
      route: "/create-segment",
    },
    {
      id: 2,
      label: "Active Campaigns",
      value: 5,
      icon: <Megaphone className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-100",
      route: "/campaign-history",
    },
    {
      id: 3,
      label: "Your Profile",
      value: 1,
      icon: <Users className="w-8 h-8 text-green-600" />,
      bg: "bg-green-100",
      route: "/edit-profile",
    },
    {
      id: 4,
      label: "Edit Segments",
      value: 3,
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
      bg: "bg-yellow-100",
      route: "/segment-preview",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "campaign":
        return <Mail className="w-4 h-4 text-blue-500" />;
      case "segment":
        return <Layers className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-10 font-['Roboto']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Analytics Overview
          </h2>
          <p className="text-gray-400 text-sm mt-1">Metrics and performance tracking</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {user?.name || "Strategist"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            onClick={() => navigate(stat.route)}
            className="cursor-pointer bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col items-center transition-all hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/40 group active:scale-[0.98]"
          >
            <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${stat.bg.replace('bg-', 'bg-opacity-10 bg-')} mb-6 group-hover:scale-110 transition-transform`}>
              {React.cloneElement(stat.icon, { className: `w-6 h-6 ${stat.icon.props.className.split(' ').filter(c => c.startsWith('text-')).join(' ')}` })}
            </div>
            <span className="text-4xl font-black text-gray-900 mb-1">{stat.value}</span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Campaign Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} style={{ fontSize: '12px', fontWeight: '500' }} />
              <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} style={{ fontSize: '12px', fontWeight: '500' }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #f3f4f6", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", fontSize: '12px', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="campaigns" stroke="#3b82f6" strokeWidth={4} dot={false} activeDot={{ r: 6, fill: "#3b82f6", strokeWidth: 0 }} />
              <Line type="monotone" dataKey="sent" stroke="#10b981" strokeWidth={4} dot={false} activeDot={{ r: 6, fill: "#10b981", strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-purple-50 rounded-xl">
              <Layers className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Segment Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={segmentData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={8}
                dataKey="value"
              >
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={4} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #f3f4f6", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", fontSize: '12px', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {segmentData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-green-50 rounded-xl">
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Engagement Stats</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} style={{ fontSize: '12px', fontWeight: '500' }} />
              <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} style={{ fontSize: '12px', fontWeight: '500' }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #f3f4f6", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", fontSize: '12px', fontWeight: 'bold' }}
              />
              <Bar dataKey="campaigns" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={20} />
              <Bar dataKey="sent" fill="#10b981" radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-gray-50 rounded-xl">
              <MessageCircle className="w-5 h-5 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Live Feed</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-gray-900 transition-all border border-transparent group-hover:border-gray-100">
                  {React.cloneElement(getActivityIcon(activity.type), { size: 16 })}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate tracking-tight">{activity.message}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2rem] p-10 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-8">Shortcuts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <button
            onClick={() => navigate("/create-segment")}
            className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl hover:shadow-gray-200/40 transition-all active:scale-[0.98] group"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-purple-500 shadow-sm group-hover:scale-110 transition-transform">
              <Layers size={20} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Segments</span>
          </button>
          <button
            onClick={() => navigate("/campaign-form")}
            className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl hover:shadow-gray-200/40 transition-all active:scale-[0.98] group"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm group-hover:scale-110 transition-transform">
              <Megaphone size={20} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Deploy</span>
          </button>
          <button
            onClick={() => navigate("/campaign-history")}
            className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl hover:shadow-gray-200/40 transition-all active:scale-[0.98] group"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-500 shadow-sm group-hover:scale-110 transition-transform">
              <TrendingUp size={20} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Ledger</span>
          </button>
          <button
            onClick={() => navigate("/edit-profile")}
            className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl hover:shadow-gray-200/40 transition-all active:scale-[0.98] group"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-yellow-500 shadow-sm group-hover:scale-110 transition-transform">
              <Users size={20} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;