"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Zap, Send, CheckCircle, MessageSquare } from "lucide-react";
import { useLanguage } from "@/config/LanguageContext";

function ContactFormContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    machine: "general",
    message: "",
    emergency: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Sync state with query parameter
  useEffect(() => {
    if (searchParams.get("emergency") === "true") {
      setFormData((prev) => ({ ...prev, emergency: true }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!formData.name || !formData.company || !formData.email || !formData.message) {
      setError(
        language === "tr"
          ? "Lütfen tüm zorunlu alanları doldurun."
          : language === "de"
          ? "Bitte füllen Sie alle Pflichtfelder aus."
          : "Please fill out all required fields."
      );
      return;
    }

    // Success transition
    setSubmitted(true);
  };

  const isTr = language === "tr";
  const isDe = language === "de";

  const caglayanTitle = isTr
    ? "Elektrik-Elektronik Mühendisi | Kıdemli Sistem Mimarı"
    : isDe
    ? "Elektroingenieur | Senior-Systemarchitekt"
    : "Electrical & Electronics Engineer | Senior Systems Architect";

  const optionalLabel = isTr ? "(İsteğe Bağlı)" : isDe ? "(Optional)" : "(Optional)";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
      {/* Left Column: Form Card */}
      <div className="lg:col-span-7">
        <div
          className={`glassmorphic-card p-6 sm:p-8 rounded-2xl border transition-colors ${
            formData.emergency ? "border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.08)]" : "border-white/5"
          }`}
        >
          {submitted ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h2 className="font-sans font-extrabold text-2xl text-white">
                {t("contactPage.form.successTitle")}
              </h2>
              <p className="font-body text-sm text-steel-gray max-w-md mx-auto leading-relaxed">
                {formData.emergency ? (
                  <span className="text-red-400 font-bold block mt-2">
                    {t("contactPage.form.successDescEmergency")}
                  </span>
                ) : (
                  t("contactPage.form.successDescNormal")
                )}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2 bg-secondary-navy hover:bg-secondary-navy/80 border border-white/10 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                {t("contactPage.form.submitAnother")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-white">
                  {t("contactPage.form.formTitle")}
                </h2>
                <p className="font-body text-xs sm:text-sm text-steel-gray mt-1">
                  {t("contactPage.form.formDesc")}
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-600/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Grid fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-sans font-bold text-xs text-white/60 uppercase tracking-wide">
                    {t("contactPage.form.name")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-primary-navy/80 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="e.g., Martin Schmidt"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="font-sans font-bold text-xs text-white/60 uppercase tracking-wide">
                    {t("contactPage.form.company")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-primary-navy/80 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="e.g., German Logistics GmbH"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-sans font-bold text-xs text-white/60 uppercase tracking-wide">
                    {t("contactPage.form.email")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-primary-navy/80 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="e.g., schmidt@company.de"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="font-sans font-bold text-xs text-white/60 uppercase tracking-wide">
                    {t("contactPage.form.phone")} <span className="text-white/40">{optionalLabel}</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-primary-navy/80 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="e.g., +49 170 1234567"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="machine" className="font-sans font-bold text-xs text-white/60 uppercase tracking-wide">
                  {t("contactPage.form.machineType")}
                </label>
                <select
                  id="machine"
                  name="machine"
                  value={formData.machine}
                  onChange={handleChange}
                  className="bg-primary-navy/80 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors"
                >
                  <option value="general">{t("contactPage.form.generalOption")}</option>
                  <option value="gd-maker-packer">{t("contactPage.form.machineOptions.gd")}</option>
                  <option value="sasib-maker-packer">{t("contactPage.form.machineOptions.sasib")}</option>
                  <option value="gd-filter">{t("contactPage.form.machineOptions.gdFilter")}</option>
                  <option value="molins-filter">{t("contactPage.form.machineOptions.molins")}</option>
                  <option value="mts-tube">{t("contactPage.form.machineOptions.mts")}</option>
                  <option value="other">{t("contactPage.form.otherOption")}</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-sans font-bold text-xs text-white/60 uppercase tracking-wide">
                  {t("contactPage.form.issueDesc")} <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-primary-navy/80 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                  placeholder={t("contactPage.form.issuePlaceholder")}
                />
              </div>

              {/* Emergency switch box */}
              <div
                className={`p-4 rounded-xl border flex gap-3.5 items-start cursor-pointer transition-all duration-300 ${
                  formData.emergency
                    ? "bg-red-500/10 border-red-500/30 text-white"
                    : "bg-primary-navy/50 border-white/5 text-steel-gray hover:border-white/10"
                }`}
                onClick={() => setFormData((prev) => ({ ...prev, emergency: !prev.emergency }))}
              >
                <input
                  type="checkbox"
                  id="emergency"
                  name="emergency"
                  checked={formData.emergency}
                  onChange={() => {}} // Controlled via card div click
                  className="w-4.5 h-4.5 accent-red-500 rounded border-white/20 mt-0.5 shrink-0"
                />
                <div>
                  <h4 className="font-sans font-bold text-sm text-white flex items-center gap-1.5">
                    <Zap className={`w-4 h-4 fill-current ${formData.emergency ? "text-red-400" : "text-steel-gray"}`} />
                    {t("contactPage.form.emergencyTitle")}
                  </h4>
                  <p className="font-body text-xs text-steel-gray mt-1 leading-relaxed">
                    {t("contactPage.form.emergencyDesc")}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-lg font-sans font-bold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  formData.emergency
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    : "bg-industrial-blue hover:bg-industrial-blue/90 text-white shadow-[0_0_15px_rgba(0,102,204,0.2)]"
                }`}
              >
                <Send className="w-4 h-4" />
                {formData.emergency ? t("contactPage.form.transmitBtn") : t("contactPage.form.submitBtn")}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right Column: Contact Details & Emergency Support Info */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        {/* Emergency instructions / Standby Engineers */}
        <div className="glassmorphic-card p-6 sm:p-8 rounded-2xl border border-red-500/20 bg-red-600/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-red-600/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="flex items-center gap-2.5 mb-4">
            <Zap className="w-5 h-5 text-red-400 fill-current animate-pulse" />
            <h3 className="font-sans font-bold text-lg text-white">
              {t("contactPage.standbyTitle")}
            </h3>
          </div>
          <p className="font-body text-sm text-steel-gray leading-relaxed mb-6">
            {t("contactPage.standbyDesc")}
          </p>

          <div className="flex flex-col gap-6">
            {/* Caglayan Eroglu */}
            <div className="p-4 rounded-xl bg-primary-navy/60 border border-white/5 flex flex-col gap-3">
              <div>
                <h4 className="font-sans font-bold text-sm text-white">Çağlayan EROĞLU</h4>
                <p className="font-body text-xs text-neon-cyan">{caglayanTitle}</p>
                <p className="font-body text-[10px] text-emerald-400/90 font-semibold mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t("contactPage.germanNRW")}
                </p>
              </div>
              <div className="flex flex-col gap-2 font-body text-xs sm:text-sm">
                <a href="tel:+491601221306" className="flex items-center gap-2 text-steel-gray hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 text-neon-cyan" />
                  +49 (0) 160 122 13 06
                </a>
                <a href="tel:+905337063813" className="flex items-center gap-2 text-steel-gray hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 text-neon-cyan" />
                  +90 (533) 706 38 13
                </a>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://wa.me/491601221306"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-bold transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp (+49)
                </a>
                <a
                  href="https://wa.me/905337063813"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-bold transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp (+90)
                </a>
              </div>
            </div>


          </div>
        </div>

        {/* Regular channel details */}
        <div className="glassmorphic-card p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col gap-6">
          <h3 className="font-sans font-bold text-lg text-white">
            {t("contactPage.generalInquiries")}
          </h3>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-4 items-center">
              <div className="p-3 rounded-lg bg-primary-navy border border-white/5 text-neon-cyan shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-sans font-bold text-xs text-white/50 uppercase tracking-widest">
                  {t("contactPage.emailLabel")}
                </p>
                <a href="mailto:support@ch-energie.de" className="font-body text-sm sm:text-base text-white hover:text-neon-cyan transition-colors">
                  support@ch-energie.de
                </a>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="p-3 rounded-lg bg-primary-navy border border-white/5 text-neon-cyan shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-sans font-bold text-xs text-white/50 uppercase tracking-widest">
                  {t("contactPage.addressLabel")}
                </p>
                <p className="font-body text-sm sm:text-base text-white leading-relaxed">
                  {t("footer.address")} <br />
                  <span className="text-xs text-steel-gray">
                    {language === "tr"
                      ? "(Küresel uçuş ve araçla müdahale imkanı)"
                      : language === "de"
                      ? "(Globaler Flug- und Fahrbereitschaftsdienst)"
                      : "(Global flight & drive-to dispatch)"}
                  </span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 sm:py-20 relative min-h-screen">
      {/* Contact Page Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <video
          src="/video_arka_plan/215500_medium.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-[#050a15]/72" />
      </div>
      <div className="absolute inset-0 circuit-grid opacity-5 pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full">
            {t("contactPage.tag")}
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            {t("contactPage.title")}
          </h1>
          <p className="font-body text-base sm:text-lg text-steel-gray mt-4 leading-relaxed">
            {t("contactPage.desc")}
          </p>
        </div>

        {/* Form and details block wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<div className="text-center py-20 text-steel-gray">Loading technical panels...</div>}>
          <ContactFormContent />
        </Suspense>

        {/* Global Dispatch Map Mockup */}
        <div className="glassmorphic-card p-6 sm:p-8 rounded-2xl border border-white/5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-navy opacity-20 circuit-grid" />
          <h3 className="font-sans font-extrabold text-lg text-white mb-2 relative z-10">
            {t("contactPage.dispatchTitle")}
          </h3>
          <p className="font-body text-sm text-steel-gray max-w-xl mx-auto mb-6 relative z-10">
            {t("contactPage.dispatchDesc")}
          </p>

          {/* SVG Map Layout Representation */}
          <div className="w-full max-w-3xl mx-auto border border-white/5 rounded-xl bg-primary-navy/80 p-4 relative z-10">
            <svg
              viewBox="0 0 800 400"
              className="w-full h-auto text-white opacity-40 hover:opacity-60 transition-opacity duration-300"
            >
              {/* Map representation using grid dots/arcs */}
              <rect width="800" height="400" fill="none" />
              {/* Fake coordinate grid */}
              <line x1="100" y1="0" x2="100" y2="400" stroke="rgba(255,255,255,0.03)" />
              <line x1="200" y1="0" x2="200" y2="400" stroke="rgba(255,255,255,0.03)" />
              <line x1="300" y1="0" x2="300" y2="400" stroke="rgba(255,255,255,0.03)" />
              <line x1="400" y1="0" x2="400" y2="400" stroke="rgba(255,255,255,0.03)" />
              <line x1="500" y1="0" x2="500" y2="400" stroke="rgba(255,255,255,0.03)" />
              <line x1="600" y1="0" x2="600" y2="400" stroke="rgba(255,255,255,0.03)" />
              <line x1="700" y1="0" x2="700" y2="400" stroke="rgba(255,255,255,0.03)" />
              <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.03)" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.03)" />
              <line x1="0" y1="300" x2="800" y2="300" stroke="rgba(255,255,255,0.03)" />

              {/* Fake continents */}
              {/* America */}
              <circle cx="150" cy="180" r="40" fill="rgba(255,255,255,0.05)" />
              <circle cx="200" cy="280" r="30" fill="rgba(255,255,255,0.05)" />
              {/* Europe/Africa */}
              <circle cx="450" cy="120" r="45" fill="rgba(0,229,255,0.08)" />
              <circle cx="480" cy="260" r="40" fill="rgba(255,255,255,0.05)" />
              {/* Asia */}
              <circle cx="620" cy="160" r="60" fill="rgba(255,255,255,0.05)" />
              {/* Australia */}
              <circle cx="700" cy="300" r="25" fill="rgba(255,255,255,0.05)" />

              {/* HQ Marker */}
              <circle cx="470" cy="145" r="6" fill="#00E5FF" className="animate-ping" />
              <circle cx="470" cy="145" r="4" fill="#00E5FF" />
              <text x="480" y="140" fill="#00E5FF" fontSize="10" fontWeight="bold">HQ IZMIR</text>

              {/* Active service routes */}
              {/* Route to America */}
              <path
                d="M 470 145 Q 300 80 150 180"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="1.5"
                strokeDasharray="5,5"
              />
              <circle cx="150" cy="180" r="3" fill="#00E5FF" />
              {/* Route to Asia */}
              <path
                d="M 470 145 Q 550 110 620 160"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="1.5"
                strokeDasharray="5,5"
              />
              <circle cx="620" cy="160" r="3" fill="#00E5FF" />
              {/* Route to Middle East */}
              <path
                d="M 470 145 Q 500 160 530 180"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="1.5"
                strokeDasharray="5,5"
              />
              <circle cx="530" cy="180" r="3" fill="#00E5FF" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
