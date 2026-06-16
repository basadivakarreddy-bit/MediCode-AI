import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line 
} from "recharts";
import { TimelineMetric } from "../types";
import { 
  Activity, 
  Apple, 
  ChevronRight, 
  TrendingUp, 
  Heart, 
  Plus, 
  AlertCircle, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  CheckCircle2,
  Bookmark
} from "lucide-react";

interface TimelineProps {
  metrics: TimelineMetric[];
  theme: "dark" | "light";
  onChangeMetrics?: React.Dispatch<React.SetStateAction<TimelineMetric[]>>;
}

export function HealthTimeline({ metrics, theme, onChangeMetrics }: TimelineProps) {
  const [activeMetricTab, setActiveMetricTab] = useState<"glucose" | "bp" | "cholesterol" | "hematology">("glucose");
  
  // Local states for custom metric logger Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [logDate, setLogDate] = useState("");
  const [logBloodSugar, setLogBloodSugar] = useState("105");
  const [logSystolicBP, setLogSystolicBP] = useState("120");
  const [logDiastolicBP, setLogDiastolicBP] = useState("80");
  const [logCholesterol, setLogCholesterol] = useState("195");
  const [logHemoglobin, setLogHemoglobin] = useState("13.2");
  const [logWeight, setLogWeight] = useState("65");
  const [formSuccessMsg, setFormSuccessMsg] = useState("");

  const handleAddMetricSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onChangeMetrics) return;

    const formattedDate = logDate.trim() 
      ? new Date(logDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    const newMetric: TimelineMetric = {
      date: formattedDate,
      bloodSugar: parseFloat(logBloodSugar) || 100,
      systolicBP: parseInt(logSystolicBP) || 120,
      diastolicBP: parseInt(logDiastolicBP) || 80,
      cholesterol: parseFloat(logCholesterol) || 190,
      hemoglobin: parseFloat(logHemoglobin) || 13.2,
      weight: parseFloat(logWeight) || 65
    };

    onChangeMetrics(prev => {
      // Keep unique dates, discard older duplicates for chart consistency
      const filtered = prev.filter(m => m.date !== newMetric.date);
      return [...filtered, newMetric];
    });

    setFormSuccessMsg(`Successfully added records for ${formattedDate}! Check your updated tracking graphs.`);
    setTimeout(() => setFormSuccessMsg(""), 4500);
    setIsFormOpen(false);
  };

  // Extract the latest updated metric record for current evaluation
  const latestMetric = metrics[metrics.length - 1] || {
    date: "Current",
    bloodSugar: 105,
    systolicBP: 120,
    diastolicBP: 80,
    cholesterol: 195,
    hemoglobin: 13.2,
    weight: 65
  };

  // 1. Diabetes (sugar) positive / negative criteria evaluator
  const evaluateSugarStatus = (val: number) => {
    if (val >= 126) {
      return {
        status: "Positive (High Diabetic Threshold)",
        severity: "diabetic",
        colorClass: "text-red-500 bg-red-500/10 border-red-500/20",
        pillClass: "bg-red-500 text-white",
        desc: "Fasting Blood Sugar elevated over the 126 mg/dL clinical threshold. Active metabolic control is highly recommended.",
        controlPlan: [
          "Eliminate processed sugar, sugary sports drinks, and sweetened coffee recipes entirely.",
          "Perform 20-30 minutes of mild post-meal cardiovascular walking to trigger skeletal muscle glucose transporters (GLUT4).",
          "Prioritize high-fiber prebiotic foods (quinoa, leafy brassicas, chia seeds) which slow glucose absorption.",
          "Keep high regular hydration of 2.5L to 3L water daily to aid kidneys with healthy filtration of circulating sugars."
        ]
      };
    } else if (val >= 100 && val <= 125) {
      return {
        status: "Prediabetic (Borderline Impaired Glucose)",
        severity: "prediabetic",
        colorClass: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        pillClass: "bg-amber-500 text-white",
        desc: "Fasting Blood Sugar lies in the borderline pre-diabetic window (100 - 125 mg/dL). This status is fully reversible with quick nutritional adjustments.",
        controlPlan: [
          "Incorporate apple cider vinegar (1-2 tablespoons diluted in warm water) prior to starchier meals.",
          "Switch standard white flour/grains to raw whole grain alternatives to reduce glucose surges.",
          "Avoid snacking on dry carbohydrates alone; pair with healthy fats (almonds, avocado) or lean proteins to flatten the glucose curve."
        ]
      };
    } else {
      return {
        status: "Negative (Normal Healthy Range)",
        severity: "healthy",
        colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        pillClass: "bg-emerald-500 text-white",
        desc: "Fasting Glucose levels reflect robust insulin sensitivity and balanced metabolic homeostasis (<100 mg/dL). Status is safely Negative.",
        controlPlan: [
          "Maintain current consistent dietary routines centering rich wholefoods.",
          "Track activity metrics to retain optimal baseline tissue insulin sensitivity.",
          "Conduct preventative standard screens once per year."
        ]
      };
    }
  };

  const sugarEval = evaluateSugarStatus(latestMetric.bloodSugar);

  const previousMetric = metrics.length > 1 ? metrics[metrics.length - 2] : null;

  // Detailed evaluators for each selected metric tab, including normal ranges and selected values (before vs present)
  const getTabEvaluation = () => {
    const hasBefore = previousMetric !== null;
    const beforeDate = previousMetric?.date || "";
    const currentDate = latestMetric.date || "Current";

    switch (activeMetricTab) {
      case "glucose": {
        const val = latestMetric.bloodSugar;
        const prevVal = previousMetric?.bloodSugar;
        let diffText = "";
        let isImproved = false;
        if (prevVal !== undefined) {
          const diff = val - prevVal;
          if (diff < 0) {
            diffText = `${Math.abs(diff)} mg/dL decrease`;
            isImproved = true;
          } else if (diff > 0) {
            diffText = `${diff} mg/dL increase`;
            isImproved = false;
          } else {
            diffText = "Unchanged";
            isImproved = true;
          }
        }

        let status = "Negative (Normal Healthy)";
        let colorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        let desc = "Fasting Glucose levels reflect robust insulin sensitivity and balanced metabolic homeostasis (<100 mg/dL).";
        
        if (val >= 126) {
          status = "Positive (High Diabetic)";
          colorClass = "text-rose-500 bg-rose-500/10 border-rose-500/20";
          desc = "Fasting Blood Sugar elevated over the 126 mg/dL clinical threshold. Active metabolic control is recommended.";
        } else if (val >= 100) {
          status = "Prediabetic (Borderline Impaired)";
          colorClass = "text-amber-500 bg-amber-500/10 border-amber-500/20";
          desc = "Fasting Blood Sugar lies in the borderline pre-diabetic window (100 - 125 mg/dL). This is fully reversible.";
        }
        
        return {
          title: "Diabetes Status Evaluation",
          status,
          colorClass,
          desc,
          healthyRange: "70 - 99 mg/dL",
          currentLabel: "Present Value",
          currentDate,
          currentValueStr: `${val} mg/dL`,
          beforeLabel: "Before Value",
          beforeDate,
          beforeValueStr: prevVal !== undefined ? `${prevVal} mg/dL` : "No prior record",
          hasBefore,
          diffText,
          isImproved
        };
      }
      case "bp": {
        const sys = latestMetric.systolicBP;
        const dia = latestMetric.diastolicBP;
        const prevSys = previousMetric?.systolicBP;
        const prevDia = previousMetric?.diastolicBP;
        let diffText = "";
        let isImproved = false;
        if (prevSys !== undefined && prevDia !== undefined) {
          const sysDiff = sys - prevSys;
          const diaDiff = dia - prevDia;
          if (sysDiff <= 0 && diaDiff <= 0) {
            diffText = "Stable / pressure reduction";
            isImproved = true;
          } else if (sysDiff > 0 || diaDiff > 0) {
            diffText = "Pressure elevation detected";
            isImproved = false;
          } else {
            diffText = "Unchanged";
            isImproved = true;
          }
        }

        let status = "Optimal (Healthy Normal)";
        let colorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        let desc = "Your arterial resting pressure markers live within healthy limits, indicating strong vascular elasticity.";

        if (sys >= 140 || dia >= 90) {
          status = "Stage 2 Hypertension";
          colorClass = "text-rose-500 bg-rose-500/10 border-rose-500/20";
          desc = "Blood pressure values meet diagnostic targets for Stage 2 Hypertension. Regular tracking recommended.";
        } else if (sys >= 130 || dia >= 83) {
          status = "Stage 1 Hypertension";
          colorClass = "text-rose-400 bg-rose-500/5 border-rose-500/10";
          desc = "Resting arterial pressures reflect mild Stage 1 elevation. Support via physical movement and sodium limits.";
        } else if (sys > 125 || dia > 79) {
          status = "Borderline Elevated BP";
          colorClass = "text-amber-500 bg-amber-500/10 border-amber-500/20";
          desc = "Systolic level is slightly elevated over the 125 mmHg healthy threshold. Keep tracking activity parameters and rest optimally.";
        }

        return {
          title: "Blood Pressure Status Evaluation",
          status,
          colorClass,
          desc,
          healthyRange: "90-119 / 60-79 mmHg",
          currentLabel: "Present Value",
          currentDate,
          currentValueStr: `${sys}/${dia} mmHg`,
          beforeLabel: "Before Value",
          beforeDate,
          beforeValueStr: prevSys !== undefined && prevDia !== undefined ? `${prevSys}/${prevDia} mmHg` : "No prior record",
          hasBefore,
          diffText,
          isImproved
        };
      }
      case "cholesterol": {
        const val = latestMetric.cholesterol;
        const prevVal = previousMetric?.cholesterol;
        let diffText = "";
        let isImproved = false;
        if (prevVal !== undefined) {
          const diff = val - prevVal;
          if (diff < 0) {
            diffText = `${Math.abs(diff)} mg/dL decrease`;
            isImproved = true;
          } else if (diff > 0) {
            diffText = `${diff} mg/dL increase`;
            isImproved = false;
          } else {
            diffText = "Unchanged";
            isImproved = true;
          }
        }

        let status = "Optimal (Desirable Lipid Profile)";
        let colorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        let desc = "Total circulating lipids are kept within optimal reference thresholds, representing low baseline risks.";

        if (val >= 240) {
          status = "Elevated Lipids (High Risk)";
          colorClass = "text-rose-500 bg-rose-500/10 border-rose-500/20";
          desc = "Total cholesterol registers elevated levels. Focus heavily on soluble fibers and cut trans-fats.";
        } else if (val >= 200) {
          status = "Borderline High Lipids";
          colorClass = "text-amber-500 bg-amber-500/10 border-amber-500/20";
          desc = "Total cholesterol is slightly elevated. Check routine activities pattern and healthy dietary fat ratios.";
        }

        return {
          title: "Cardiovascular Lipid Evaluation",
          status,
          colorClass,
          desc,
          healthyRange: "< 200 mg/dL",
          currentLabel: "Present Value",
          currentDate,
          currentValueStr: `${val} mg/dL`,
          beforeLabel: "Before Value",
          beforeDate,
          beforeValueStr: prevVal !== undefined ? `${prevVal} mg/dL` : "No prior record",
          hasBefore,
          diffText,
          isImproved
        };
      }
      case "hematology": {
        const val = latestMetric.hemoglobin;
        const prevVal = previousMetric?.hemoglobin;
        let diffText = "";
        let isImproved = false;
        if (prevVal !== undefined) {
          const diff = val - prevVal;
          if (diff > 0) {
            diffText = `${diff} g/dL increase`;
            isImproved = true;
          } else if (diff < 0) {
            diffText = `${Math.abs(diff)} g/dL decrease`;
            isImproved = false;
          } else {
            diffText = "Unchanged";
            isImproved = true;
          }
        }

        let status = "Robust Healthy Hemoglobin";
        let colorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        let desc = "Your erythrocyte counts and cellular oxygen binding profiles are normal and highly active.";

        if (val < 11.5) {
          status = "Low Hemoglobin (Anemic Indicator)";
          colorClass = "text-rose-500 bg-rose-500/10 border-rose-500/20";
          desc = "Hemoglobin concentration markers denote mild anemia risks. Augment dietary rich iron loads.";
        } else if (val < 13.0) {
          status = "Mildly Low Hemoglobin";
          colorClass = "text-amber-500 bg-amber-500/10 border-amber-500/20";
          desc = "Hemoglobin level is slightly below generic male target standards. Monitor iron and B12 intake.";
        } else if (val > 17.5) {
          status = "Elevated Hemoglobin Levels";
          colorClass = "text-amber-500 bg-amber-500/10 border-amber-500/20";
          desc = "Hemoglobin concentration markers sit above standard targets. Keep hydration consistent.";
        }

        return {
          title: "Erythrocyte System Evaluation",
          titleShort: "Hemoglobin",
          status,
          colorClass,
          desc,
          healthyRange: "12.0 - 17.5 g/dL",
          currentLabel: "Present Value",
          currentDate,
          currentValueStr: `${val} g/dL`,
          beforeLabel: "Before Value",
          beforeDate,
          beforeValueStr: prevVal !== undefined ? `${prevVal} g/dL` : "No prior record",
          hasBefore,
          diffText,
          isImproved
        };
      }
    }
  };

  const currentEval = getTabEvaluation();

  // 2. Control Suggestions for the selected tab
  const getSelectedTabSuggestions = () => {
    switch (activeMetricTab) {
      case "glucose":
        return {
          title: "Glycemic Stability Guidelines",
          badge: sugarEval.status,
          badgeColor: sugarEval.colorClass,
          bulletPoints: sugarEval.controlPlan
        };
      case "bp":
        const bpStatus = latestMetric.systolicBP >= 130 || latestMetric.diastolicBP >= 80 
          ? "Systolic High / Elevated BP" 
          : "Healthy Normal Blood Pressure";
        return {
          title: "Cardiovascular Pressure Management",
          badge: bpStatus,
          badgeColor: latestMetric.systolicBP >= 130 || latestMetric.diastolicBP >= 80 
            ? "text-red-500 bg-red-500/10 border-red-500/20" 
            : "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
          bulletPoints: [
            "Maintain dietary sodium restrictions. Do not exceed 1,500mg of sodium chloride daily.",
            "Integrate active potassium support via nutrition—bananas, spinach, and avocados help kidneys excrete excess sodium load.",
            "Incorporate 150 minutes of moderate aerobic exercise weekly to enhance vascular wall elasticity."
          ]
        };
      case "cholesterol":
        const cholesStatus = latestMetric.cholesterol >= 200 
          ? "Elevated Lipid Markers (Risk Risk)" 
          : "Healthy Desirable Cholesterol";
        return {
          title: "Lipid Optimization Protocol",
          badge: cholesStatus,
          badgeColor: latestMetric.cholesterol >= 200 
            ? "text-amber-500 bg-amber-500/10 border-amber-500/20" 
            : "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
          bulletPoints: [
            "Constitute premium soluble fiber boundaries in breakfasts: steel-cut oats, organic flaxseed, and pectin-filled apples act as cholesterol physical sponges.",
            "Avoid oxidized trans-fats and excessive fatty processed red meats.",
            "Consider Omega-3 supplements (EPA/DHA) to positively reinforce healthy HDL levels."
          ]
        };
      case "hematology":
        const hemoglobinStatus = latestMetric.hemoglobin < 12.0 
          ? "Low Hemoglobin Alert (Anemia Vulnerability)" 
          : "Robust Healthy Hemoglobin Levels";
        return {
          title: "Erythrocyte Support Details",
          badge: hemoglobinStatus,
          badgeColor: latestMetric.hemoglobin < 12.0 
            ? "text-red-500 bg-red-500/10 border-red-500/20" 
            : "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
          bulletPoints: [
            "Boost dietary iron (leafy greens, legumes, or red meat) alongside organic Vitamin C (lemons, bell peppers) to boost absorption by up to 3x.",
            "Avoid consuming strong calcium sources or tannic black teas concurrently with iron dishes, as they block binding receptors.",
            "Verify vitamin B12 and folate statuses to ensure robust genetic bone marrow red blood cell manufacture."
          ]
        };
    }
  };

  const suggestions = getSelectedTabSuggestions();

  // 3. Percentage Tracker scoring algorithms (Optimal limits based on standard science)
  const computeSugarProgress = (sugar: number) => {
    if (sugar <= 99) return 100;
    return Math.max(25, Math.min(99, Math.round(100 - (sugar - 99) * 1.6)));
  };

  const computeBPProgress = (sys: number, dia: number) => {
    const sysDev = Math.abs(sys - 120);
    const diaDev = Math.abs(dia - 80);
    const totalDev = (sysDev + diaDev) / 2;
    return Math.max(30, Math.min(100, Math.round(100 - totalDev * 1.8)));
  };

  const computeLipidProgress = (choles: number) => {
    if (choles <= 190) return 100;
    return Math.max(20, Math.min(99, Math.round(100 - (choles - 190) * 0.9)));
  };

  const computeHgbProgress = (hgb: number) => {
    const deviation = Math.abs(hgb - 13.5);
    return Math.max(30, Math.min(100, Math.round(100 - deviation * 15)));
  };

  const scoreSugar = computeSugarProgress(latestMetric.bloodSugar);
  const scoreBP = computeBPProgress(latestMetric.systolicBP, latestMetric.diastolicBP);
  const scoreCholes = computeLipidProgress(latestMetric.cholesterol);
  const scoreHgb = computeHgbProgress(latestMetric.hemoglobin);

  const overallWellnessScore = Math.round((scoreSugar + scoreBP + scoreCholes + scoreHgb) / 4);

  return (
    <div className="space-y-8">
      {/* Tracker Card Container */}
      <div className={`p-6 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
        theme === "dark" 
          ? "bg-slate-900/40 border-slate-800/80 text-white" 
          : "bg-gradient-to-br from-white/90 to-slate-50/70 border-cyan-200/60 shadow-[0_4px_24px_rgba(6,182,212,0.06)] text-slate-950 font-medium"
      }`}>
        
        {/* Header and selection tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
                <TrendingUp className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold tracking-tight">Health Timeline Tracker</h3>
            </div>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              Analyze clinical trends over months with live visual chart updates from your uploaded files.
            </p>
          </div>

          {/* Action buttons & Tab Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {onChangeMetrics && (
              <button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-600 text-white transition-all shadow-sm shadow-cyan-500/10 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Record</span>
              </button>
            )}

            <div className={`flex p-1 rounded-lg gap-1 border ${
              theme === "dark" ? "bg-slate-800/60 border-slate-200/20" : "bg-slate-200 border-slate-300"
            }`}>
              {[
                { id: "glucose", label: "Sugar" },
                { id: "bp", label: "BP" },
                { id: "cholesterol", label: "Cholesterol" },
                { id: "hematology", label: "Hemoglobin" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMetricTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded-md text-xs tracking-wide transition-all duration-200 cursor-pointer ${
                    activeMetricTab === tab.id
                      ? theme === "dark"
                        ? "bg-slate-700 text-cyan-400 font-semibold shadow-sm"
                        : "bg-white text-cyan-950 font-black shadow-md border border-cyan-250"
                      : theme === "dark"
                        ? "text-slate-400 hover:text-slate-200 font-semibold"
                        : "text-slate-800 hover:text-black font-extrabold"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inline Manual Logger Form */}
        {isFormOpen && (
          <div className={`mb-6 p-5 rounded-xl border animate-slideDown ${
            theme === "dark" ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}>
            <h4 className="text-sm font-bold flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-cyan-500" />
              <span>Log Manual Health Record Point</span>
            </h4>
            <form onSubmit={handleAddMetricSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Date</label>
                <input 
                  type="text" 
                  placeholder="e.g. Jul 2026, 12 Jun" 
                  value={logDate} 
                  onChange={e => setLogDate(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border bg-transparent border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Fasting Sugar (mg/dL)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 105" 
                  value={logBloodSugar} 
                  onChange={e => setLogBloodSugar(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border bg-transparent border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Systolic BP</label>
                <input 
                  type="number" 
                  placeholder="120" 
                  value={logSystolicBP} 
                  onChange={e => setLogSystolicBP(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border bg-transparent border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Diastolic BP</label>
                <input 
                  type="number" 
                  placeholder="80" 
                  value={logDiastolicBP} 
                  onChange={e => setLogDiastolicBP(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border bg-transparent border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Cholesterol (mg/dL)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 185" 
                  value={logCholesterol} 
                  onChange={e => setLogCholesterol(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border bg-transparent border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Hemoglobin (g/dL)</label>
                <input 
                  type="number" 
                  step="0.1"
                  placeholder="e.g. 13.5" 
                  value={logHemoglobin} 
                  onChange={e => setLogHemoglobin(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border bg-transparent border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Weight (kg)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 64" 
                  value={logWeight} 
                  onChange={e => setLogWeight(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border bg-transparent border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full text-xs p-2 rounded-lg bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-colors cursor-pointer"
                >
                  Save Record Point
                </button>
              </div>
            </form>
          </div>
        )}

        {formSuccessMsg && (
          <div className="mb-4 text-xs p-3 rounded-lg border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{formSuccessMsg}</span>
          </div>
        )}

        {/* Dynamic visual health indicator panel */}
        <div className={`mb-5 p-4 rounded-xl border border-dashed flex flex-col md:flex-row items-start md:items-center gap-4 justify-between transition-all duration-300 ${
          theme === "dark" 
            ? "bg-slate-950/40 border-slate-800" 
            : "bg-slate-50/60 border-slate-200"
        }`}>
          <div className="flex gap-3 items-start w-full md:w-3/5">
            <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5 shrink-0">
              <Activity className="w-4 h-4 animate-pulse" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">{currentEval.title}</h4>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${currentEval.colorClass}`}>
                  {currentEval.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {currentEval.desc}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6 mt-3 md:mt-0 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-200/10 shrink-0">
            <div className="text-left md:text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Optimal Range</span>
              <span className="text-xs font-semibold tracking-wide px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-450 border border-emerald-500/10" style={{ color: "#10b981" }}>
                {currentEval.healthyRange}
              </span>
            </div>

            {currentEval.hasBefore && (
              <div className="text-left md:text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Before ({currentEval.beforeDate})
                </span>
                <span className="text-xs font-semibold tracking-wide px-2.5 py-1 rounded bg-slate-500/10 text-slate-400 border border-slate-500/10">
                  {currentEval.beforeValueStr}
                </span>
              </div>
            )}

            <div className="text-left md:text-right">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                Present ({currentEval.currentDate})
              </span>
              <span className="text-xs font-semibold tracking-wide px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/15" style={{ color: "#06b6d4" }}>
                {currentEval.currentValueStr}
              </span>
              {currentEval.diffText && (
                <div className="text-[10px] mt-1 font-medium text-slate-400">
                  Trend:{" "}
                  <span className={currentEval.isImproved ? "text-emerald-400 font-bold" : "text-amber-500 font-bold"}>
                    {currentEval.isImproved ? "↓ " : "↑ "}{currentEval.diffText}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Chart Box */}
        <div className="h-[280px] w-full">
          {activeMetricTab === "glucose" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(255,255,255,0.06)" : "#e2e8f0"} />
                <XAxis dataKey="date" stroke={theme === "dark" ? "#64748b" : "#475569"} style={{ fontSize: 10 }} />
                <YAxis stroke={theme === "dark" ? "#64748b" : "#475569"} style={{ fontSize: 10 }} domain={[60, 'auto']} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                    borderColor: theme === "dark" ? "#334155" : "#cbd5e1",
                    color: theme === "dark" ? "#f8fafc" : "#0f172a",
                    fontSize: 11,
                    borderRadius: 8
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="bloodSugar" name="Fasting Glucose (mg/dL)" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#glucoseGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeMetricTab === "bp" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="systolicBPGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="diastolicBPGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(255,255,255,0.06)" : "#e2e8f0"} />
                <XAxis dataKey="date" stroke={theme === "dark" ? "#64748b" : "#475569"} style={{ fontSize: 10 }} />
                <YAxis stroke={theme === "dark" ? "#64748b" : "#475569"} style={{ fontSize: 10 }} domain={[65, 'auto']} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                    borderColor: theme === "dark" ? "#334155" : "#cbd5e1",
                    color: theme === "dark" ? "#f8fafc" : "#0f172a",
                    fontSize: 11,
                    borderRadius: 8
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="systolicBP" name="Systolic BP (mmHg)" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#systolicBPGrad)" />
                <Area type="monotone" dataKey="diastolicBP" name="Diastolic BP (mmHg)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#diastolicBPGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeMetricTab === "cholesterol" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cholesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(255,255,255,0.06)" : "#e2e8f0"} />
                <XAxis dataKey="date" stroke={theme === "dark" ? "#64748b" : "#475569"} style={{ fontSize: 10 }} />
                <YAxis stroke={theme === "dark" ? "#64748b" : "#475569"} style={{ fontSize: 10 }} domain={[140, 'auto']} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                    borderColor: theme === "dark" ? "#334155" : "#cbd5e1",
                    color: theme === "dark" ? "#f8fafc" : "#0f172a",
                    fontSize: 11,
                    borderRadius: 8
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="cholesterol" name="Total Cholesterol (mg/dL)" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#cholesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeMetricTab === "hematology" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hemoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(255,255,255,0.06)" : "#e2e8f0"} />
                <XAxis dataKey="date" stroke={theme === "dark" ? "#64748b" : "#475569"} style={{ fontSize: 10 }} />
                <YAxis stroke={theme === "dark" ? "#64748b" : "#475569"} style={{ fontSize: 10 }} domain={[10, 16]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                    borderColor: theme === "dark" ? "#334155" : "#cbd5e1",
                    color: theme === "dark" ? "#f8fafc" : "#0f172a",
                    fontSize: 11,
                    borderRadius: 8
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="hemoglobin" name="Hemoglobin (g/dL)" stroke="#14b8a6" strokeWidth={2.5} fillOpacity={1} fill="url(#hemoGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Dynamic Suggestions & Control Plan Section */}
        <div className={`mt-6 p-4 rounded-xl border text-xs transition-colors duration-300 ${
          theme === "dark" ? "border-slate-800 bg-slate-950/30 text-slate-300" : "border-slate-100 bg-slate-50 text-slate-700"
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 text-[11px] flex items-center gap-2">
              Suggestions to Control {suggestions.title}
            </span>
            <span className={`ml-auto px-2 py-0.5 rounded text-[9px] font-bold border ${suggestions.badgeColor}`}>
              {suggestions.badge}
            </span>
          </div>
          <ul className="space-y-2 mt-2">
            {suggestions.bulletPoints.map((point, idx) => (
              <li key={idx} className="flex gap-2 items-start text-xs leading-relaxed">
                <span className="text-cyan-500 font-bold mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* METRIC ANALYSIS PERCENTAGE TRACKER BOARD (Placed Right below Health Timeline Tracker) */}
      <div className={`p-6 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
        theme === "dark" 
          ? "bg-slate-900/40 border-slate-800/80 text-white" 
          : "bg-gradient-to-br from-white/90 to-slate-50/70 border-cyan-200/60 shadow-[0_4px_24px_rgba(6,182,212,0.06)] text-slate-950 font-medium"
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-indigo-500/10 text-indigo-400">
                <Activity className="w-5 h-5 animate-pulse" />
              </span>
              <h3 className="text-md font-bold tracking-tight">Metabolic Wellness & Progress Tracker</h3>
            </div>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              Calculated real-time safety indices benchmarking clinical normalcy targets.
            </p>
          </div>
          
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Overall Score</span>
            <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              {overallWellnessScore}%
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 transition-all duration-1000"
            style={{ width: `${overallWellnessScore}%` }}
          />
        </div>

        {/* Four Core Metric Percentage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Sugar Optimization Card */}
          <div className={`p-4 rounded-xl border relative overflow-hidden ${
            theme === "dark" ? "bg-slate-950/25 border-slate-800" : "bg-slate-50 border-slate-150"
          }`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sugar Adherence</span>
              <span className={`text-xs font-black ${
                scoreSugar >= 90 ? "text-emerald-500" : scoreSugar >= 70 ? "text-amber-500" : "text-red-500"
              }`}>{scoreSugar}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mb-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  scoreSugar >= 90 ? "bg-emerald-500" : scoreSugar >= 70 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${scoreSugar}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 block leading-tight">
              Glucose value is {latestMetric.bloodSugar} mg/dL (Normal: &lt;100).
            </span>
          </div>

          {/* Blood Pressure Progress Card */}
          <div className={`p-4 rounded-xl border relative overflow-hidden ${
            theme === "dark" ? "bg-slate-950/25 border-slate-800" : "bg-slate-50 border-slate-150"
          }`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">BP Management</span>
              <span className={`text-xs font-black ${
                scoreBP >= 90 ? "text-emerald-500" : scoreBP >= 70 ? "text-amber-500" : "text-red-500"
              }`}>{scoreBP}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mb-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  scoreBP >= 90 ? "bg-emerald-500" : scoreBP >= 70 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${scoreBP}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 block leading-tight">
              Averages {latestMetric.systolicBP}/{latestMetric.diastolicBP} mmHg (Target: 120/80).
            </span>
          </div>

          {/* Lipid Quality Card */}
          <div className={`p-4 rounded-xl border relative overflow-hidden ${
            theme === "dark" ? "bg-slate-950/25 border-slate-800" : "bg-slate-50 border-slate-150"
          }`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lipid Control</span>
              <span className={`text-xs font-black ${
                scoreCholes >= 90 ? "text-emerald-500" : scoreCholes >= 70 ? "text-amber-500" : "text-red-500"
              }`}>{scoreCholes}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mb-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  scoreCholes >= 90 ? "bg-emerald-500" : scoreCholes >= 70 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${scoreCholes}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 block leading-tight">
              Cholesterol registers {latestMetric.cholesterol} mg/dL (Target: &lt;190).
            </span>
          </div>

          {/* Hemoglobin Abundance Card */}
          <div className={`p-4 rounded-xl border relative overflow-hidden ${
            theme === "dark" ? "bg-slate-950/25 border-slate-800" : "bg-slate-50 border-slate-150"
          }`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Hemoglobin Level</span>
              <span className={`text-xs font-black ${
                scoreHgb >= 90 ? "text-emerald-500" : scoreHgb >= 70 ? "text-amber-500" : "text-red-500"
              }`}>{scoreHgb}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mb-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  scoreHgb >= 90 ? "bg-emerald-500" : scoreHgb >= 70 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${scoreHgb}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 block leading-tight">
              Count analyzed is {latestMetric.hemoglobin} g/dL (Target: 13.5).
            </span>
          </div>

        </div>

        {/* Informative Guidance footer banner */}
        <div className="mt-5 flex gap-2 items-start text-xs text-slate-400/80 leading-normal bg-slate-100/50 dark:bg-slate-950/10 p-3 rounded-lg border border-slate-200/10">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>These scores represent an aggregated wellness estimation compared directly to normal clinical reference guidelines. Please consult with a physician regarding changes in prescription timing or dosages.</span>
        </div>

      </div>
    </div>
  );
}
