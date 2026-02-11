export default function Footer() {
  return (
    <footer className="bg-white px-8 py-6 relative overflow-hidden">
      {/* Top Section */}
      <div className="grid md:grid-cols-5 gap-10 relative z-10">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold mb-4"> Hospital+</h2>

          <p className="text-sm text-gray-500 mb-3">
            Subscribe to health updates
          </p>

          <div className="w-full max-w-md">
            <div className="flex w-full rounded-full border border-gray-300 bg-white shadow-sm overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 text-sm outline-none min-w-0"
              />

              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 text-sm font-medium whitespace-nowrap"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Services */}
        <FooterColumn
          title="Services"
          items={[
            "Doctor Booking",
            "Video Consultation",
            "Lab Tests",
            "Health Packages",
            "Emergency Care",
          ]}
        />

        {/* About */}
        <FooterColumn
          title="About"
          items={["About Us", "Doctors", "Careers", "Hospital Partners"]}
        />

        {/* Help */}
        <FooterColumn
          title="Help"
          items={["Appointments", "Payments", "Refund Policy", "FAQs"]}
        />

        {/* Policy */}
        <FooterColumn
          title="Policy"
          items={[
            "Privacy Policy",
            "Terms & Conditions",
            "Security",
            "Sitemap",
          ]}
        />
      </div>

      {/* Big Watermark */}
      <h1 className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[120px] md:text-[160px] font-bold text-gray-100 select-none">
        Hospital+
      </h1>

      {/* Bottom */}
      <div className="mt-24 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 relative z-10 gap-4">
        <p>© 2026 MediBook. All rights reserved.</p>

        <div className="flex gap-4 text-lg">
          <span>🌐</span>
          <span>📘</span>
          <span>📸</span>
          <span>💼</span>
        </div>
      </div>
    </footer>
  );
}

/* Reusable Column Component */
function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="font-medium mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((item, index) => (
          <li key={index} className="hover:text-black cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
