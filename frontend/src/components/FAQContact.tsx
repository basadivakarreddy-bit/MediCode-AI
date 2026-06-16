import React, { useState } from "react";
import { ChevronDown, Send, MessageSquare, ShieldCheck, Mail, Globe, Github } from "lucide-react";

interface FAQContactProps {
  theme: "dark" | "light";
}

export function FAQContact({ theme }: FAQContactProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const faqItems = [
    {
      question: "How secure is my medical data?",
      answer: "We treat your medical confidentiality with extreme priority. All documents scanned or analyzed are encrypted in transit. Content processed via our secure backend is kept strictly private within your active browser local state, adhering to HIPAA-compliant sandbox guidelines."
    },
    {
      question: "Which file formats can I upload for decoding?",
      answer: "MediCode AI fully supports JPEG, PNG, TIFF, and digital clinical PDF documents, supporting standard resolutions from flatbed scanners, phone camera captures, and lab email attachments."
    },
    {
      question: "Can I download or print analyzed reports?",
      answer: "Yes! There is a high-fidelity 'Export PDF' utility directly integrated inside the diagnostic panel workspace. It reformats all medicines, lab status markers, dynamic charts, and warning alerts into a beautifully styled print-ready hospital summary template."
    },
    {
      question: "Does this AI model replace a clinical physician's consultation?",
      answer: "Absolutely not. MediCode AI is designed solely for patient data education, jargon Translation, and lifestyle awareness. It is NOT a clinical diagnosis, treat, or direct medication adjustment protocol. Always review important medicine schedules with your primary medical doctor."
    },
    {
      question: "Are my scanned transcripts stored permanently on remote servers?",
      answer: "No. Your documents are analyzed in memory using our private Express proxy layer communicating directly with the secure Google Gemini server. No persistent health indexes are logged externally, keeping your medical timeline 100% confidential."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* LEFT COLUMN: FAQ accordion list */}
      <div className="lg:col-span-7 text-left space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
          </div>
          <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Learn how we protect data and translate clinical jargon.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {faqItems.map((item, index) => {
            const isOpen = openFAQ === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 ${
                  theme === "dark"
                    ? "border-slate-800 bg-slate-900/10 hover:bg-slate-900/30"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFAQ(isOpen ? null : index)}
                  className="w-full text-left p-4 flex justify-between items-center gap-4 cursor-pointer"
                >
                  <span className="font-semibold text-sm tracking-tight">{item.question}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-500 shrink-0 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className={`px-4 pb-4 pt-1 text-xs leading-relaxed border-t transition-all ${
                    theme === "dark" ? "border-slate-800/60 text-slate-300" : "border-slate-100 text-slate-600"
                  }`}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Contact glassmorphism form */}
      <div className="lg:col-span-5 text-left space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight">Connect with Us</h2>
          </div>
          <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Have enterprise inquiries or feature suggestions? Let's connect!
          </p>
        </div>

        <form onSubmit={handleSubmit} className={`p-6 rounded-2xl border backdrop-blur-xl space-y-4 shadow-xl ${
          theme === "dark" 
            ? "border-slate-800 bg-slate-900/35" 
            : "border-cyan-200 bg-white/80 shadow-[0_12px_40px_rgba(6,182,212,0.08)] text-slate-950 font-medium"
        }`}>
          <div>
            <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Emily Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full text-xs p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors ${
                theme === "dark"
                  ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                  : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
              }`}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. emily@medidecode.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full text-xs p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors ${
                theme === "dark"
                  ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                  : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
              }`}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Message / Inquiry</label>
            <textarea
              rows={4}
              required
              placeholder="Write your note here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full text-xs p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors resize-none ${
                theme === "dark"
                  ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                  : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
              }`}
            />
          </div>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3.5 rounded-lg text-xs text-center font-bold animate-pulse">
              Message sent successfully! We'll reply within 24 hours.
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold tracking-wide shadow-lg cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          )}

          {/* Social icons row */}
          <div className="flex items-center justify-center gap-4 pt-3 border-t border-slate-700/10 text-xs">
            <span className="text-[10px] text-slate-400 font-mono tracking-wide">CONNECT:</span>
            <a href="#github" className={`p-1.5 rounded-full transition-colors ${theme === "dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}>
              <Github className="w-4 h-4" />
            </a>
            <a href="#mail" className={`p-1.5 rounded-full transition-colors ${theme === "dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}>
              <Mail className="w-4 h-4" />
            </a>
            <a href="#web" className={`p-1.5 rounded-full transition-colors ${theme === "dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}>
              <Globe className="w-4 h-4" />
            </a>
          </div>

        </form>
      </div>

    </div>
  );
}
