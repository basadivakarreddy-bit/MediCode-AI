import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Pill, Activity, Brain, ShieldAlert, ArrowRight, Eye } from "lucide-react";

interface HeroProps {
  onStartAnalysis: () => void;
  onLoadDemo: () => void;
  theme: "dark" | "light";
}

export function InteractiveHero({ onStartAnalysis, onLoadDemo, theme }: HeroProps) {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background radial glowing gradients (Dark / Light responsive) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[100px] md:blur-[200px] transition-all duration-700 ${theme === "dark" ? "bg-cyan-500/10" : "bg-cyan-200/20"}`} />
        <div className={`absolute bottom-0 right-1/4 w-[250px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[100px] md:blur-[180px] transition-all duration-700 ${theme === "dark" ? "bg-purple-600/10" : "bg-purple-200/20"}`} />
        
        {/* Floating particles background indicator */}
        <div className="absolute top-10 right-20 w-2 h-2 rounded-full bg-cyan-400 opacity-55 animate-ping" />
        <div className="absolute bottom-20 left-10 w-3 h-3 rounded-full bg-indigo-500 opacity-30 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Heading, Subheading & Action Buttons */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide border transition-all duration-300 backdrop-blur-md"
              style={{
                background: theme === "dark" ? "rgba(6, 182, 212, 0.08)" : "rgba(6, 182, 212, 0.05)",
                borderColor: theme === "dark" ? "rgba(6, 182, 212, 0.25)" : "rgba(6, 182, 212, 0.15)",
                color: theme === "dark" ? "#22d3ee" : "#0891b2"
              }}
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
              <span>Futuristic AI Health Decoder</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
            >
              Turn Complex{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Medical Documents
              </span>{" "}
              Into Clear Health Insights
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className={`text-lg leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}
            >
              Upload prescriptions and lab reports. Instantly decode messy handwritings, translate complex chemical markers, discover dangerous drug interactions, and visualize safety trends through premium AI explanations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onStartAnalysis}
                className="group relative px-6 py-3.5 rounded-xl font-semibold tracking-wide shadow-lg cursor-pointer flex items-center gap-2 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white"
              >
                <span>Start Free Analysis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onLoadDemo}
                className={`px-6 py-3.5 rounded-xl font-semibold tracking-wide border cursor-pointer hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-md flex items-center gap-2 ${
                  theme === "dark" 
                    ? "border-slate-700 bg-slate-900/40 text-slate-200 hover:bg-slate-800/60 hover:border-slate-600" 
                    : "border-cyan-200 bg-white/70 text-slate-950 hover:bg-white hover:border-cyan-300 shadow-sm font-bold"
                }`}
              >
                <Eye className="w-4 h-4 text-cyan-500" />
                <span>View Live</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Floating AI command center with layered cards */}
          <div className="lg:col-span-6 relative h-[450px] md:h-[500px] flex items-center justify-center">
            
            {/* Visual background radar orb */}
            <div className={`absolute w-[240px] md:w-[320px] h-[240px] md:h-[320px] rounded-full border opacity-50 animate-pulse transition-colors duration-500 ${
              theme === "dark" ? "border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent" : "border-cyan-200/40 bg-gradient-to-b from-cyan-200/10 to-transparent"
            }`} />

            {/* CARD 1: Prescription Card (Top Left - Floating) */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: -40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5, zIndex: 50 }}
              className={`absolute top-4 left-2 md:left-8 p-4 rounded-xl shadow-xl border w-[220px] md:w-[260px] backdrop-blur-xl transition-colors duration-500 ${
                theme === "dark" ? "bg-slate-900/90 border-slate-800/80 text-white" : "bg-white/80 border-cyan-200 text-slate-950 font-medium"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded bg-cyan-500/20">
                  <Pill className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400">Prescription Scan</span>
              </div>
              <h4 className="text-xs font-bold leading-tight line-clamp-1">Amoxicillin & Montelukast</h4>
              <div className="mt-3.5 space-y-2 border-t pt-2 border-slate-700/20">
                <div className="flex justify-between items-center text-[11px]">
                  <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>Deciphered Drug:</span>
                  <span className="font-semibold text-emerald-500">Paracetamol 650mg</span>
                </div>
                <div className="flex gap-1 justify-start">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-cyan-500/10 text-cyan-400">Morning</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-cyan-500/10 text-cyan-400">Afternoon</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-cyan-500/10 text-cyan-400">Night</span>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: Lab Report Card (Bottom Right - Floating) */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: 5, zIndex: 50 }}
              className={`absolute bottom-6 right-2 md:right-8 p-4 rounded-xl shadow-xl border w-[210px] md:w-[240px] backdrop-blur-xl transition-colors duration-500 ${
                theme === "dark" ? "bg-slate-900/90 border-slate-800/80 text-white" : "bg-white/80 border-cyan-200 text-slate-950 font-medium"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded bg-purple-500/20">
                  <Activity className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-purple-400">Biomarkers extracted</span>
              </div>
              <div className="space-y-1.5 mt-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span>Hemoglobin:</span>
                  <span className="text-emerald-500 font-bold">13.2 g/dL (Normal)</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span>Blood Sugar:</span>
                  <span className="text-orange-500 font-bold">105 mg/dL (High)</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span>LDL Cholesterol:</span>
                  <span className="text-rose-500 font-bold">142 mg/dL (High)</span>
                </div>
              </div>
            </motion.div>

            {/* CARD 3: Health Score Circular Gauge (Center - Floating & Highlighted) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05, zIndex: 51 }}
              className={`absolute p-5 rounded-2xl shadow-2xl border w-[150px] md:w-[170px] text-center backdrop-blur-2xl transition-all duration-500 ${
                theme === "dark" 
                  ? "bg-slate-950/95 border-cyan-500/30 ring-1 ring-cyan-500/10 text-white" 
                  : "bg-white/80 border-cyan-300 text-slate-950 font-medium shadow-[0_12px_45px_rgba(6,182,212,0.18)]"
              }`}
            >
              <span className="text-[9px] font-mono tracking-widest uppercase text-slate-400 block mb-1">Health Score</span>
              
              {/* Simple Animated SVG Compliance Circle */}
              <div className="relative w-16 h-16 mx-auto my-1.5 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke={theme === "dark" ? "rgba(255,255,255,0.06)" : "#f1f5f9"} strokeWidth="4" />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="transparent"
                    stroke="url(#hero-gauge-gradient)"
                    strokeWidth="5"
                    strokeDasharray={175}
                    initial={{ strokeDashoffset: 175 }}
                    animate={{ strokeDashoffset: 175 - (175 * 82) / 100 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="hero-gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute font-extrabold text-[#22d3ee] text-sm tracking-tight">82%</div>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded font-bold">Good Condition</span>
            </motion.div>

            {/* CARD 4: AI Command Prompt Card (Bottom Left - Interactive question indicator) */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`absolute bottom-2 left-1/4 p-2.5 rounded-full shadow-lg border backdrop-blur-md text-[10px] flex items-center gap-2 max-w-[200px] transition-colors duration-500 ${
                theme === "dark" ? "bg-slate-900/90 border-slate-800 text-slate-200" : "bg-white/80 border-cyan-200 text-slate-950 font-bold hover:bg-white"
              }`}
            >
              <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400">
                <Brain className="w-3 h-3 animate-bounce" />
              </div>
              <span className="font-medium truncate">"What does HbA1c mean?"</span>
            </motion.div>

            {/* Glowing neon core behind cards */}
            <div className={`absolute w-[180px] h-[180px] rounded-full filter blur-[60px] opacity-25 -z-10 animate-pulse bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700`} />
          </div>

        </div>
      </div>
    </section>
  );
}
