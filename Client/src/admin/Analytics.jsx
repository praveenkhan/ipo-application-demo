import {
  FaChartLine,
  FaArrowTrendUp,
  FaUsers,
  FaCalendarCheck,
  FaClock,
  FaHospital,
} from "react-icons/fa6";

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Clinical & Operational Analytics
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Patient booking volume, department distribution, and peak hours
        </p>
      </div>

      {/* KPI METRICS ROW */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Avg Daily Consults
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <FaArrowTrendUp className="text-[10px]" /> +14.2%
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">48</h3>
          <p className="text-xs text-slate-400 mt-1">Visits per weekday</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Completion Rate
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <FaArrowTrendUp className="text-[10px]" /> +3.8%
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">96.4%</h3>
          <p className="text-xs text-slate-400 mt-1">Successful consultations</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Average Wait Time
            </span>
            <span className="inline-flex items-center text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Optimal
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">8 mins</h3>
          <p className="text-xs text-slate-400 mt-1">Pre-consult check-in</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Patient Satisfaction
            </span>
            <span className="inline-flex items-center text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              ⭐ 4.9/5
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">98.2%</h3>
          <p className="text-xs text-slate-400 mt-1">Positive clinical ratings</p>
        </div>
      </div>

      {/* CHARTS / BREAKDOWNS */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Weekly Volume Graph Mock */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Weekly Consultation Volume
              </h3>
              <p className="text-xs text-slate-500">
                Appointment frequency across active clinic hours
              </p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Current Week
            </span>
          </div>

          <div className="h-56 flex items-end gap-3 sm:gap-6 pt-8 pb-2 border-b border-slate-100">
            {[
              { day: "Mon", count: 42, height: "70%" },
              { day: "Tue", count: 56, height: "90%" },
              { day: "Wed", count: 38, height: "65%" },
              { day: "Thu", count: 62, height: "100%" },
              { day: "Fri", count: 48, height: "80%" },
              { day: "Sat", count: 32, height: "55%" },
              { day: "Sun", count: 18, height: "30%" },
            ].map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition">
                  {item.count}
                </span>
                <div className="w-full bg-slate-100 rounded-2xl relative overflow-hidden h-40 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-sky-400 rounded-2xl group-hover:from-blue-700 group-hover:to-sky-500 transition-all duration-300"
                    style={{ height: item.height }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Specializations Breakdown */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Top Specializations
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Highest patient demand by clinical department
            </p>

            <div className="space-y-4">
              {[
                { name: "Cardiology", pct: 34, color: "bg-blue-600" },
                { name: "Dermatology", pct: 26, color: "bg-sky-500" },
                { name: "Pediatrics", pct: 18, color: "bg-indigo-500" },
                { name: "Orthopedics", pct: 14, color: "bg-emerald-500" },
                { name: "General Medicine", pct: 8, color: "bg-amber-500" },
              ].map((spec) => (
                <div key={spec.name}>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>{spec.name}</span>
                    <span>{spec.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${spec.color} rounded-full`}
                      style={{ width: `${spec.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}