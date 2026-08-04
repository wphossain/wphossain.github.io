import React from 'react';

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Admin Dashboard Overview</h1>
          <p className="text-[#aebcda] text-[14.5px]">Control metrics, content overrides, site tracking codes, and dynamic sections.</p>
        </div>
        <span className="px-3 py-1 bg-[rgba(37,211,102,0.14)] border border-[#25D366] text-[#25D366] text-[12px] font-bold rounded-full">
          Database Active
        </span>
      </div>

      {/* Overview Analytics Row */}
      <div className="grid grid-cols-4 gap-4 mb-8 max-lg:grid-cols-2">
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-xl p-5">
          <span className="text-[#7b8bad] text-[12px] font-bold uppercase tracking-wider block mb-1">Form Submissions</span>
          <strong className="text-2xl font-display text-white">0 Active</strong>
        </div>
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-xl p-5">
          <span className="text-[#7b8bad] text-[12px] font-bold uppercase tracking-wider block mb-1">Ad Cost Per Lead (Dallas)</span>
          <strong className="text-2xl font-display text-white">$28.00</strong>
        </div>
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-xl p-5">
          <span className="text-[#7b8bad] text-[12px] font-bold uppercase tracking-wider block mb-1">Tracking Integrations</span>
          <strong className="text-2xl font-display text-white">3 Live</strong>
        </div>
        <div className="bg-[#0a1c34] border border-[#0e2340] rounded-xl p-5">
          <span className="text-[#7b8bad] text-[12px] font-bold uppercase tracking-wider block mb-1">Active Niche Template</span>
          <strong className="text-2xl font-display text-white">HVAC Agency</strong>
        </div>
      </div>

      <div className="bg-[#0a1c34] border border-[#0e2340] rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">On-Demand CMS State</h3>
        <p className="text-[#aebcda] text-[14px] leading-relaxed mb-4">
          All sections of the landing page (such as Hero Title, Services list, Case Studies metrics, FAQs, and Google Tag Manager IDs) are driven dynamically by the adjacent panels. Modify values to instantly update the public site with no code push needed.
        </p>
      </div>
    </div>
  );
}
