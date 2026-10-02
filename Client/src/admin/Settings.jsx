import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaHospital,
  FaPhoneVolume,
  FaEnvelope,
  FaLocationDot,
  FaFloppyDisk,
  FaShieldHalved,
  FaBell,
  FaClock,
} from "react-icons/fa6";

export default function Settings() {
  const [hospitalInfo, setHospitalInfo] = useState({
    hospitalName: "Hospital+ Healthcare System",
    contactEmail: "care@hospitalplus.com",
    contactPhone: "+91 98765 43210",
    emergencyNumber: "108",
    address: "124 Medical Plaza, Central City Healthcare Campus",
    operatingHours: "Mon–Sat: 8:00 AM – 10:00 PM (Emergency 24/7)",
  });

  const handleChange = (e) => {
    setHospitalInfo({ ...hospitalInfo, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Hospital settings updated successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          System Settings & Configuration
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Manage clinical facility contact details, hours, and preferences
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* HOSPITAL GENERAL INFO */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              <FaHospital />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Facility & General Information
              </h3>
              <p className="text-xs text-slate-500">
                Publicly visible clinical details on patient portal
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Hospital Name
              </label>
              <input
                name="hospitalName"
                value={hospitalInfo.hospitalName}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Contact Phone
              </label>
              <input
                name="contactPhone"
                value={hospitalInfo.contactPhone}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Contact Email
              </label>
              <input
                name="contactEmail"
                type="email"
                value={hospitalInfo.contactEmail}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Emergency Hotline
              </label>
              <input
                name="emergencyNumber"
                value={hospitalInfo.emergencyNumber}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Physical Campus Address
              </label>
              <input
                name="address"
                value={hospitalInfo.address}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Working & OPD Hours
              </label>
              <input
                name="operatingHours"
                value={hospitalInfo.operatingHours}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* SECURITY & PREFERENCES */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg">
              <FaShieldHalved />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Appointment & Security Preferences
              </h3>
              <p className="text-xs text-slate-500">
                Automated reminders and doctor schedule restrictions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Automatic Slot Allocation
                </p>
                <p className="text-[11px] text-slate-500">
                  Allow patients to book next available slot automatically
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  SMS / Email Patient Reminders
                </p>
                <p className="text-[11px] text-slate-500">
                  Send automated appointment reminder 2 hours before scheduled slot
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition cursor-pointer text-sm"
          >
            <FaFloppyDisk />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}