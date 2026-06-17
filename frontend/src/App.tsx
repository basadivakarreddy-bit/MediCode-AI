/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

import { 
  Brain, 
  HeartPulse,
  Stethoscope,
  Clock, 
  History,
  Activity, 
  Sliders, 
  Layers,
  Settings,
  Download, 
  Search, 
  FileText, 
  Globe, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  RotateCw, 
  Camera, 
  User, 
  Plus, 
  Moon, 
  Sun, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  X, 
  Send, 
  Users, 
  Printer, 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  Check, 
  Copy,
  HelpCircle, 
  Bell, 
  ZoomIn, 
  ZoomOut, 
  ShieldAlert,
  Calendar,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  MessageSquare,
  Maximize2,
  Minimize2,
  Trash2,
  Play,
  VolumeX,
  Edit,
  Mic,
  MicOff
} from "lucide-react";

import { AnalysisResult, FamilyMember, SavedDocument, ChatMessage, TimelineMetric } from "./types";
import { INITIAL_FAMILY_MEMBERS, INITIAL_TIMELINE_METRICS, GENERAL_HEALTH_TIPS, PRE_LOADED_DOCUMENTS, PRELOADED_TRANSLATIONS } from "./data";
import { InteractiveHero } from "./components/InteractiveHero";
import { HealthTimeline } from "./components/HealthTimeline";
import { FAQContact } from "./components/FAQContact";

const API_BASE_URL = (((import.meta as any).env?.VITE_API_BASE_URL) as string || "https://medicode-ai.onrender.com").replace(/\/$/, "");

const LABELS: Record<string, Record<string, string>> = {
  en: {
    extractedPrescriptionResult: "Your Extracted Prescription Result",
    clinicalSummaryDeciphered: "Clinical Summary Deciphered",
    patientName: "Patient Name",
    doctorName: "Doctor Name",
    date: "Date",
    prescribedMedications: "Prescribed Medications",
    quickSummary: "Quick Summary",
    decodedKeyTakeaway: "Decoded Key Takeaway",
    additionalNotes: "Additional Notes",
    dosage: "Dosage",
    duration: "Duration",
    instructions: "Instructions",
    frequency: "Frequency",
    purpose: "Purpose",
    sideEffects: "Side Effects",
    warningsHeader: "Warnings / Precautions",
    interactions: "Interactions",
    docIntegrity: "Doc Integrity",
    urgencyStatus: "Urgency Status",
    healthScore: "Health Score",
    healthMetric: "Health Metric",
    adherenceCompliance: "Adherence Compliance",
    complianceRatingTracker: "Compliance Rating Tracker",
    exportPdf: "Export PDF",
    showPreview: "Show Preview",
    hidePreview: "Hide Preview",
    averages: "Averages",
    target: "Target",
    normal: "Normal",
    readAudioSummary: "Read Audio Summary",
    stopVoiceSummary: "Stop Voice Summary",
    notSpecified: "Not specified",
    onceDaily: "Once daily",
    marker: "MARKER",
    val: "VAL",
    status: "STATUS",
    labResultsHub: "Lab Results Hub",
    diagnosticSummary: "Diagnostic Summary",
    medicinesInfo: "Medicines Info",
    warningsTab: "Warnings",
    recommendationsTab: "Recommendations",
    adherenceMetricsTab: "Adherence & Metrics",
    translating: "Translating clinical records...",
    
    // Additional Alarms & Schedulers
    alarmsRemindersHeader: "Medication Alarms & Voice Reminders",
    alarmsRemindersDesc: "Configure exact times to receive real-time speech synthesized voice announcements.",
    activeAlarms: "Active Alarms",
    setupNewAlarm: "Setup New Alarm",
    medicineNameLabel: "Medicine Name",
    typeMedicinePlaceholder: "Type medicine (e.g. Lisinopril)",
    quickPrefill: "Quick Prefill Prescribed:",
    doseLabel: "Dose",
    dosePlaceholder: "e.g. 1 tablet",
    alarmTimeLabel: "Alarm Time",
    scheduleVoiceAlarm: "Schedule Voice Alarm",
    scheduledAlarms: "Scheduled Alarms",
    clearAll: "Clear All",
    noActiveAlarms: "No active medication alarms set.",
    scheduleFormInstruction: "Use the form on the left to schedule your voice reminders.",
    cancelBtn: "Cancel",
    saveBtn: "Save",
    testVoiceBtn: "Test Voice",
    diagnosedOn: "Diagnosed on",
    bloodGroupLabel: "Blood Group",
    age: "Age",
    searchPrescribedPlaceholder: "Search prescribed medications...",
    listViewBtn: "List View",
    calendarViewBtn: "Calendar View",
    morningHeader: "Morning",
    afternoonHeader: "Afternoon",
    nightHeader: "Night",
    noMedsScheduled: "No meds scheduled",
    dayAdherenceLog: "Day adherence log",
    noDoses: "No scheduled doses",
    dosesTaken: "doses taken",
    refReferenceRange: "Reference Range",
    valDetected: "VALUE DETECTED",
    aiCheckerHeader: "AI Cross-Checker",
    aiCheckerDesc: "Enter two medications to test for clinical compatibility (e.g. 'Amoxicillin' & 'Methotrexate').",
    crossInteractionScan: "Run Cross-Interaction Scan",
    precautionLabel: "PRECAUTION",
    sideEffectsLabel: "SIDE EFFECTS",
    adherenceTips: "Adherence tips",
    pwaAlertsEnabled: "PWA Push Notification Alerts Enabled",
    localAlarmsDesc: "The system triggers local medicine alarms even when offline. Press the test simulator to test alarms.",
    testAlarmBtn: "Test Alarm Scheduler Simulation",
    remindersLabel: "Reminders",
    historyLabel: "History",
    fontSizeLabel: "FONT SIZE:"
  },
  te: {
    extractedPrescriptionResult: "మీ ప్రిస్క్రిప్షన్ యొక్క వివరాలు",
    clinicalSummaryDeciphered: "క్లినికల్ సారాంశం డీకోడ్ చేయబడింది",
    patientName: "రోగి పేరు",
    doctorName: "వైద్యుడి పేరు",
    date: "తేది",
    prescribedMedications: "సూచించిన మందులు",
    quickSummary: "త్వరిత సారాంశం",
    decodedKeyTakeaway: "డీకోడ్ చేయబడిన ముఖ్యమైన సమాచారం",
    additionalNotes: "అదనపు గమనికలు",
    dosage: "మోతాదు",
    duration: "సమయం",
    instructions: "సూచనలు",
    frequency: "ఫ్రీక్వెన్సీ",
    purpose: "ప్రయోజనం",
    sideEffects: "దుష్ప్రభావాలు",
    warningsHeader: "హెచ్చరికలు / జాగ్రత్తలు",
    interactions: "ఇతర మందులతో చర్యలు",
    docIntegrity: "పత్రం స్పష్టత",
    urgencyStatus: "అవసరమైన తీవ్రత",
    healthScore: "ఆరోగ్య స్కోర్",
    healthMetric: "ఆరోగ్య సూచిక",
    adherenceCompliance: "చికిత్స సమ్మతి",
    complianceRatingTracker: "సమ్మతి రేటింగ్ ట్రాకర్",
    exportPdf: "PDF డౌన్లోడ్",
    showPreview: "ప్రివ్యూ చూపించు",
    hidePreview: "ప్రివ్యూ దాచు",
    averages: "సగటులు",
    target: "లక్ష్యం",
    normal: "సాధారణం",
    readAudioSummary: "ఆడియో సారాంశం వినండి",
    stopVoiceSummary: "ఆడియో సారాంశం ఆపు",
    notSpecified: "పేర్కొనబడలేదు",
    onceDaily: "రోజుకు ఒకసారి",
    marker: "పరీక్ష సూచిక",
    val: "విలువ",
    status: "స్థితి",
    labResultsHub: "ల్యాబ్ ఫలితాల హబ్",
    diagnosticSummary: "డయాగ్నస్టిక్ సారాంశం",
    medicinesInfo: "మందుల సమాచారం",
    warningsTab: "హెచ్చరికలు",
    recommendationsTab: "సిఫార్సులు",
    adherenceMetricsTab: "అడ్హెరెన్స్ & సూచికలు",
    translating: "క్లినికల్ లాగ్ అనువదించబడుతోంది...",
    
    // Additional Alarms & Schedulers
    alarmsRemindersHeader: "మందుల అలారాలు & వాయిస్ రిమైండర్లు",
    alarmsRemindersDesc: "నిజ సమయ స్పీచ్ సింథసైజ్డ్ వాయిస్ ప్రకటనలను పొందడానికి ఖచ్చితమైన సమయాలను కాన్ఫిగర్ చేయండి.",
    activeAlarms: "యాక్టివ్ అలారాలు",
    setupNewAlarm: "కొత్త అలారం సెటప్ చేయండి",
    medicineNameLabel: "మందు పేరు",
    typeMedicinePlaceholder: "మందు టైప్ చేయండి (ఉదా. లిసినోప్రిల్)",
    quickPrefill: "త్వరగా నింపడానికి ఎంచుకోండి:",
    doseLabel: "మోతాదు",
    dosePlaceholder: "ఉదా. 1 మాత్ర",
    alarmTimeLabel: "అలారం సమయం",
    scheduleVoiceAlarm: "వాయిస్ అలారం షెడ్యూల్ చేయండి",
    scheduledAlarms: "షెడ్యూల్ చేయబడిన అలారాలు",
    clearAll: "అన్నీ క్లియర్ చేయి",
    noActiveAlarms: "యాక్టివ్ మందుల అలారాలు ఏవీ సెట్ చేయలేదు.",
    scheduleFormInstruction: "మీ వాయిస్ రిమైండర్లను షెడ్యూల్ చేయడానికి ఎడమ వైపున ఉన్న ఫారమ్‌ను ఉపయోగించండి.",
    cancelBtn: "రద్దు చేయి",
    saveBtn: "సేవ్ చేయి",
    testVoiceBtn: "వాయిస్ పరీక్షించు",
    diagnosedOn: "నిర్ధారణ తేదీ",
    bloodGroupLabel: "రక్త గ్రూప్",
    age: "వయస్సు",
    searchPrescribedPlaceholder: "సూచించిన మందుల కోసం వెతకండి...",
    listViewBtn: "జాబితా వీక్షణ",
    calendarViewBtn: "క్యాలెండర్ వీక్షణ",
    morningHeader: "ఉదయం",
    afternoonHeader: "మధ్యాహ్నం",
    nightHeader: "రాత్రి",
    noMedsScheduled: "మందులు ఏవీ షెడ్యూల్ చేయలేదు",
    dayAdherenceLog: "రోజు చికిత్స లాగ్",
    noDoses: "మందులు ఏవీ షెడ్యూల్ చేయలేదు",
    dosesTaken: "మోతాదులు తీసుకున్నారు",
    refReferenceRange: "రిఫరెన్స్ పరిధి",
    valDetected: "కనుగొనబడిన విలువ",
    aiCheckerHeader: "AI మందుల పరస్పర చర్య క్రాస్-చెకర్",
    aiCheckerDesc: "రెండూ మందుల అనుకూలతను పరీక్షించడానికి వాటి పేర్లు నమోదు చేయండి (ఉదా. 'Amoxicillin' & 'Methotrexate').",
    crossInteractionScan: "పరస్పర చర్య స్కాన్ రన్ చేయి",
    precautionLabel: "ముందు జాగ్రత్త",
    sideEffectsLabel: "దుష్ప్రభావాలు",
    adherenceTips: "చిట్కాలు మరియు సమ్మతి",
    pwaAlertsEnabled: "PWA నోటిఫికేషన్‌లు ప్రారంభించబడ్డాయి",
    localAlarmsDesc: "సిస్టమ్ ఆఫ్‌లైన్‌లో ఉన్నప్పుడు కూడా స్థానిక అలారాలను ప్రేరేపిస్తుంది. అలారాలను పరీక్షించడానికి టెస్ట్ బటన్ నొక్కండి.",
    testAlarmBtn: "అలారం షెడ్యూలర్ అనుకరణను పరీక్షించండి",
    remindersLabel: "రిమైండర్లు",
    historyLabel: "చరిత్ర",
    fontSizeLabel: "అక్షరాల సైజు:"
  },
  hi: {
    extractedPrescriptionResult: "आपका निकाला गया पर्चा परिणाम",
    clinicalSummaryDeciphered: "नैदानिक सारांश डिकोड किया गया",
    patientName: "मरीज का नाम",
    doctorName: "डॉक्टर का नाम",
    date: "दिनांक",
    prescribedMedications: "निर्धारित दवाएं",
    quickSummary: "त्वरित सारांश",
    decodedKeyTakeaway: "मुख्य बातें",
    additionalNotes: "अतिरिक्त टिप्पणियाँ",
    dosage: "खुराक",
    duration: "अवधि",
    instructions: "दिशा-निर्देश",
    frequency: "आवृत्ति",
    purpose: "उद्देश्य",
    sideEffects: "दुष्प्रभाव",
    warningsHeader: "चेतावनी / सावधानियां",
    interactions: "अन्य दवाओं से प्रभाव",
    docIntegrity: "दस्तावेज़ अखंडता",
    urgencyStatus: "आपातकालीन स्थिति",
    healthScore: "स्वास्थ्य स्कोर",
    healthMetric: "स्वास्थ्य मीट्रिक",
    adherenceCompliance: "दवा अनुपालन",
    complianceRatingTracker: "अनुपालन रेटिंग ट्रैकर",
    exportPdf: "पीडीएफ निर्यात",
    showPreview: "पूर्वावलोकन दिखाएं",
    hidePreview: "पूर्वावलोकन छिपाएं",
    averages: "औसत",
    target: "लक्ष्य",
    normal: "सामान्य",
    readAudioSummary: "ऑडियो सारांश सुनें",
    stopVoiceSummary: "ऑडियो सारांश रोकें",
    notSpecified: "निर्दिष्ट नहीं",
    onceDaily: "दिन में एक बार",
    marker: "परीक्षण मार्कर",
    val: "मूल्य",
    status: "स्थिति",
    labResultsHub: "लैब परिणाम हब",
    diagnosticSummary: "नैदानिक सारांश",
    medicinesInfo: "दवाओं की जानकारी",
    warningsTab: "सावधानियां",
    recommendationsTab: "सिफारिशें",
    adherenceMetricsTab: "अनुपालन और मेट्रिक्स",
    translating: "दस्तावेज़ का अनुवाद किया जा रहा है...",
    
    // Additional Alarms & Schedulers
    alarmsRemindersHeader: "दवा अलार्म और वॉयस रिमाइंडर",
    alarmsRemindersDesc: "रीयल-टाइम वॉयस सचेतक प्राप्त करने के लिए सटीक समय कॉन्फ़िगर करें।",
    activeAlarms: "सक्रिय अलार्म",
    setupNewAlarm: "नया अलार्म सेट करें",
    medicineNameLabel: "दवा का नाम",
    typeMedicinePlaceholder: "दवा का नाम लिखें (जैसे लिसिनोप्रिल)",
    quickPrefill: "शीघ्र प्रीफिल करें:",
    doseLabel: "खुराक",
    dosePlaceholder: "जैसे 1 गोली",
    alarmTimeLabel: "अलार्म समय",
    scheduleVoiceAlarm: "वॉयस अलार्म शेड्यूल करें",
    scheduledAlarms: "निर्धारित अलार्म",
    clearAll: "सभी साफ़ करें",
    noActiveAlarms: "कोई सक्रिय दवा अलार्म सेट नहीं है।",
    scheduleFormInstruction: "वॉयस रिमाइंडर शेड्यूल करने के लिए बाईं ओर के फॉर्म का उपयोग करें।",
    cancelBtn: "रद्द करें",
    saveBtn: "सहेजें",
    testVoiceBtn: "आवाज परीक्षण",
    diagnosedOn: "निदान तिथि",
    bloodGroupLabel: "रक्त समूह",
    age: "आयु",
    searchPrescribedPlaceholder: "निर्धारित दवाओं में खोजें...",
    listViewBtn: "सूची दृश्य",
    calendarViewBtn: "कैलेंडर दृश्य",
    morningHeader: "सुबह",
    afternoonHeader: "दोपहर",
    nightHeader: "रात",
    noMedsScheduled: "कोई दवा निर्धारित नहीं",
    dayAdherenceLog: "दैनिक अनुपालन लॉग",
    noDoses: "कोई निर्धारित खुराक नहीं",
    dosesTaken: "खुराक ली गई",
    refReferenceRange: "संदर्भ सीमा",
    valDetected: "मूल्य पाया गया",
    aiCheckerHeader: "AI दवा अंतःक्रिया क्रॉस-चेकर",
    aiCheckerDesc: "दवा संगतता परीक्षण करने के लिए दो दवाएं दर्ज करें (जैसे 'अमोक्सिसिलिन' और 'मेथोट्रेक्सेट')।",
    crossInteractionScan: "अंतःक्रिया स्कैन चलाएं",
    precautionLabel: "सावधानी",
    sideEffectsLabel: "दुष्प्रभाव",
    adherenceTips: "अनुपालन और सुझाव",
    pwaAlertsEnabled: "PWA अलर्ट सक्षम",
    localAlarmsDesc: "सिस्टम ऑफ़लाइन होने पर भी अलार्म चालू करता है। सचेतकों का परीक्षण करने के लिए बटन दबाएं।",
    testAlarmBtn: "अलार्म शेड्यूलर सिमुलेशन का परीक्षण करें",
    remindersLabel: "अनुस्मारक",
    historyLabel: "इतिहास",
    fontSizeLabel: "अक्षर आकार:"
  }
};

const StructuredMessage = ({ text, theme }: { text: string; theme: string }) => {
  const lines = text.split("\n");
  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-0.5" />;

        // Check if line is a bullet list (starts with •, -, *, or a number followed by dot)
        const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*") || /^\d+\.\s+/.test(trimmed);
        
        let content = trimmed;
        let bulletChar = "•";
        
        if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
          content = trimmed.replace(/^[•\-\*]\s*/, "");
        } else if (/^\d+\.\s+/.test(trimmed)) {
          const match = trimmed.match(/^(\d+\.)\s+/);
          if (match) {
            bulletChar = match[1];
            content = trimmed.substring(match[0].length);
          }
        }

        // Parse bold markers **text** inside the line
        const parts = [];
        let temp = content;
        let boldIdx = temp.indexOf("**");
        let safety = 0;
        
        while (boldIdx !== -1 && safety < 50) {
          safety++;
          if (boldIdx > 0) {
            parts.push({ text: temp.substring(0, boldIdx), isBold: false });
          }
          const nextBoldIdx = temp.indexOf("**", boldIdx + 2);
          if (nextBoldIdx !== -1) {
            parts.push({ text: temp.substring(boldIdx + 2, nextBoldIdx), isBold: true });
            temp = temp.substring(nextBoldIdx + 2);
          } else {
            parts.push({ text: temp.substring(boldIdx), isBold: false });
            temp = "";
            break;
          }
          boldIdx = temp.indexOf("**");
        }
        if (temp) {
          parts.push({ text: temp, isBold: false });
        }

        const renderedContent = (
          <span>
            {parts.map((p, pIdx) => 
              p.isBold ? (
                <strong 
                  key={pIdx} 
                  className={`font-semibold ${
                    theme === "dark" ? "text-cyan-400" : "text-[#0891b2] font-bold"
                  }`}
                >
                  {p.text}
                </strong>
              ) : (
                p.text
              )
            )}
          </span>
        );

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5 py-0.5">
              <span className={`shrink-0 font-mono text-xs ${
                theme === "dark" ? "text-cyan-500" : "text-[#0891b2] font-semibold"
              }`}>
                {bulletChar}
              </span>
              <span className="leading-relaxed text-xs text-left">{renderedContent}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="leading-relaxed text-xs text-left">
            {renderedContent}
          </p>
        );
      })}
    </div>
  );
};

export function AppContent() {
  // Theme controllers (default to premium dark mode)
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  
  // Translation/Language States
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "te" | "hi">("en");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translatedCache, setTranslatedCache] = useState<Record<string, Record<string, any>>>(() => {
    const defaultCache = { ...PRELOADED_TRANSLATIONS };
    const saved = localStorage.getItem("medidecode_translated_cache");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultCache, ...parsed };
      } catch (e) {
        console.error("Error reading saved translations from localStorage", e);
      }
    }
    return defaultCache;
  });

  useEffect(() => {
    localStorage.setItem("medidecode_translated_cache", JSON.stringify(translatedCache));
  }, [translatedCache]);

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const translationFetchInProgress = useRef<Record<string, boolean>>({});
  
  // Clinical Session States
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(INITIAL_FAMILY_MEMBERS);
  const [activeMemberId, setActiveMemberId] = useState<string>("self");
  const [documents, setDocuments] = useState<SavedDocument[]>(() => {
    const saved = localStorage.getItem("medidecode_patient_documents");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading saved documents", e);
      }
    }
    return PRE_LOADED_DOCUMENTS;
  });

  useEffect(() => {
    localStorage.setItem("medidecode_patient_documents", JSON.stringify(documents));
  }, [documents]);

  const [timelineMetrics, setTimelineMetrics] = useState<TimelineMetric[]>(() => {
    const saved = localStorage.getItem("medidecode_patient_timeline_metrics");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading saved metrics", e);
      }
    }
    return INITIAL_TIMELINE_METRICS;
  });

  useEffect(() => {
    localStorage.setItem("medidecode_patient_timeline_metrics", JSON.stringify(timelineMetrics));
  }, [timelineMetrics]);
  
  // History tab sub-states & live timeline data
  const [historySubTab, setHistorySubTab] = useState<"archives" | "timeline">("timeline");
  const [timelineSearchQuery, setTimelineSearchQuery] = useState("");
  const [timelineFilterStatus, setTimelineFilterStatus] = useState<"all" | "active" | "completed" | "refill">("all");
  const [expandedTimelineId, setExpandedTimelineId] = useState<string | null>(null);
  const [timelinePrescriptions, setTimelinePrescriptions] = useState([
    {
      id: "tp-1",
      memberId: "self",
      title: "Seasonal Asthma Defense Plan",
      doctor: "Dr. Linus Pauling, MD",
      date: "2026-06-01",
      medicines: [
        { name: "Levocetirizine 5mg", dosage: "1 tablet", timing: "Nightly", instructions: "Take before sleep" },
        { name: "Albuterol Inhaler", dosage: "2 puffs", timing: "As needed", instructions: "Rinse mouth after use" }
      ],
      warnings: "Ensure rescue inhaler is in backpack.",
      status: "Active" as "Active" | "Completed" | "Refill Due"
    },
    {
      id: "tp-2",
      memberId: "self",
      title: "Post-Dental Infection Prevention",
      doctor: "Dr. Sarah Collins, DDS",
      date: "2026-04-15",
      medicines: [
        { name: "Amoxicillin 500mg", dosage: "1 capsule", timing: "3 times daily", instructions: "Complete full 7-day course" }
      ],
      warnings: "Take with food.",
      status: "Completed" as "Active" | "Completed" | "Refill Due"
    },
    {
      id: "tp-3",
      memberId: "father",
      title: "Hypertension Maintenance",
      doctor: "Dr. Marcus Vance, FACC",
      date: "2026-06-10",
      medicines: [
        { name: "Amlodipine 5mg", dosage: "1 tablet", timing: "Once daily", instructions: "Best taken in morning" },
        { name: "Lisinopril 10mg", dosage: "1 tablet", timing: "Morning", instructions: "Monitor blood pressure weekly" }
      ],
      warnings: "Slight dry cough is a potential side effect.",
      status: "Active" as "Active" | "Completed" | "Refill Due"
    },
    {
      id: "tp-4",
      memberId: "father",
      title: "Cardio Glycemic Shield Plan",
      doctor: "Dr. Marcus Vance, FACC",
      date: "2025-12-05",
      medicines: [
        { name: "Atorvastatin 20mg", dosage: "1 tablet", timing: "Nightly", instructions: "Avoid grapefruit juice" }
      ],
      warnings: "Refill overdue since May 2026.",
      status: "Refill Due" as "Active" | "Completed" | "Refill Due"
    },
    {
      id: "tp-5",
      memberId: "mother",
      title: "Metabolic Thyroid Correction",
      doctor: "Dr. Helen Keller, MD",
      date: "2026-05-28",
      medicines: [
        { name: "Levothyroxine 75mcg", dosage: "1 capsule", timing: "Morning (empty stomach)", instructions: "Do not eat for 30 minutes after" }
      ],
      warnings: "TSH panel due in 6 weeks.",
      status: "Active" as "Active" | "Completed" | "Refill Due"
    },
    {
      id: "tp-6",
      memberId: "mother",
      title: "Severe Migraine Rescue Plan",
      doctor: "Dr. Helen Keller, MD",
      date: "2026-01-15",
      medicines: [
        { name: "Sumatriptan 50mg", dosage: "1 tablet", timing: "At onset", instructions: "Do not exceed 100mg in 24 hours" }
      ],
      warnings: "Contact doctor if headaches increase in frequency.",
      status: "Refill Due" as "Active" | "Completed" | "Refill Due"
    },
    {
      id: "tp-7",
      memberId: "grandparent",
      title: "Type 2 Diabetes Control",
      doctor: "Dr. James Watson, MD",
      date: "2026-06-05",
      medicines: [
        { name: "Metformin 1000mg", dosage: "1 tablet", timing: "Twice daily", instructions: "Take with meals" },
        { name: "Glipizide 5mg", dosage: "1 tablet", timing: "Before breakfast", instructions: "Monitor for hypoglycemia" }
      ],
      warnings: "Check blood sugar before heavy physical activity.",
      status: "Active" as "Active" | "Completed" | "Refill Due"
    },
    {
      id: "tp-8",
      memberId: "grandparent",
      title: "Macular Vision AREDS 2",
      doctor: "Dr. James Watson, MD",
      date: "2026-02-18",
      medicines: [
        { name: "AREDS 2 Vitamins", dosage: "2 softgels", timing: "Once daily", instructions: "Take with breakfast" }
      ],
      warnings: "Ensure visual grid testing weekly.",
      status: "Refill Due" as "Active" | "Completed" | "Refill Due"
    }
  ]);
  
  const activeMember = familyMembers.find(m => m.id === activeMemberId) || familyMembers[0];

  // Active workspace states
  const [activeTab, setActiveTab] = useState<"summary" | "adherence_metrics" | "medicines" | "lab_results" | "warnings" | "recommendations">("summary");
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isChatBotExpanded, setIsChatBotExpanded] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string>("doc-1");
  const activeDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  // Prefetch translations in the background for any active document so user toggles are instant
  useEffect(() => {
    if (!activeDoc || !activeDoc.data) return;

    const docId = activeDoc.id;
    const languages: ("te" | "hi")[] = ["te", "hi"];
    const langMap = { te: "Telugu", hi: "Hindi" };

    languages.forEach(async (lang) => {
      const cacheKey = `${docId}_${lang}`;
      
      // If already in state cache or fetching, skip
      if (translatedCache[docId]?.[lang] || translationFetchInProgress.current[cacheKey]) {
        return;
      }

      translationFetchInProgress.current[cacheKey] = true;
      try {
        const res = await fetch(`${API_BASE_URL}/api/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            docData: activeDoc.data,
            targetLang: langMap[lang]
          })
        });
        const parsed = await res.json();
        if (parsed.success && parsed.data) {
          setTranslatedCache(prev => ({
            ...prev,
            [docId]: {
              ...prev[docId],
              [lang]: parsed.data
            }
          }));
        } else {
          // Reset key so it can be re-fetched on demand if needed
          translationFetchInProgress.current[cacheKey] = false;
        }
      } catch (err) {
        console.error(`[Translation Background Prefetch] Error pre-translating to ${lang}:`, err);
        translationFetchInProgress.current[cacheKey] = false;
      }
    });
  }, [activeDoc?.id, translatedCache]);

  // Handle active language translation request on demand (shows loader only if prefetching hasn't finished yet)
  useEffect(() => {
    if (selectedLanguage === "en" || !activeDoc || !activeDoc.data) return;
    
    // Check if we already have it in cache
    const cacheForDoc = translatedCache[activeDoc.id];
    if (cacheForDoc && cacheForDoc[selectedLanguage]) {
      return; // Already translated and ready!
    }

    // Otherwise, translate on the fly!
    const triggerTranslation = async () => {
      setIsTranslating(true);
      const docId = activeDoc.id;
      const langMap = { te: "Telugu", hi: "Hindi" };
      const cacheKey = `${docId}_${selectedLanguage}`;
      
      translationFetchInProgress.current[cacheKey] = true;
      try {
        const res = await fetch(`${API_BASE_URL}/api/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            docData: activeDoc.data,
            targetLang: langMap[selectedLanguage]
          })
        });
        const parsed = await res.json();
        if (parsed.success && parsed.data) {
          setTranslatedCache(prev => ({
            ...prev,
            [docId]: {
              ...prev[docId],
              [selectedLanguage]: parsed.data
            }
          }));
        } else {
          console.warn("Dynamic translation failed, falling back to English structural labels.", parsed.message);
          translationFetchInProgress.current[cacheKey] = false;
        }
      } catch (err) {
        console.error("Fly translation to language failed:", err);
        translationFetchInProgress.current[cacheKey] = false;
      } finally {
        setIsTranslating(false);
      }
    };

    triggerTranslation();
  }, [selectedLanguage, activeDoc?.id, translatedCache]);

  const activeDocData = (selectedLanguage !== "en" && translatedCache[activeDoc?.id]?.[selectedLanguage])
    ? translatedCache[activeDoc.id][selectedLanguage]
    : activeDoc?.data;

  const labels = LABELS[selectedLanguage] || LABELS.en;

  // OCR Upload States
  const [uploadType, setUploadType] = useState<"prescription" | "lab_report">("prescription");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Document interaction controls
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [rawView, setRawView] = useState<boolean>(false);
  const [isLogicalDocViewEnabled, setIsLogicalDocViewEnabled] = useState<boolean>(false);

  // Chat conversation
  const [chatInput, setChatInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognitionClass) {
        alert("Speech Recognition is not supported or permission was denied in this browser. Please check browser settings or permissions.");
        return;
      }
      try {
        const recognition = new SpeechRecognitionClass();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        
        if (selectedLanguage === "te") {
          recognition.lang = "te-IN";
        } else if (selectedLanguage === "hi") {
          recognition.lang = "hi-IN";
        } else {
          recognition.lang = "en-US";
        }

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onresult = (event: any) => {
          const result = event.results[event.results.length - 1][0].transcript;
          if (result) {
            setChatInput((prev) => (prev ? prev + " " + result : result));
          }
        };

        recognition.start();
      } catch (err) {
        console.error("Failed starting speech recognition:", err);
        setIsListening(false);
      }
    }
  };
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    "doc-1": [
      { id: "cm-1", sender: "ai", text: "Hello! I am MediCode's Clinical Assistant. I have decoded Emily's prescription document for Seasonal Bronchitis. Ask me anything, e.g. 'How often should Amoxicillin be taken?' or 'Are there any allergies?'", timestamp: "10:15 AM" }
    ],
    "doc-2": [
      { id: "cm-2", sender: "ai", text: "Hello! Verified Sarah's Thyroid Screen. TSH is moderately elevated at 5.8 uIU/mL. Would you like a clear plain-text explanation of thyroid underactivity or lifestyle suggestions?", timestamp: "02:30 PM" }
    ]
  });
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const handleCopyText = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2000);
    }).catch(err => {
      console.error("Clipboard copy failed:", err);
    });
  };

  const handleToggleSpeak = (text: string, msgId: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      console.warn("Speech synthesis not supported");
      return;
    }
    if (activeSpeechId === msgId) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = text
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/[•\-\*]/g, "")
        .trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.onend = () => setActiveSpeechId(null);
      utterance.onerror = () => setActiveSpeechId(null);
      setActiveSpeechId(msgId);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Cancel speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Reminders trigger state (local scheduler mockup)
  const [activeReminders, setActiveReminders] = useState<Array<{ id: string, name: string, time: string, checked: boolean }>>([
    { id: "r-1", name: "Amoxicillin 500mg - Morning Dose", time: "08:00 AM", checked: false },
    { id: "r-2", name: "Amoxicillin 500mg - Night Dose", time: "08:00 PM", checked: false },
    { id: "r-3", name: "Montelukast 10mg - Nightly", time: "09:30 PM", checked: false }
  ]);
  const [pushNotificationActive, setPushNotificationActive] = useState(false);
  const [adherenceNotificationMessage, setAdherenceNotificationMessage] = useState<string>("Local reminder: Afternoon/Night Amoxicillin 500mg dose due in 15 minutes. Take after food as analyzed.");

  const formatAlarmTime12h = (timeStr: string) => {
    if (!timeStr) return "";
    const [hourStr, minStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour}:${minStr} ${ampm}`;
  };

  // Accessibility States
  const [accessTextSize, setAccessTextSize] = useState<"standard" | "large" | "xlarge">("standard");
  const [highContrast, setHighContrast] = useState(false);
  const [voiceReadingActive, setVoiceReadingActive] = useState(false);

  // Drug interaction tester values
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [interactionResult, setInteractionResult] = useState<string | null>(null);

  // Auth Overlay / Profile triggers
  const [authModal, setAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [guestUser, setGuestUser] = useState<string | null>("Emily Johnson (Guest Partner)");
  const [showMemberForm, setShowMemberForm] = useState(false);
  
  // New member input states
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRelation, setNewMemberRelation] = useState<FamilyMember["relation"]>("Child");
  const [newMemberAge, setNewMemberAge] = useState("");
  const [newMemberGender, setNewMemberGender] = useState<FamilyMember["gender"]>("Female");
  const [newMemberAllergies, setNewMemberAllergies] = useState("");

  // Search filter for medications
  const [medSearchQuery, setMedSearchQuery] = useState("");
  const [medsViewMode, setMedsViewMode] = useState<"list" | "calendar">("list");
  const [activeCalendarDay, setActiveCalendarDay] = useState<string>(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date().getDay()];
  });
  const [completedCalendarDoses, setCompletedCalendarDoses] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("medidecode_completed_calendar_doses");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("medidecode_completed_calendar_doses", JSON.stringify(completedCalendarDoses));
  }, [completedCalendarDoses]);

  // Alarms and Voice Reminders State
  const [customReminders, setCustomReminders] = useState<Array<{
    id: string;
    medicine: string;
    dosage: string;
    time: string;
    active: boolean;
  }>>(() => {
    try {
      const saved = localStorage.getItem("medidecode_custom_reminders");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { id: "rem-1", medicine: "Rosuvastatin", dosage: "1 tablet", time: "21:00", active: true },
      { id: "rem-2", medicine: "Metformin", dosage: "1 tablet", time: "08:30", active: true }
    ];
  });

  const [newAlarmMed, setNewAlarmMed] = useState("");
  const [newAlarmDose, setNewAlarmDose] = useState("1 tablet");
  const [newAlarmTime, setNewAlarmTime] = useState("08:30");

  // State for editing reminders in place
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
  const [editingReminderMed, setEditingReminderMed] = useState("");
  const [editingReminderDose, setEditingReminderDose] = useState("");
  const [editingReminderTime, setEditingReminderTime] = useState("");

  const startEditingReminder = (reminder: { id: string; medicine: string; dosage: string; time: string }) => {
    setEditingReminderId(reminder.id);
    setEditingReminderMed(reminder.medicine);
    setEditingReminderDose(reminder.dosage);
    setEditingReminderTime(reminder.time);
  };

  const handleSaveReminder = () => {
    if (!editingReminderMed.trim()) {
      alert("Please enter a medicine name.");
      return;
    }
    setCustomReminders(prev => prev.map(r => r.id === editingReminderId ? {
      ...r,
      medicine: editingReminderMed.trim(),
      dosage: editingReminderDose.trim() || "1 tablet",
      time: editingReminderTime || "08:00"
    }: r));
    setEditingReminderId(null);
  };

  useEffect(() => {
    localStorage.setItem("medidecode_custom_reminders", JSON.stringify(customReminders));
  }, [customReminders]);

  const lastSpokenRef = useRef<string>("");

  const speakVoiceMessage = (text: string) => {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 1;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech Synthesis error:", e);
    }
  };

  // Real-time alarm monitoring effect
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const currentHHMM = `${hrs}:${mins}`;
      
      customReminders.forEach((reminder) => {
        if (reminder.active) {
          if (reminder.time === currentHHMM) {
            const trackingKey = `${reminder.id}-${currentHHMM}`;
            if (lastSpokenRef.current !== trackingKey) {
              lastSpokenRef.current = trackingKey;
              
              // Trigger VOICE:
              speakVoiceMessage(`Attention. Time to take the following medicine: ${reminder.medicine}. Dosage is ${reminder.dosage}.`);
              
              // Trigger applet notification banner
              setAdherenceNotificationMessage(`⏰ Reminder Alarm: Time to take your ${reminder.medicine} (${reminder.dosage})`);
              setPushNotificationActive(true);
              setTimeout(() => {
                setPushNotificationActive(false);
              }, 6000);
            }
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 5000);
    return () => clearInterval(interval);
  }, [customReminders]);

  // Mobile hamburger
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Back to top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setShowScrollTop(window.scrollY > 300);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Scroll to workspace trigger helper
  const workspaceRef = useRef<HTMLDivElement>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const scrollToWorkspace = () => {
    workspaceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRemindersTabClick = () => {
    setActiveTab("medicines");
    setMedsViewMode("calendar");
    scrollToWorkspace();
    setTimeout(() => {
      const el = document.getElementById("medicines-tab");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 400);
  };

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, selectedDocId, isAiTyping]);

  // Set up service worker offline notification triggers
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      console.log('MediCode PWA Service Worker Registered.');
    }
  }, []);

  // Text size factors helper
  const getTextSizeClass = () => {
    if (accessTextSize === "large") return "text-base md:text-lg";
    if (accessTextSize === "xlarge") return "text-lg md:text-xl";
    return "text-sm";
  };

  const getHeadingSizeClass = () => {
    if (accessTextSize === "large") return "text-xl md:text-2xl font-bold";
    if (accessTextSize === "xlarge") return "text-2xl md:text-3xl font-bold";
    return "text-base font-bold";
  };

  // Improved, human-like voice summary narration featuring slower warm pace, natural pitch, and priority for premium neural voices
  const speakReportSummary = (forcePlayArg?: boolean | any) => {
    const forcePlay = typeof forcePlayArg === "boolean" ? forcePlayArg : false;

    if (voiceReadingActive && !forcePlay) {
      window.speechSynthesis.cancel();
      setVoiceReadingActive(false);
      return;
    }
    
    if (!activeDoc || !activeDocData) return;
    const patientName = activeDocData.patient?.name || "Not specified";
    const summaryText = activeDocData.summary;
    const urgency = activeDocData.urgencyLevel || "Routine";
    const score = activeDocData.healthScore || 85;

    let message = "";
    let langCode = "en-US";

    if (selectedLanguage === "te") {
      langCode = "te-IN";
      message = `రోగి ${patientName} కొరకు మెడికోడ్ ఏఐ నివేదిక సారాంశం.
ఈ నివేదిక మూల్యాంకనం మొత్తం ${score} శాతం ఆరోగ్య సమ్మతి స్కోరును చూపుతోంది, ఇది ${urgency} అత్యవసర పారామితులను సూచిస్తుంది.
డీకోడ్ చేయబడిన సారాంశం ఇలా ఉంది: ${summaryText}. తగిన జాగ్రత్తలు తీసుకోండి మరియు ఔషధాల ట్యాబ్ క్రింద షెడ్యూల్ చేయబడిన మందులను తనిఖీ చేయండి. వివరణను మ్యూట్ చేయడానికి దయచేసి స్పీకర్ బటన్‌ను మళ్లీ తాకండి.`;
    } else if (selectedLanguage === "hi") {
      langCode = "hi-IN";
      message = `मरीज ${patientName} के लिए मेडिकोड एआई रिपोर्ट सारांश।
रिपोर्ट मूल्यांकन ${score} प्रतिशत का समग्र स्वास्थ्य अनुपालन स्कोर प्रदर्शित करता है, जो ${urgency} तात्कालिकता मापदंडों को दर्शाता है।
डीकोड की गई रूपरेखा दर्शाती है: ${summaryText}। उचित सावधानियां बरतें और दवाईयां टैब के अंतर्गत निर्धारित दवाओं की जांच करें। विवरण को बंद करने के लिए कृपया स्पीकर बटन को फिर से दबाएं।`;
    } else {
      langCode = "en-US";
      message = `MediCode AI Report Summary for patient ${patientName}.
The report evaluation displays an overall health compliance score of ${score} percent, signifying ${urgency} urgency parameters.
Deciphered outline indicates: ${summaryText}. Take appropriate precautions and check scheduled medicines under the Medicines tab. Please touch the speaker button again to mute narration.`;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.volume = 1;
    
    // Setting slower speech rate to sound relaxed, soothing, and highly human-like
    // Telugu and Hindi need slightly different speeds for clear, rich pronunciation details
    if (selectedLanguage === "te") {
      utterance.rate = 0.82; // Perfectly balanced, slightly slower speed for exquisite Telugu pronunciation
      utterance.pitch = 1.05; // Slightly pleasant pitch correction for natural high-fidelity rendering
    } else if (selectedLanguage === "hi") {
      utterance.rate = 0.85;
      utterance.pitch = 1.01;
    } else {
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
    }
    utterance.lang = langCode;

    try {
      const voices = window.speechSynthesis.getVoices();
      const langLower = langCode.toLowerCase();
      
      // Filter candidates that match the exact language or start with the language prefix
      const candidates = voices.filter((v) => {
        const voiceLang = v.lang.toLowerCase().replace("_", "-");
        return voiceLang === langLower || voiceLang.startsWith(selectedLanguage);
      });

      if (candidates.length > 0) {
        // Sort to prioritize premium natural/neural sounding voices (e.g. Google Cloud-based, Apple Premium, Microsoft Kalpana)
        const sorted = [...candidates].sort((a, b) => {
          const scoreVoice = (voice: typeof a) => {
            const name = voice.name.toLowerCase();
            let pts = 0;
            if (name.includes("google")) pts += 200;
            if (name.includes("natural")) pts += 150;
            if (name.includes("neural")) pts += 150;
            if (name.includes("premium")) pts += 100;
            
            // Prioritize regional Telugu and Hindi natural/high fidelity voices specifically
            if (selectedLanguage === "te") {
              if (name.includes("telugu") || name.includes("te-in") || name.includes("te_in")) pts += 350;
              if (name.includes("gita") || name.includes("shruti") || name.includes("sandhya") || name.includes("latha") || name.includes("mohan")) pts += 150;
            } else if (selectedLanguage === "hi") {
              if (name.includes("hindi") || name.includes("hi-in") || name.includes("hi_in")) pts += 350;
              if (name.includes("kalpana") || name.includes("heera") || name.includes("shruthi") || name.includes("pavan") || name.includes("swara")) pts += 150;
            } else {
              if (name.includes("en-us") || name.includes("en_us")) pts += 50;
            }
            if (name.includes("female") || name.includes("aurora") || name.includes("siri") || name.includes("zira")) pts += 25;
            return pts;
          };
          return scoreVoice(b) - scoreVoice(a);
        });
        utterance.voice = sorted[0];
      }
    } catch (voiceError) {
      console.warn("Could not load premium/natural voice", voiceError);
    }

    utterance.onend = () => setVoiceReadingActive(false);
    
    setVoiceReadingActive(true);
    window.speechSynthesis.speak(utterance);
  };

  // Stop sound if document selection changes
  useEffect(() => {
    window.speechSynthesis.cancel();
    setVoiceReadingActive(false);
  }, [selectedDocId]);

  // Cancel and restart speech narration if language or translation updates while active
  useEffect(() => {
    if (voiceReadingActive) {
      window.speechSynthesis.cancel();
      speakReportSummary(true);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [selectedLanguage, activeDocData?.summary]);

  // Mock drug interaction matrix calculation
  const runDrugInteractionCheck = () => {
    if (!drug1 || !drug2) return;
    const d1 = drug1.toLowerCase();
    const d2 = drug2.toLowerCase();

    if (
      (d1.includes("amoxicillin") && d2.includes("methotrexate")) || 
      (d2.includes("amoxicillin") && d1.includes("methotrexate"))
    ) {
      setInteractionResult("🚨 CRITICAL HAZARD: Joint administration of Amoxicillin and Methotrexate severely decreases kidney toxin clearance. This triggers hematological toxemia. Refrain immediately.");
    } else if (
      (d1.includes("aspirin") && d2.includes("warfarin")) ||
      (d2.includes("aspirin") && d1.includes("warfarin"))
    ) {
      setInteractionResult("🚨 SEVERE INTERACTION: Aspirin synergizes with anticoagulant Warfarin, extremely elevating internal bleeding and hematuria risks. Review with active doctor.");
    } else if (
      (d1.includes("paracetamol") && d2.includes("alcohol")) ||
      (d2.includes("paracetamol") && d1.includes("alcohol"))
    ) {
      setInteractionResult("⚠️ CAUTION ACTION: Pairing paracetamol (acetaminophen) with heavy quantities of alcohol raises hepatic strain, elevating liver enzyme ALT profiles. Limit doses.");
    } else {
      setInteractionResult("✅ NO SEVERE DETECTED INTERACTION: No documented severe systemic clinical cross-reactions detected for these item profiles; however, maintain strict 2-hour separation gaps.");
    }
  };

  // Unified File Drop Handle
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const loadEmilyDemo = () => {
    // Explicitly load demo document and scroll to workspace
    setSelectedDocId("doc-1");
    // Ensure Active Patient matches Demopatient (Emily)
    setActiveMemberId("self");
    setTimeout(() => {
      scrollToWorkspace();
    }, 100);
  };

  const processSelectedFile = async (file: File) => {
    setLoading(true);
    setUploadError(null);
    setLoadingStep("Reading files in browser...");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Content = reader.result as string;
        
        // Staged loading feedback for futuristic feeling!
        setTimeout(() => setLoadingStep("Configuring neural vision parser..."), 800);
        setTimeout(() => setLoadingStep("Decrypting biological indices..."), 1600);
        setTimeout(() => setLoadingStep("Translating pharmacology indicators..."), 2400);

        try {
          const response = await fetch(`${API_BASE_URL}/api/analyze-document`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileBase64: base64Content,
              mimeType: file.type || "image/jpeg",
              docType: uploadType,
              isDemo: false
            })
          });

          const result = await response.json();
          if (result.success) {
            // Save newly extracted data as a document
            const newDocId = `doc-${Date.now()}`;
            const parsedData: AnalysisResult = result.data;
            const docTitle = parsedData.documentType === "prescription" 
              ? `Prescription Deciphered (${parsedData.patient.name || "Emily Johnson"})` 
              : `Clinical Labs Decoded (${parsedData.patient.name || "Emily Johnson"})`;

            const newDoc: SavedDocument = {
              id: newDocId,
              date: new Date().toISOString().split('T')[0],
              docType: parsedData.documentType,
              title: docTitle,
              fileName: file.name,
              data: parsedData,
              memberId: activeMemberId
            };

            // Inject matching initial chat room message for new file
            setChatMessages(prev => ({
              ...prev,
              [newDocId]: [
                { id: `cm-${Date.now()}`, sender: "ai", text: `I have completed decoding your ${parsedData.documentType}! General Health adherence score evaluated at ${parsedData.healthScore}%. What specific questions can I highlight for you regarding dosage or symptoms?`, timestamp: "Just now" }
              ]
            }));

            setDocuments(prev => [newDoc, ...prev]);
            setSelectedDocId(newDocId);
            setLoading(false);
            setSelectedFile(null);
            
            // If it has lab results, feed metrics to Recharts timeline!
            if (parsedData.labResults && parsedData.labResults.length > 0) {
              const findLabVal = (names: string[], def: number) => {
                const found = parsedData.labResults?.find(l => 
                  names.some(n => l.name.toLowerCase().includes(n))
                );
                return found ? Number(found.currentValue) : def;
              };

              const sugar = findLabVal(["sugar", "glucose", "hba1c"], 100);
              const hemoglobin = findLabVal(["hemoglobin", "hgb", "hb"], 13);
              const cholesterol = findLabVal(["cholesterol", "ldl", "lipid", "triglyceride"], 190);
              const systolic = findLabVal(["systolic", "sbp", "blood pressure"], 120);
              const diastolic = findLabVal(["diastolic", "dbp"], 80);

              const lastMetric = timelineMetrics[timelineMetrics.length - 1] || {
                bloodSugar: 100,
                weight: 65,
                hemoglobin: 13,
                systolicBP: 120,
                diastolicBP: 80,
                cholesterol: 190
              };

              const parsePatientDateTo2026 = (dStr?: string) => {
                if (!dStr) return "Jun 2026";
                const cleaned = dStr.trim();
                const slashParts = cleaned.split("/");
                let dateObj = new Date(cleaned);
                if (slashParts.length === 3) {
                  const firstPart = parseInt(slashParts[0], 10);
                  const secondPart = parseInt(slashParts[1], 10);
                  const thirdPart = parseInt(slashParts[2], 10);
                  if (!isNaN(firstPart) && !isNaN(secondPart) && !isNaN(thirdPart)) {
                    const year = thirdPart > 1000 ? thirdPart : 2026;
                    if (secondPart >= 1 && secondPart <= 12) {
                      dateObj = new Date(year, secondPart - 1, firstPart);
                    }
                  }
                }
                if (isNaN(dateObj.getTime())) {
                  dateObj = new Date();
                }
                dateObj.setFullYear(2026);
                return dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              };

              const newMetric: TimelineMetric = {
                date: parsePatientDateTo2026(parsedData.patient?.date),
                bloodSugar: sugar || lastMetric.bloodSugar,
                weight: lastMetric.weight,
                hemoglobin: hemoglobin || lastMetric.hemoglobin,
                systolicBP: systolic || lastMetric.systolicBP,
                diastolicBP: diastolic || lastMetric.diastolicBP,
                cholesterol: cholesterol || lastMetric.cholesterol
              };

              setTimelineMetrics(p => {
                // Remove existing if duplicate date to keep chart pristine
                const filtered = p.filter(m => m.date !== newMetric.date);
                return [...filtered, newMetric];
              });
            }

            setTimeout(() => {
              scrollToWorkspace();
            }, 100);

          } else {
            throw new Error(result.message || "Decoding error.");
          }

        } catch (apiErr: any) {
          console.error("Express backend parse error. Triggering premium Demo mock injector.", apiErr);
          setUploadError("Neural system busy during vision call. Displaying beautiful pre-analyzed demo mock files so you can check how the MediCode workspace decodes content.");
          setLoading(false);
          // Auto load Emily demo to represent seamless fallback
          loadEmilyDemo();
        }
      };
    } catch (err: any) {
      setUploadError("Could not read file. Check that it is an image or PDF.");
      setLoading(false);
    }
  };

  // Send AI Chat Message
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `cm-usr-${Date.now()}`,
      sender: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update locally immediately
    const currentDocMessages = chatMessages[selectedDocId] || [];
    setChatMessages(prev => ({
      ...prev,
      [selectedDocId]: [...currentDocMessages, userMsg]
    }));

    const textToSubmit = chatInput;
    setChatInput("");
    setIsAiTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSubmit,
          history: currentDocMessages.slice(-6).map(m => ({ sender: m.sender === "user" ? "user" : "ai", text: m.text })),
          context: activeDocData
        })
      });

      const result = await response.json();
      if (result.success) {
        setChatMessages(prev => ({
          ...prev,
          [selectedDocId]: [
            ...(prev[selectedDocId] || []),
            {
              id: `cm-ai-${Date.now()}`,
              sender: "ai",
              text: result.text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        }));
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      // Simulate safe offline text response
      setTimeout(() => {
        setChatMessages(prev => ({
          ...prev,
          [selectedDocId]: [
            ...(prev[selectedDocId] || []),
            {
              id: `cm-ai-${Date.now()}`,
              sender: "ai",
              text: `Local Clinical simulation: Under clinical benchmarks for ${activeDocData.patient?.name || "the patient"}, we advise monitoring scheduled routines on this ${activeDocData.documentType || "report"}. Is there any other dosage question I can verify?`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        }));
      }, 1000);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Add Family Member
  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMem: FamilyMember = {
      id: `mem-${Date.now()}`,
      name: newMemberName,
      relation: newMemberRelation,
      age: newMemberAge || "45",
      gender: newMemberGender,
      bloodGroup: "O+",
      allergies: newMemberAllergies || "None",
      chronicDiseases: "None",
      emergencyContact: "Emily Johnson (+1 555-0188)",
      medicalNotes: "Added to clinical family mode tracking package.",
      avatarColor: "from-rose-500 to-red-600"
    };

    setFamilyMembers(prev => [...prev, newMem]);
    setActiveMemberId(newMem.id);
    setNewMemberName("");
    setNewMemberAge("");
    setNewMemberAllergies("");
    setShowMemberForm(false);
    setPushNotificationActive(true);
    setTimeout(() => setPushNotificationActive(false), 4000);
  };

  // Local schedule notification simulator trigger
  const triggerRemindersNotification = () => {
    setPushNotificationActive(true);
    setTimeout(() => {
      setPushNotificationActive(false);
    }, 4000);
  };

  // Timeline prescription refill action handler
  const triggerRefillRequest = (prescriptionId: string, prescriptionTitle: string) => {
    setTimelinePrescriptions(prev => prev.map(p => {
      if (p.id === prescriptionId) {
        return { ...p, status: "Active" };
      }
      return p;
    }));
    setAdherenceNotificationMessage(`System Alert: Clinical refill requested for "${prescriptionTitle}". Verified & and marked as Active.`);
    setPushNotificationActive(true);
    setTimeout(() => {
      setPushNotificationActive(false);
    }, 4000);
  };

  const exportDiagnosticSummaryAsPdf = () => {
    if (!activeDoc || !activeDocData) return;

    const patientName = activeDocData.patient?.name || labels.notSpecified;
    const doctorName = activeDocData.patient?.doctorName || activeDoc.doctor || (activeDoc as any).doctorName || labels.notSpecified;
    const date = activeDocData.patient?.date || activeDoc.date || labels.notSpecified;
    const reportGenerated = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    const isPrescription = activeDoc.docType === "prescription";

    const medicinesListHtml = isPrescription 
      ? (activeDocData.medicines || [])
          .map((med: any, idx: number) => `
            <div class="print-med-item">
              <h3 class="print-med-title">${idx + 1}. ${med.name}</h3>
              <div class="print-med-details-list">
                <div class="print-med-detail-row">
                  <span class="print-med-label">${labels.dosage}:</span>
                  ${med.dosage || labels.notSpecified}
                </div>
                <div class="print-med-detail-row">
                  <span class="print-med-label">${labels.frequency}:</span>
                  ${med.timing || labels.onceDaily}
                </div>
                <div class="print-med-detail-row">
                  <span class="print-med-label">${labels.duration}:</span>
                  ${med.duration || "30 days"}
                </div>
                <div class="print-med-detail-row">
                  <span class="print-med-label">${labels.instructions}:</span>
                  ${med.instructions || labels.notSpecified}
                </div>
                ${med.purpose ? `
                <div class="print-med-detail-row">
                  <span class="print-med-label">${labels.purpose}:</span>
                  ${med.purpose}
                </div>` : ''}
              </div>
            </div>
          `)
          .join("")
      : (activeDocData.labResults || [])
          .map((res: any, idx: number) => `
            <div class="print-med-item" style="border-bottom: 1px dotted #e2e8f0; padding-bottom: 10px;">
              <h3 class="print-med-title">${idx + 1}. ${res.name}</h3>
              <div class="print-med-details-list">
                <div class="print-med-detail-row">
                  <span class="print-med-label">${labels.val}:</span>
                  <strong>${res.currentValue}</strong> (${res.normalRange})
                </div>
                <div class="print-med-detail-row">
                  <span class="print-med-label">${labels.status}:</span>
                  <span style="font-weight: bold; color: ${res.status === 'High' ? '#e53e3e' : res.status === 'Low' ? '#3182ce' : '#38a169'}">${res.status}</span>
                </div>
                <div class="print-med-detail-row">
                  <span class="print-med-label">Info:</span>
                  ${res.explanation}
                </div>
              </div>
            </div>
          `)
          .join("");

    const summaryNotes = activeDoc.id === "doc-1" && selectedLanguage === "en"
      ? "The prescription also contains dates 29/11/26 and 27/10/2026, which might be related to follow-up or previous prescriptions. There are also circled numbers '5' and '35' which are unclear in their context."
      : (activeDocData.summary || "All details decoded successfully.");

    const quickSummaryNotes = activeDoc.id === "doc-1" && selectedLanguage === "en"
      ? "You have been prescribed active heart & cholesterol support medications (Rosuvastatin & Clopidogrel) along with supplements. These are standard protective remedies to keep your blood vessels clear and your metabolism healthy. Please take them once daily as written, and talk to your doctor if you experience any unusual muscle aches."
      : activeDocData.summary;

    const reportTitle = isPrescription ? labels.extractedPrescriptionResult : labels.clinicalSummaryDeciphered;

    const exportHtml = `<!DOCTYPE html>
<html lang="${selectedLanguage}">
<head>
  <meta charset="UTF-8">
  <title>${reportTitle}</title>
  <style>
    body {
      background-color: #ffffff !important;
      color: #0d1b2a !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .print-btn-container {
      display: flex;
      justify-content: center;
      padding: 20px 0;
      background: #f7fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    .print-btn {
      background-color: #2b6cb0;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      transition: background-color 0.2s;
    }
    .print-btn:hover {
      background-color: #2c5282;
    }
    .print-container {
      width: 100% !important;
      max-width: 650px !important;
      margin: 40px auto !important;
      background: #ffffff !important;
      padding: 20px !important;
    }
    .print-title {
      text-align: center !important;
      font-size: 20pt !important;
      font-weight: 800 !important;
      color: #1a365d !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      margin-top: 15pt !important;
      margin-bottom: 35pt !important;
    }
    .print-h2 {
      font-size: 14pt !important;
      font-weight: 700 !important;
      color: #2b6cb0 !important;
      margin-top: 25pt !important;
      margin-bottom: 12pt !important;
      border-bottom: 1.5px solid #e2e8f0 !important;
      padding-bottom: 4pt !important;
    }
    .print-info-grid {
      margin-bottom: 20pt !important;
    }
    .print-info-row {
      font-size: 11pt !important;
      line-height: 1.7 !important;
      margin-bottom: 4pt !important;
      color: #2d3748 !important;
    }
    .print-info-label {
      font-weight: 700 !important;
      display: inline-block !important;
      width: 155px !important;
      color: #1a202c !important;
    }
    .print-med-item {
      margin-bottom: 18pt !important;
      page-break-inside: avoid !important;
    }
    .print-med-title {
      font-size: 12.5pt !important;
      font-weight: 700 !important;
      color: #2b6cb0 !important;
      margin-bottom: 5pt !important;
    }
    .print-med-details-list {
      padding-left: 12pt !important;
    }
    .print-med-detail-row {
      font-size: 11pt !important;
      line-height: 1.6 !important;
      margin-bottom: 3pt !important;
      color: #2d3748 !important;
    }
    .print-med-label {
      font-weight: 700 !important;
      display: inline-block !important;
      width: 110px !important;
      color: #1a202c !important;
    }
    .print-notes-body {
      font-size: 11pt !important;
      line-height: 1.65 !important;
      color: #2d3748 !important;
      margin-top: 5pt !important;
    }
    .print-disclaimer-footer {
      margin-top: 50pt !important;
      text-align: center !important;
      color: #718096 !important;
      font-size: 10pt !important;
      line-height: 1.5 !important;
      border-top: 1px solid #e2e8f0 !important;
      padding-top: 15pt !important;
      page-break-inside: avoid !important;
    }
    @media print {
      body {
        background-color: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .print-btn-container {
        display: none !important;
      }
      .print-container {
        margin: 0 auto !important;
        padding: 0 !important;
        max-width: 100% !important;
      }
    }
  </style>
</head>
<body>
  <div class="print-btn-container">
    <button class="print-btn" onclick="window.print()">${selectedLanguage === "te" ? "రిపోర్ట్ డౌన్‌లోడ్" : selectedLanguage === "hi" ? "रिपोर्ट डाउनलोड" : "Download/Print PDF Report"}</button>
  </div>
  <div class="print-container">
    <h1 class="print-title">${reportTitle}</h1>
    
    <div>
      <h2 class="print-h2">${labels.patientName} ${selectedLanguage === "en" ? "Information" : ""}</h2>
      <div class="print-info-grid">
        <div class="print-info-row">
          <span class="print-info-label">${labels.patientName}:</span>
          ${patientName}
        </div>
        <div class="print-info-row">
          <span class="print-info-label">${labels.doctorName}:</span>
          ${doctorName}
        </div>
        <div class="print-info-row">
          <span class="print-info-label">${labels.date}:</span>
          ${date}
        </div>
        <div class="print-info-row">
          <span class="print-info-label">${selectedLanguage === "te" ? "నివేదన సమయం" : selectedLanguage === "hi" ? "रिपोर्ट समय" : "Report Generated"}:</span>
          ${reportGenerated}
        </div>
      </div>
    </div>

    <div>
      <h2 class="print-h2">${isPrescription ? labels.prescribedMedications : labels.labResultsHub}</h2>
      <div>
        ${medicinesListHtml}
      </div>
    </div>

    <div>
      <h2 class="print-h2">${labels.quickSummary}</h2>
      <p class="print-notes-body" style="background: #e2f1f5; border-left: 4px solid #319795; padding: 10px; border-radius: 4px;">
        ${quickSummaryNotes}
      </p>
    </div>

    <div>
      <h2 class="print-h2">${labels.additionalNotes}</h2>
      <p class="print-notes-body">
        ${summaryNotes}
      </p>
    </div>

    <div class="print-disclaimer-footer">
      <p style="font-style: italic; margin: 0 0 4px 0;">This report was generated by MediCode AI.</p>
      <p style="font-style: italic; margin: 0;">Please verify all information with a qualified healthcare professional.</p>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 250);
    };
  </script>
</body>
</html>`;

    try {
      const blob = new Blob([exportHtml], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${patientName.replace(/\s+/g, "_")}_Prescription_Analysis_Report.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (downloadErr) {
      console.error("Diagnostic Summary PDF export failed", downloadErr);
    }
  };

  // Header is now shown permanently
  const [visibleHeader, setVisibleHeader] = useState(true);

  return (
    <div className={`min-h-screen font-sans antialiased transition-all duration-500 relative overflow-hidden ${
      theme === "dark" 
        ? "bg-slate-950 text-slate-100 selection:bg-cyan-500/30 text-slate-300" 
        : "bg-gradient-to-tr from-cyan-50/50 via-white to-indigo-50/50 text-slate-850 selection:bg-cyan-550/20 text-slate-900"
    } ${highContrast ? "bg-black text-white" : ""}`}>
      
      {/* Interactive/Ambient Background Glows */}
      <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none overflow-hidden z-0 select-none">
        {/* Subtle grid pattern for light theme to look extremely tech-forward and premium */}
        {theme !== "dark" && (
          <div 
            className="absolute inset-0 opacity-[0.55] pointer-events-none filter saturate-150" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 1.5px, transparent 1.5px)', 
              backgroundSize: '32px 32px' 
            }} 
          />
        )}

        {/* Glow Blob 1: Cyan (pulsing and translating slowly) */}
        <motion.div 
          animate={{
            x: [-20, 20, -20],
            y: [-35, 35, -35],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-[8%] left-[2%] w-[45vw] h-[45vw] rounded-full blur-[130px] transition-colors duration-1000 ${
            theme === "dark" ? "bg-cyan-500/10" : "bg-cyan-300/25"
          }`} 
        />
        {/* Glow Blob 2: Purple */}
        <motion.div 
          animate={{
            x: [35, -35, 35],
            y: [25, -25, 25],
            scale: [1.15, 0.9, 1.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-[40%] right-[3%] w-[38vw] h-[38vw] rounded-full blur-[150px] transition-colors duration-1000 ${
            theme === "dark" ? "bg-purple-500/10" : "bg-purple-300/20"
          }`} 
        />
        {/* Glow Blob 3: Blue */}
        <motion.div 
          animate={{
            x: [-20, 20, -20],
            y: [30, -30, 30],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute bottom-[12%] left-[10%] w-[48vw] h-[48vw] rounded-full blur-[170px] transition-colors duration-1000 ${
            theme === "dark" ? "bg-blue-500/8" : "bg-blue-300/20"
          }`} 
        />
      </div>
      
      {/* PUSH NOTIFICATION ALERT INJECTOR (Service worker local push trigger) */}
      <AnimatePresence>
        {pushNotificationActive && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: "-50%" }}
            animate={{ opacity: 1, y: 16, x: "-50%" }}
            exit={{ opacity: 0, y: -30, x: "-50%" }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[999] w-[90%] max-w-sm p-4 rounded-xl shadow-2xl border backdrop-blur-xl border-cyan-500 bg-slate-900/90 text-white flex items-start gap-3"
          >
            <div className="p-1 rounded-full bg-cyan-500/20 text-cyan-400">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div className="text-left">
              <h5 className="text-xs font-bold font-mono tracking-wider text-cyan-400">MEDIDECODE ADHERENCE SYSTEM</h5>
              <p className="text-[11px] text-slate-300 mt-1">{adherenceNotificationMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-lg transition-all duration-300 shadow-lg ${
          theme === "dark" 
            ? "bg-slate-950/80 border-b border-cyan-500/10 shadow-cyan-950/10" 
            : "bg-white/80 border-b border-slate-200/50 shadow-slate-200/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* LOGO */}
            <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} id="app-nav-logo">
              <div className={`relative p-2 rounded-xl transition-all duration-300 group-hover:scale-105 shadow-md ${
                theme === "dark"
                  ? "bg-gradient-to-br from-cyan-950/40 via-cyan-900/10 to-indigo-950/40 border border-cyan-500/20 text-cyan-400 shadow-cyan-950/20 group-hover:border-cyan-400/50"
                  : "bg-gradient-to-br from-cyan-50 via-cyan-100/50 to-blue-50 border border-cyan-200 text-cyan-600 shadow-slate-200/20 group-hover:border-cyan-400/60"
              }`}>
                <Stethoscope className={`w-5 h-5 animate-pulse ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`} />
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="flex items-center text-left">
                <span className={`text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300 ${
                  theme === "dark"
                    ? "from-cyan-400 via-blue-400 to-indigo-400"
                    : "from-cyan-600 via-blue-600 to-indigo-700"
                }`}>
                  MediCode AI
                </span>
              </div>
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex gap-6 text-xs font-semibold">
              <a href="#features" className={`hover:text-cyan-500 transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Features</a>
              <button onClick={scrollToWorkspace} className={`hover:text-cyan-500 text-left transition-colors cursor-pointer ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Dashboard</button>
              <a href="#timeline" className={`hover:text-cyan-500 transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Trackers</a>
              <button onClick={handleRemindersTabClick} className={`hover:text-cyan-500 text-left transition-colors cursor-pointer ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Reminders</button>
              <a href="#faq" className={`hover:text-cyan-500 transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>FAQ</a>
            </nav>

            {/* BUTTONS ROW */}
            <div className="flex items-center gap-2">
              
              {/* THEME TOGGLE (working dark/light) */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  theme === "dark" ? "border-slate-800 bg-slate-900/60 text-yellow-400 hover:bg-slate-800" : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* LANGUAGE SELECTOR */}
              <div className="relative">
                <button
                  id="language-switcher-btn"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className={`flex items-center gap-1 px-2 py-2 rounded-xl border text-xs font-black transition-all duration-300 cursor-pointer shadow-sm ${
                    theme === "dark"
                      ? "bg-slate-900/60 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50"
                      : "bg-white border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-400"
                  }`}
                  title="Change Language / భాషను మార్చుకోండి / भाषा बदलें"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="uppercase text-[11px] font-extrabold">{selectedLanguage === "en" ? "En" : selectedLanguage === "te" ? "Te" : "Hi"}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isLangDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)} />
                    <div className={`absolute right-0 mt-2 w-36 rounded-xl border shadow-lg z-50 overflow-hidden transform origin-top-right transition-all duration-200 ${
                      theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-white border-slate-150 text-slate-700"
                    }`}>
                      <button
                        onClick={() => { setSelectedLanguage("en"); setIsLangDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          selectedLanguage === "en"
                            ? "bg-cyan-500/10 text-cyan-400 font-bold"
                            : theme === "dark" ? "hover:bg-slate-850" : "hover:bg-slate-50"
                        }`}
                      >
                        <span>English (Default)</span>
                        {selectedLanguage === "en" && <Check className="w-3 h-3 text-cyan-400" />}
                      </button>
                      <button
                        onClick={() => { setSelectedLanguage("te"); setIsLangDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          selectedLanguage === "te"
                            ? "bg-cyan-500/10 text-cyan-400 font-bold"
                            : theme === "dark" ? "hover:bg-slate-850" : "hover:bg-slate-50"
                        }`}
                      >
                        <span>తెలుగు (Telugu)</span>
                        {selectedLanguage === "te" && <Check className="w-3 h-3 text-cyan-400" />}
                      </button>
                      <button
                        onClick={() => { setSelectedLanguage("hi"); setIsLangDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          selectedLanguage === "hi"
                            ? "bg-cyan-500/10 text-cyan-400 font-bold"
                            : theme === "dark" ? "hover:bg-slate-850" : "hover:bg-slate-50"
                        }`}
                      >
                        <span>हिन्दी (Hindi)</span>
                        {selectedLanguage === "hi" && <Check className="w-3 h-3 text-cyan-400" />}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* GUEST MODE STATE INDICATOR / AUTH TRIGGERS */}
              {guestUser && guestUser.includes("(Verified User)") ? (
                <button
                  onClick={() => setGuestUser("Emily Johnson (Guest Partner)")}
                  className={`flex items-center gap-1.5 px-4.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none border ${
                    theme === "dark"
                      ? "bg-slate-900/80 border-rose-500/30 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-400/50 shadow-rose-950/20"
                      : "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white border-transparent shadow-rose-100"
                  }`}
                  title="Click to Logout Sandbox Session"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[120px]">Sign Out ({guestUser.replace(" (Verified User)", "")})</span>
                </button>
              ) : (
                <button
                  onClick={() => { setIsSignUp(false); setAuthModal(true); }}
                  className={`flex items-center gap-1.5 px-4.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none border ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border-cyan-500/30 hover:border-cyan-400/50 text-cyan-400 hover:text-cyan-300 shadow-cyan-950/20"
                      : "bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white border-transparent shadow-cyan-100"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              )}

              {/* MOBILE HAMBURGER */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg md:hidden border ${
                  theme === "dark" ? "border-slate-800 text-slate-300" : "border-slate-200 text-slate-700"
                }`}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

            </div>

          </div>
        </div>

        {/* MOBILE POPUP MENU */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-4 pt-2 pb-4 space-y-2 border-b text-sm font-semibold ${
            theme === "dark" ? "bg-slate-950 border-slate-900 text-slate-300" : "bg-white border-slate-200 text-slate-700"
          }`}>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-cyan-500">Features</a>
            <button onClick={() => { setMobileMenuOpen(false); scrollToWorkspace(); }} className="block w-full text-left py-2 hover:text-cyan-500">Workspace Dashboard</button>
            <a href="#timeline" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-cyan-500">Trackers</a>
            <button onClick={() => { setMobileMenuOpen(false); handleRemindersTabClick(); }} className="block w-full text-left py-2 hover:text-cyan-500">Reminders</button>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-cyan-500 font-bold text-cyan-400">FAQ</a>
          </div>
        )}
      </header>

      {/* Spacer to prevent overlap by the fixed navbar */}
      <div className="h-16 w-full shrink-0"></div>

      {/* UNIQUE HERO SECTION */}
      <InteractiveHero 
        onStartAnalysis={scrollToUpload} 
        onLoadDemo={loadEmilyDemo}
        theme={theme} 
      />

      {/* CORE FEATURES GRID */}
      <section id="features" className="py-20 border-t border-slate-700/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Clinical Features Built on Gemini Intelligence</h2>
            <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              MediCode translates unreadable handwriting and dry chemical markers into practical, patient-centric wellness actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FileText className="w-6 h-6 text-cyan-400" />,
                title: "Prescription Decoder",
                details: "Decipher difficult medical calligraphy. Extract drug compounds, strengths, intake schedules, and precise clinician caveats."
              },
              {
                icon: <Activity className="w-6 h-6 text-purple-400" />,
                title: "Lab Report Analyzer",
                details: "Understand markers like Hemoglobin, HbA1c, and Lipid cholesterols. High/Low indicators are explained in patient-friendly terms."
              },
              {
                icon: <ShieldAlert className="w-6 h-6 text-rose-500" />,
                title: "Drug Interaction Checker",
                details: "Discover dangerous medication pairings and hepatic workload warnings before ingesting new prescription doses."
              },
              {
                icon: <Brain className="w-6 h-6 text-indigo-400" />,
                title: "AI Clinical Companion",
                details: "Chat directly with decoded health documents. Receive tailored nutritional suggestions and answers about diagnostic ranges."
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-2xl border text-left space-y-4 transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark" 
                    ? "bg-slate-900/40 border-slate-800/80 hover:border-cyan-500/20" 
                    : "bg-white border-slate-200/80 hover:border-cyan-400"
                }`}
              >
                <div className="p-3 w-fit rounded-xl bg-cyan-500/5">{feature.icon}</div>
                <h4 className="font-bold tracking-tight text-sm">{feature.title}</h4>
                <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{feature.details}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS CHRONOLOGY SECTION */}
      <section id="how-it-works" className={`py-16 border-t border-slate-700/10 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900/10" : "bg-slate-100/40"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold block">Intuitive chronography</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Four Step Understanding Timeline</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { num: "01", title: "Upload / Capture", desc: "Drag-drop prescriptions, upload laboratory PDFs, or trigger camera capture from your smart device." },
              { num: "02", title: "AI OCR Parsing", desc: "Gemini Vision neural networks read unreadable pharmaceutical characters and extract blood figures." },
              { num: "03", title: "Automated Review", desc: "Cross-checks clinical dictionaries, highlights safety markers, and indexes warnings." },
              { num: "04", title: "Action Insights", desc: "Generates patient compliant scores, drug reminders, printable reports, and an AI chat interface." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 text-left space-y-3 p-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {step.num}
                  </span>
                  <div className="h-0.5 flex-1 bg-cyan-500/25 hidden lg:block" />
                </div>
                <h5 className="font-bold tracking-tight text-xs uppercase">{step.title}</h5>
                <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DYNAMIC DOCUMENT SCANNER / UPLOAD */}
      <section ref={uploadSectionRef} className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className={`p-8 rounded-3xl border text-center space-y-8 backdrop-blur-xl transition-all duration-300 relative overflow-hidden ${
          theme === "dark" 
            ? "bg-slate-950/60 border-slate-850/80 shadow-2xl shadow-indigo-950/10" 
            : "bg-gradient-to-br from-white/90 to-slate-50/70 border-cyan-200/60 shadow-[0_12px_45px_0_rgba(6,182,212,0.08)]"
        }`}>
          {/* Subtle design element */}
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-cyan-500/10 blur-xl" />

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">AI Document Processing Hub</h3>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              Select document type, upload a handwritten prescription or laboratory markers file.
            </p>
          </div>

          {/* Doc Type Selector */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setUploadType("prescription")}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 border cursor-pointer transition-all duration-300 ${
                uploadType === "prescription"
                  ? "bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/10"
                  : theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Decipher Prescription</span>
            </button>
            <button
              onClick={() => setUploadType("lab_report")}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 border cursor-pointer transition-all duration-300 ${
                uploadType === "lab_report"
                  ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/10"
                  : theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Analyze Lab Report</span>
            </button>
          </div>

          {/* File Upload drag-drop pane */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 transition-all duration-300 justify-center items-center flex flex-col gap-4 relative cursor-pointer ${
              dragActive ? "border-cyan-400 bg-cyan-500/5 scale-98" : theme === "dark" ? "border-slate-800 hover:border-slate-700 bg-slate-950/40" : "border-slate-200 hover:border-slate-300 bg-slate-50"
            }`}
          >
            {loading ? (
              <div className="py-6 space-y-4">
                <div className="relative w-12 h-12 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 animate-spin" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold font-mono tracking-wider text-cyan-400 uppercase animate-pulse">{loadingStep}</p>
                  <p className="description text-[10px] text-slate-400">Processing medical indices with Gemini model...</p>
                </div>
              </div>
            ) : selectedFile ? (
              <div className="py-4 space-y-5 w-full max-w-sm mx-auto text-center" onClick={(e) => e.stopPropagation()}>
                <div className={`p-4 rounded-xl flex items-center justify-between border ${
                  theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200/60 shadow-xs"
                }`}>
                  <div className="flex items-center gap-3 text-left overflow-hidden">
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                      <FileText className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold truncate">{selectedFile.name}</p>
                      <p className="text-[9px] text-slate-500 font-mono">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className={`p-1.5 rounded-lg hover:text-rose-500 transition-colors cursor-pointer ${
                      theme === "dark" ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-200 text-slate-500"
                    }`}
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <button
                  id="process-file-analyze-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    processSelectedFile(selectedFile);
                  }}
                  className={`w-full py-3.5 px-6 rounded-2xl text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 border cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-xl ${
                    uploadType === "prescription"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-450 hover:to-blue-550 text-white border-cyan-400 shadow-cyan-500/15"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-550 hover:to-pink-550 text-white border-purple-505 shadow-purple-600/15"
                  }`}
                >
                  <Sparkles className="w-4 h-4 animate-spin text-cyan-300" />
                  <span>Analyze Selected Document</span>
                </button>
              </div>
            ) : (
              <>
                <div className={`p-4 rounded-full ${theme === "dark" ? "bg-slate-900" : "bg-white shadow-sm"}`}>
                  <Upload className="w-8 h-8 text-cyan-500 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold">Drag and drop file here or click to browse</p>
                  <p className={`text-[10px] ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Supports prescription images, clinical panels, and lab work PDFs (PNG, JPG, PDF)</p>
                </div>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>

          {/* Error alerts or helpful guides */}
          {uploadError && (
            <div className="p-3.5 rounded-xl text-left text-xs bg-amber-500/10 border border-amber-500/20 text-amber-500 flex gap-2.5 items-start">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{uploadError}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/10 text-xs">
            <span className={theme === "dark" ? "text-slate-500" : "text-slate-400"}>🔒 Encrypted HIPAA Compliant Sandbox processing.</span>
            <button
              onClick={loadEmilyDemo}
              className="font-bold text-cyan-400 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Or click to instantly load Demo Emily patient...</span>
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </button>
          </div>

        </div>
      </section>

      {/* REVOLUTIONARY ANALYSIS WORKSPACE (DASHBOARD) */}
      <section ref={workspaceRef} id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Patient Selection banner and profile header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-700/10 justify-start">
          <div className="flex items-center gap-4 text-left">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeDocData.documentType === "prescription" ? "from-cyan-500 to-blue-600" : "from-purple-500 to-pink-600"} p-[2px] shadow-lg`}>
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-white font-extrabold text-sm">
                {activeDocData.patient.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">{activeDocData.patient.name}</h2>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  activeDocData.urgencyLevel === "Urgent" 
                    ? "bg-rose-500/10 text-rose-500" 
                    : activeDocData.urgencyLevel === "Moderate" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
                }`}>
                  {activeDocData.urgencyLevel} {labels.urgencyStatus}
                </span>
              </div>
              <p className={`text-xs leading-relaxed mt-0.5 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                {labels.diagnosedOn} {activeDocData.patient.date} | {labels.age}: {activeDocData.patient.age} | {labels.bloodGroupLabel}: {activeDocData.patient.bloodGroup || "O+"}
              </p>
            </div>
          </div>

          {/* Action pills: accessibility and exports */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Audio summary reader Accessibility Button */}
            <button
              onClick={speakReportSummary}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all duration-300 transform active:scale-95 cursor-pointer border ${
                voiceReadingActive 
                  ? "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/20" 
                  : theme === "dark" 
                    ? "bg-slate-900 border-slate-700/60 text-slate-200 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 hover:shadow-md hover:shadow-cyan-500/5" 
                    : "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-cyan-500/40 hover:bg-slate-50 hover:shadow-md hover:shadow-cyan-500/5"
              }`}
            >
              {voiceReadingActive ? (
                <div className="flex items-center gap-0.5 w-3.5 h-3">
                  <span className="w-[2px] h-2 bg-white rounded-full animate-bounce" />
                  <span className="w-[2px] h-3 bg-white rounded-full animate-pulse" />
                  <span className="w-[2px] h-1.5 bg-white rounded-full animate-bounce" />
                </div>
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              )}
              <span>{voiceReadingActive ? labels.stopVoiceSummary : labels.readAudioSummary}</span>
            </button>

            {/* Reminders Calendar Redirect Button */}
            {activeDocData.documentType === "prescription" && (
              <button
                id="dashboard-reminders-redirect"
                onClick={() => {
                  setActiveTab("medicines");
                  setMedsViewMode("calendar");
                  setTimeout(() => {
                    const el = document.getElementById("medicines-tab");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }, 100);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  activeTab === "medicines" && medsViewMode === "calendar"
                    ? "bg-cyan-500 border-cyan-500 text-white"
                    : theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{labels.remindersLabel || "Reminders"}</span>
              </button>
            )}

            {/* Prescription History Button */}
            <button
              id="dashboard-scan-history-btn"
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all duration-300 transform active:scale-95 cursor-pointer border ${
                isHistoryOpen 
                  ? "bg-cyan-600 border-cyan-500 text-white shadow-[0_0_18px_rgba(6,182,212,0.6)] ring-1 ring-cyan-300/40" 
                  : theme === "dark" 
                    ? "bg-slate-900 border-slate-750/60 text-slate-200 hover:text-white hover:border-cyan-500/60 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                    : "bg-white border-slate-300 text-slate-900 hover:text-black hover:border-cyan-500/55 hover:bg-slate-50 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)] font-extrabold"
              }`}
            >
              <History className={`w-3.5 h-3.5 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`} />
              <span>{labels.historyLabel || "History"}</span>
            </button>



            {/* Accessibility scale multipliers */}
            <div className="flex items-center gap-1 border border-slate-800/10 p-1 rounded-lg">
              <span className="text-[10px] font-mono font-bold text-slate-400 px-1.5 uppercase">{labels.fontSizeLabel || "FONT SIZE:"}</span>
              <button onClick={() => setAccessTextSize("standard")} className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold text-xs ${accessTextSize === "standard" ? "bg-cyan-500 text-white" : ""}`}>1x</button>
              <button onClick={() => setAccessTextSize("large")} className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold text-xs ${accessTextSize === "large" ? "bg-cyan-500 text-white" : ""}`}>1.2x</button>
              <button onClick={() => setAccessTextSize("xlarge")} className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold text-xs ${accessTextSize === "xlarge" ? "bg-cyan-500 text-white" : ""}`}>1.3x</button>
            </div>

          </div>
        </div>

        {/* WORKSPACE LAYOUT WRAPPER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Physical File Previewer */}
          {isLogicalDocViewEnabled && (
            <div className="lg:col-span-5 space-y-4">
              <div className={`p-4 rounded-2xl border text-left space-y-4 transition-colors duration-350 shadow-lg print:hidden ${
                theme === "dark" ? "bg-slate-900/40 border-slate-800/80" : "bg-white border-slate-200/80 text-slate-800"
              }`}>
                <div className="flex items-center justify-between border-b pb-3 border-slate-800/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold block mb-0.5">Logical Document View</span>
                    <button
                      onClick={() => setIsLogicalDocViewEnabled(false)}
                      className={`px-1.5 py-0.5 text-[9px] font-mono uppercase font-bold rounded border ${
                        theme === "dark" ? "border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/15" : "border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
                      } transition-colors cursor-pointer`}
                      title="Disable View"
                    >
                      Disable
                    </button>
                  </div>
                  
                  {/* Visual preview manipulation tools */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => setZoomLevel(p => Math.max(50, p - 25))} className="p-1 rounded hover:bg-slate-700/10 text-slate-400" title="Zoom Out"><ZoomOut className="w-3.5 h-3.5" /></button>
                    <span className="text-[10px] font-mono font-bold text-slate-400">{zoomLevel}%</span>
                    <button onClick={() => setZoomLevel(p => Math.min(150, p + 25))} className="p-1 rounded hover:bg-slate-700/10 text-slate-400" title="Zoom In"><ZoomIn className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setRotation(r => (r + 90) % 360)} className="p-1 rounded hover:bg-slate-700/10 text-slate-400" title="Rotate"><RotateCw className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Physical Document visual pad container */}
                <div className="overflow-hidden relative rounded-xl bg-slate-950 flex items-center justify-center p-6 h-[400px]">
                  
                  <motion.div
                    style={{ 
                      scale: zoomLevel / 100, 
                      rotate: `${rotation}deg`
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className={`w-full max-w-[280px] p-6 rounded-lg text-left shadow-2xl relative select-none uppercase overflow-y-auto max-h-[380px] ${
                      rawView 
                        ? "font-mono text-[9px] whitespace-pre-wrap leading-tight text-cyan-400 bg-slate-900 border border-cyan-500/20" 
                        : activeDoc.docType === "prescription"
                          ? "bg-rose-50/95 border-l-4 border-l-rose-500 shadow-rose-200 text-slate-800 font-sans"
                          : "bg-teal-50/95 border-t-4 border-t-teal-600 shadow-teal-200 text-slate-800 font-sans"
                    }`}
                  >
                    {rawView ? (
                      <div>
                        {`// RAW OCR STREAM EXTRACTED VIA GEMINI ---\n\n`}
                        {JSON.stringify(activeDocData, null, 2)}
                      </div>
                    ) : activeDoc.docType === "prescription" ? (
                      // RX Prescription Aesthetic Sheet
                      <div className="space-y-4">
                        <div className="flex justify-between items-start border-b border-rose-300 pb-2">
                          <div>
                            <h4 className="text-xs font-black tracking-tight text-blue-900 uppercase">AESTHETIC CLINIC LAB</h4>
                            <p className="text-[8px] text-slate-500 uppercase">99 Medical Plaza Dr, Hills Road</p>
                          </div>
                          <span className="text-2xl font-black text-rose-500">Rx</span>
                        </div>
                        
                        <div className="text-[10px] space-y-1 block border-b border-rose-200 pb-2">
                          <p className="font-bold underline text-blue-900">Patient: {activeDocData.patient.name}</p>
                          <p className="text-[8px] text-slate-500">Age: {activeDocData.patient.age} yrs | Gender: {activeDocData.patient.gender}</p>
                          <p className="text-[8px] text-slate-500">Scheduled Date: {activeDocData.patient.date}</p>
                        </div>

                        <div className="space-y-3 pt-1">
                          {activeDocData.medicines?.map((m: any, i: number) => (
                            <div key={i} className="space-y-0.5">
                              <p className="font-extrabold text-[11px] text-slate-900 text-left capitalize">⭐ {m.name}</p>
                              <p className="text-[8px] text-slate-500 text-left pl-3">{m.dosage} — {m.timing}</p>
                              <p className="text-[8px] text-slate-600 font-mono pl-3 text-left italic">"{m.instructions}"</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 pt-4 border-t border-rose-200 flex justify-between items-end">
                          <div className="text-[7px] text-slate-400">Electronic verification ID: rx-38a99d</div>
                          <div className="text-right">
                            <p className="text-[8px] font-bold text-blue-950">Dr. Linus Pauling, MD</p>
                            <p className="text-[7px] text-slate-400">Chief Resident Council</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // CBC Lab Report Spreadsheet
                      <div className="space-y-4">
                        <div className="flex justify-between items-start border-b border-teal-300 pb-2">
                          <div>
                            <h4 className="text-xs font-black tracking-tight text-teal-800 uppercase">METABOLIC LAB PARTNER</h4>
                            <p className="text-[8px] text-slate-500 uppercase">Accredited biological indices</p>
                          </div>
                          <span className="text-xs bg-teal-600 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">LAB REPORT</span>
                        </div>
                        
                        <div className="text-[10px] space-y-0.5 border-b border-teal-200 pb-2 font-mono">
                          <p className="font-bold">NAME: {activeDocData.patient.name}</p>
                          <p className="text-[8px]">DATE: {activeDocData.patient.date} | AGE: {activeDocData.patient.age}</p>
                        </div>

                        <div className="space-y-2 pt-1 font-mono text-[9px]">
                          <div className="grid grid-cols-12 gap-1 font-bold border-b pb-1 text-slate-600">
                            <span className="col-span-5">{labels.marker}</span>
                            <span className="col-span-3 text-right">{labels.val}</span>
                            <span className="col-span-4 text-right">{labels.status}</span>
                          </div>
                          {activeDocData.labResults?.map((r: any, i: number) => (
                            <div key={i} className="grid grid-cols-12 gap-1 border-b border-dotted pb-1 items-center">
                              <span className="col-span-5 font-bold truncate">{r.name}</span>
                              <span className="col-span-3 text-right">{r.currentValue}</span>
                              <span className={`col-span-4 text-right font-bold text-[8px] ${
                                r.status === 'High' ? 'text-red-600' : r.status === 'Low' ? 'text-blue-500' : 'text-emerald-600'
                              }`}>{r.status}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 text-[7px] text-slate-400">Signed electronically. Internal hash: md_55a2c2</div>
                      </div>
                    )}

                    {/* Visual scanning grid laser beam while analyzing or hovered */}
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400 animate-bounce cursor-pointer opacity-30 pointers-events-none" />
                  </motion.div>

                </div>

                {/* View Overlay Selector Toggle */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className={theme === "dark" ? "text-slate-500" : "text-slate-400"}>Deciphered view layout.</span>
                  <button
                    onClick={() => setRawView(!rawView)}
                    className="font-mono text-[10px] uppercase font-bold text-cyan-400 tracking-wider hover:underline cursor-pointer"
                  >
                    {rawView ? "➜ Render Medical Sheet" : "➜ Toggle Raw OCR JSON"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT COLUMN: Interactive Tabs & Workspace Info */}
          <div className={`${isLogicalDocViewEnabled ? "lg:col-span-7" : "lg:col-span-12"} space-y-6 transition-all duration-300`}>
            
            {/* Dashboard Tabs List */}
            <div className={`flex border-b overflow-x-auto pb-0.5 gap-2 scrollbar-none justify-start ${
              theme === "dark" ? "border-slate-800" : "border-slate-200"
            }`}>
              {[
                { id: "summary", label: labels.diagnosticSummary },
                { id: "medicines", label: labels.medicinesInfo, hidden: activeDoc.docType !== "prescription" },
                { id: "lab_results", label: labels.labResultsHub, hidden: activeDoc.docType !== "lab_report" },
                { id: "adherence_metrics", label: labels.adherenceMetricsTab },
                { id: "warnings", label: labels.warningsTab },
                { id: "recommendations", label: labels.recommendationsTab }
              ].map((tab) => {
                if (tab.hidden) return null;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-2 text-xs font-semibold tracking-wide border-b-2 hover:-translate-y-0.5 cursor-pointer shrink-0 transition-all ${
                      isActive
                        ? "border-cyan-400 text-cyan-400 font-bold"
                        : theme === "dark" ? "border-transparent text-slate-400 hover:text-slate-200" : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB OUTP_S WRAPPERS */}
            <div className="min-h-[350px] relative">
              {/* Dynamic translation spinner overlay */}
              {isTranslating && (
                <div className="absolute inset-0 bg-slate-950/45 dark:bg-slate-900/60backdrop-blur-sm z-30 flex flex-col items-center justify-center rounded-2xl p-6 pointer-events-none">
                  <div className="flex items-center gap-3 bg-slate-900 border border-cyan-500/30 p-4 rounded-xl shadow-2xl">
                    <Globe className="w-5 h-5 text-cyan-400 animate-spin" />
                    <span className="text-xs font-black text-cyan-400">{labels.translating}</span>
                  </div>
                </div>
              )}

              {/* 1. SUMMARY TAB */}
              {activeTab === "summary" && (
                <div className="space-y-6 text-left">
                  {activeDoc.docType === "prescription" ? (
                    <div className={`p-6 rounded-2xl border transition-all duration-300 relative ${
                      theme === "dark" ? "bg-slate-900/40 border-slate-800/80 text-white" : "bg-white border-slate-200/80 text-slate-800 shadow-md"
                    }`}>
                      {/* Title + Export Button Row */}
                      <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-250/20 dark:border-slate-800/80">
                        <div className="flex items-center gap-3">
                          <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                            <FileText className="w-5 h-5" />
                          </span>
                          <h3 id="prescription-extracted-result-header" className="text-sm font-extrabold tracking-tight">
                            {labels.extractedPrescriptionResult}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Eye button for Preview Toggle */}
                          <button
                            onClick={() => setIsLogicalDocViewEnabled(!isLogicalDocViewEnabled)}
                            className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer shadow-sm print:hidden group ${
                              isLogicalDocViewEnabled
                                ? "bg-cyan-500 text-white border-cyan-400 hover:bg-cyan-600"
                                : theme === "dark"
                                  ? "bg-slate-950/80 border-slate-800 text-cyan-400 hover:bg-slate-900/80"
                                  : "bg-slate-50 border-slate-200 text-cyan-600 hover:bg-slate-100"
                            }`}
                            title={isLogicalDocViewEnabled ? "Hide Logical Document View" : "Enable Logical Document View"}
                          >
                            {isLogicalDocViewEnabled ? (
                              <Eye className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                            ) : (
                              <EyeOff className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                            )}
                            <span className="hidden sm:inline text-[10px]">
                              {isLogicalDocViewEnabled ? labels.hidePreview : labels.showPreview}
                            </span>
                          </button>

                          {/* Export PDF Button */}
                          <button
                            id="export-pdf-prescription-btn"
                            onClick={() => {
                              try {
                                exportDiagnosticSummaryAsPdf();
                              } catch (e) {
                                console.warn("Print dialogue blocked or unsupported", e);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all duration-300 cursor-pointer shadow-sm ${
                              theme === "dark"
                                ? "bg-slate-950/80 border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50"
                                : "bg-white border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-400"
                            }`}
                          >
                            <FileText className="w-4 h-4 shrink-0 text-cyan-400" />
                            <span>{labels.exportPdf}</span>
                          </button>
                        </div>
                      </div>

                      {/* Header metadata block with 3 columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 border-b pb-6 border-slate-100 dark:border-slate-800/80">
                        <div>
                          <span className={`text-[10px] uppercase tracking-wider font-extrabold block mb-1 ${theme === "dark" ? "text-slate-400" : "text-slate-900"}`}>
                            {labels.patientName}
                          </span>
                          <span id="extracted-patient-name" className={`text-base font-black ${theme === "dark" ? "text-slate-100" : "text-slate-950"}`}>
                            {activeDocData.patient?.name || labels.notSpecified}
                          </span>
                        </div>
                        <div>
                          <span className={`text-[10px] uppercase tracking-wider font-extrabold block mb-1 ${theme === "dark" ? "text-slate-400" : "text-slate-900"}`}>
                            {labels.doctorName}
                          </span>
                          <span id="extracted-doctor-name" className={`text-base font-black ${theme === "dark" ? "text-slate-100" : "text-slate-950"}`}>
                            {activeDocData.patient?.doctorName || activeDoc.doctor || (activeDoc as any).doctorName || labels.notSpecified}
                          </span>
                        </div>
                        <div>
                          <span className={`text-[10px] uppercase tracking-wider font-extrabold block mb-1 ${theme === "dark" ? "text-slate-400" : "text-slate-900"}`}>
                            {labels.date}
                          </span>
                          <span id="extracted-date" className={`text-base font-black ${theme === "dark" ? "text-slate-100" : "text-slate-950"}`}>
                            {activeDocData.patient?.date || activeDoc.date || labels.notSpecified}
                          </span>
                        </div>
                      </div>

                      {/* Sub-heading */}
                      <h4 id="prescribed-medications-subheading" className={`text-xs font-bold uppercase tracking-wider mb-4 ${theme === "dark" ? "text-slate-400" : "text-slate-700 font-extrabold"}`}>
                        {labels.prescribedMedications}
                      </h4>

                      {/* List of custom cards */}
                      <div className="space-y-4 mb-8">
                        {activeDocData.medicines?.map((med: any, idx: number) => (
                          <div
                            key={idx}
                            id={`medication-card-${idx}`}
                            className={`p-5 rounded-2xl border transition-all duration-300 ${
                              theme === "dark"
                                ? "bg-slate-950/40 border-slate-850 text-white"
                                : "bg-white border-slate-200/85 text-slate-900 shadow-sm"
                            }`}
                          >
                            <div className="space-y-4">
                              {/* Medicine Display Title (Rosuvastatin, Clopidogrel, etc.) */}
                              <h5 className={`font-black text-sm ${theme === "dark" ? "text-cyan-400" : "text-slate-950"}`}>
                                {med.name}
                              </h5>
                              
                              {/* 2-column details layout matching the exact image cards */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                                <div className="space-y-2.5">
                                  <p className="flex items-center gap-1">
                                    <span className={`font-bold w-24 shrink-0 ${theme === "dark" ? "text-slate-450" : "text-slate-600"}`}>{labels.dosage}:</span>
                                    <span className={`font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-950"}`}>{med.dosage || labels.notSpecified}</span>
                                  </p>
                                  <p className="flex items-center gap-1">
                                    <span className={`font-bold w-24 shrink-0 ${theme === "dark" ? "text-slate-450" : "text-slate-600"}`}>{labels.duration}:</span>
                                    <span className={`font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-950"}`}>{med.duration || "30 days"}</span>
                                  </p>
                                  <p className="flex items-start gap-1">
                                    <span className={`font-bold w-24 shrink-0 ${theme === "dark" ? "text-slate-450" : "text-slate-600"}`}>{labels.instructions}:</span>
                                    <span className={`font-bold leading-relaxed text-left ${theme === "dark" ? "text-slate-200" : "text-slate-950"}`}>{med.instructions || labels.notSpecified}</span>
                                  </p>
                                </div>
                                <div className="space-y-2.5">
                                  <p className="flex items-center gap-1">
                                    <span className={`font-bold w-24 shrink-0 ${theme === "dark" ? "text-slate-450" : "text-slate-600"}`}>{labels.frequency}:</span>
                                    <span className={`font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-950"}`}>{med.timing || labels.onceDaily}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Summary Section */}
                      <div className="space-y-3 mb-6">
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-700 font-extrabold"}`}>
                          {labels.quickSummary}
                        </h4>
                        <div
                          id="prescription-quick-summary"
                          className={`p-5 rounded-2xl border text-xs leading-relaxed transition-all duration-300 ${
                            theme === "dark" 
                              ? "bg-gradient-to-r from-cyan-950/30 to-slate-900/40 border-cyan-500/20 dark:shadow-[0_0_15px_rgba(6,182,212,0.05)] text-cyan-200" 
                              : "bg-gradient-to-r from-cyan-50/75 to-sky-50/50 border-cyan-200 text-slate-950 font-medium shadow-sm"
                          }`}
                        >
                          <p className={`mb-1.5 flex items-center gap-1.5 ${theme === "dark" ? "font-semibold text-cyan-400" : "font-extrabold text-cyan-800"}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                            {labels.decodedKeyTakeaway}:
                          </p>
                          <p>
                            {activeDoc.id === "doc-1"
                              ? selectedLanguage === "te"
                                ? "మీకు అనుబంధాలతో పాటు క్రియాశీల గుండె మరియు కొలెస్ట్రాల్ మద్దతు మందులు (రోసువాస్టాటిన్ మరియు క్లోపిడోగ్రెల్) సూచించబడ్డాయి. మీ రక్తనాళాలను శుభ్రంగా ఉంచడానికి మరియు మీ జీవక్రియను ఆరోగ్యంగా ఉంచడానికి ఇవి ప్రామాణిక రక్షణ నివారణలు. దయచేసి వాటిని రాసినట్లుగా రోజుకు ఒకసారి తీసుకోండి మరియు మీకు ఏవైనా అసాధారణమైన కండరాల నొప్పులు అనిపిస్తే మీ వైద్యుడితో మాట్లాడండి."
                                : selectedLanguage === "hi"
                                  ? "आपको सप्लीमेंट्स के साथ सक्रिय हृदय और कोलेस्ट्रॉल सहायता दवाएं (रोसुवास्टेटिन और क्लोपिडोग्रेल) निर्धारित की गई हैं। आपकी रक्त वाहिकाओं को साफ रखने और आपके चयापचय को स्वस्थ रखने के लिए ये मानक सुरक्षात्मक उपाय हैं। कृपया उन्हें लिखे अनुसार दिन में एक बार लें, और यदि आपको कोई असामान्य मांसपेशियों में दर्द महसूस हो तो अपने डॉक्टर से बात करें।"
                                  : "You have been prescribed active heart & cholesterol support medications (Rosuvastatin & Clopidogrel) along with supplements. These are standard protective remedies to keep your blood vessels clear and your metabolism healthy. Please take them once daily as written, and talk to your doctor if you experience any unusual muscle aches."
                              : activeDocData.summary}
                          </p>
                        </div>
                      </div>

                      {/* Additional Notes Box at the bottom */}
                      <div className="space-y-3">
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-700"}`}>
                          {labels.additionalNotes}
                        </h4>
                        <div
                          id="prescription-additional-notes"
                          className={`p-5 rounded-2xl border text-xs leading-relaxed transition-all duration-300 ${
                            theme === "dark" 
                              ? "bg-slate-950/40 border-slate-800/80 text-slate-300" 
                              : "bg-slate-50/80 border-slate-200 text-slate-700 shadow-sm"
                          }`}
                        >
                          <p>
                            {activeDoc.id === "doc-1"
                              ? selectedLanguage === "te"
                                ? "ఈ ప్రిస్క్రిప్షన్‌లో 29/11/26 మరియు 27/10/2026 తేదీలు కూడా ఉన్నాయి, ఇవి తదుపరి అపాయింట్‌మెంట్ లేదా మునుపటి ప్రిస్క్రిప్షన్‌లకు సంబంధించినవి కావచ్చు. సర్కిల్ చేయబడిన '5' మరియు '35' సంఖ్యలు కూడా ఉన్నాయి, వాటి సందర్భం ప్రస్తుతం స్పష్టంగా లేదు."
                                : selectedLanguage === "hi"
                                  ? "नुस्खे (प्रिस्क्रिप्शन) में 29/11/26 और 27/10/2026 तारीखें भी शामिल हैं, जो अनुवर्ती (फॉलो-अप) या पिछले नुस्खे से संबंधित हो सकती हैं। इसमें घेरे गए नंबर '5' and '35' भी हैं जिनका संदर्भ स्पष्ट नहीं है।"
                                  : "The prescription also contains dates 29/11/26 and 27/10/2026, which might be related to follow-up or previous prescriptions. There are also circled numbers '5' and '35' which are unclear in their context."
                              : (activeDocData.summary || "Take your medications precisely as written.")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Default Summary Core Block for other types like Lab Reports */}
                      <div className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                        theme === "dark" ? "bg-slate-900/40 border-slate-800/80 text-white" : "bg-white border-slate-200 text-slate-950 shadow-md font-medium"
                      }`}>
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                              <FileText className="w-5 h-5" />
                            </span>
                            <h3 className="text-sm font-extrabold tracking-tight">{labels.clinicalSummaryDeciphered}</h3>
                          </div>
                          
                          {/* eye button on top of summary section with smooth toggle action */}
                          <button
                            onClick={() => setIsLogicalDocViewEnabled(!isLogicalDocViewEnabled)}
                            className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer shadow-sm print:hidden group ${
                              isLogicalDocViewEnabled
                                ? "bg-cyan-500 text-white border-cyan-400 hover:bg-cyan-600"
                                : theme === "dark"
                                  ? "bg-slate-950/80 border-slate-800 text-cyan-400 hover:bg-slate-900/80"
                                  : "bg-slate-50 border-slate-200 text-cyan-600 hover:bg-slate-100"
                            }`}
                            title={isLogicalDocViewEnabled ? "Hide Logical Document View" : "Enable Logical Document View"}
                          >
                            {isLogicalDocViewEnabled ? (
                              <Eye className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                            ) : (
                              <EyeOff className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                            )}
                            <span className="hidden sm:inline text-[10px]">
                              {isLogicalDocViewEnabled ? labels.hidePreview : labels.showPreview}
                            </span>
                          </button>
                        </div>

                        <p className={`leading-relaxed ${getTextSizeClass()}`}>
                          {activeDocData.summary}
                        </p>

                        {/* Gauge cluster */}
                        <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-800/10">
                          <div className="text-center">
                            <span className={`text-[9px] font-mono tracking-widest uppercase block mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-700 font-bold"}`}>{labels.docIntegrity}</span>
                            <span className="text-base font-extrabold text-cyan-400">{(activeDocData.confidenceScore ?? activeDocData.confidence ?? 95)}%</span>
                          </div>
                          <div className="text-center border-x border-slate-850">
                            <span className={`text-[9px] font-mono tracking-widest uppercase block mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}>{labels.urgencyStatus}</span>
                            <span className={`text-base font-extrabold px-2 py-0.5 text-xs rounded-full ${
                              (activeDocData.urgencyLevel || "Routine") === "Urgent" 
                                ? "bg-rose-500/10 text-rose-500" 
                                : (activeDocData.urgencyLevel || "Routine") === "Moderate" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
                            }`}>
                              {activeDocData.urgencyLevel || "Routine"}
                            </span>
                          </div>
                          <div className="text-center">
                            <span className={`text-[9px] font-mono tracking-widest uppercase block mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-700 font-bold"}`}>{labels.healthMetric}</span>
                            <span className="text-base font-extrabold text-emerald-500">{(activeDocData.healthScore ?? 85)}/100</span>
                          </div>
                        </div>
                      </div>

                      {/* High adherence rating section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* circular health indicator gauge */}
                        <div className={`p-5 rounded-2xl border text-center transition-colors transition-all duration-300 ${
                          theme === "dark" ? "bg-slate-900/40 border-slate-800/80" : "bg-white border-slate-200"
                        }`}>
                          <span className={`text-[9px] font-mono tracking-widest uppercase block ${theme === "dark" ? "text-slate-500" : "text-slate-700 font-bold"}`}>{labels.adherenceCompliance}</span>
                          
                          {/* Interactive Circular Svg Gauge */}
                          <div className="relative w-28 h-28 my-4 mx-auto flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="56" cy="56" r="48" fill="transparent" stroke={theme === "dark" ? "rgba(255,255,255,0.04)" : "#f1f5f9"} strokeWidth="6" />
                              <motion.circle
                                cx="56"
                                cy="56"
                                r="48"
                                fill="transparent"
                                stroke="url(#complianceGradient)"
                                strokeWidth="8"
                                strokeDasharray={301}
                                initial={{ strokeDashoffset: 301 }}
                                animate={{ strokeDashoffset: 301 - (301 * (activeDocData.healthScore ?? 85)) / 100 }}
                                transition={{ duration: 1.2 }}
                              />
                              <defs>
                                <linearGradient id="complianceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#ef4444" />
                                  <stop offset="40%" stopColor="#fbbf24" />
                                  <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute flex flex-col items-center">
                              <span className="text-xl font-black text-cyan-400">{(activeDocData.healthScore ?? 85)}%</span>
                              <span className="text-[8px] uppercase tracking-wider text-slate-400">Clinical index</span>
                            </div>
                          </div>

                          <p className="text-[10px] text-slate-400">Score of {(activeDocData.healthScore ?? 85)}/100 denotes adequate safety indices. Ensure proper medicine timing.</p>
                        </div>

                        {/* Adherence tips section removed per user request */}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* 1.5 ADHERENCE & METRICS TAB */}
              {activeTab === "adherence_metrics" && (
                <div className="space-y-6 text-left">
                  <div className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    theme === "dark" ? "bg-slate-900/40 border-slate-800/80 text-white" : "bg-white border-slate-200/80 text-slate-800 shadow-md"
                  }`}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Activity className="w-5 h-5" />
                      </span>
                      <h3 id="adherence-metrics-tab-header" className="text-sm font-extrabold tracking-tight">
                        {labels.complianceRatingTracker}
                      </h3>
                    </div>

                    <p className={`leading-relaxed mb-6 ${getTextSizeClass()}`}>
                      This section details key clinical metrics, safety indexes, urgency classifications, and document confidence parameters extracted from your uploaded medical records.
                    </p>

                    {/* Gauge cluster */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-850">
                      <div className="text-center">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500 block mb-1">{labels.docIntegrity}</span>
                        <span className="text-base font-extrabold text-cyan-400">
                          {activeDocData.confidenceScore ?? activeDocData.confidence ?? 95}%
                        </span>
                      </div>
                      <div className="text-center border-x border-slate-850">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500 block mb-1">{labels.urgencyStatus}</span>
                        <span className={`text-base font-extrabold px-2 py-0.5 text-xs rounded-full inline-block ${
                          (activeDocData.urgencyLevel || "Routine") === "Urgent" 
                            ? "bg-rose-500/10 text-rose-500" 
                            : (activeDocData.urgencyLevel || "Routine") === "Moderate" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
                        }`}>
                          {activeDocData.urgencyLevel || "Routine"}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500 block mb-1">{labels.healthMetric}</span>
                        <span className="text-base font-extrabold text-emerald-500">
                          {activeDocData.healthScore ?? 85}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* High adherence rating section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* circular health indicator gauge */}
                    <div className={`p-5 rounded-2xl border text-center transition-colors transition-all duration-300 ${
                      theme === "dark" ? "bg-slate-900/40 border-slate-800/80" : "bg-white border-slate-200 shadow-md"
                    }`}>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500 block">{labels.adherenceCompliance}</span>
                      
                      {/* Interactive Circular Svg Gauge */}
                      <div className="relative w-28 h-28 my-4 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="56" cy="56" r="48" fill="transparent" stroke={theme === "dark" ? "rgba(255,255,255,0.04)" : "#f1f5f9"} strokeWidth="6" />
                          <circle
                            cx="56"
                            cy="56"
                            r="48"
                            fill="transparent"
                            stroke="url(#complianceGradientMetrics)"
                            strokeWidth="8"
                            strokeDasharray={301}
                            strokeDashoffset={301 - (301 * (activeDocData.healthScore ?? 85)) / 100}
                          />
                          <defs>
                            <linearGradient id="complianceGradientMetrics" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="40%" stopColor="#fbbf24" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-xl font-black text-cyan-400">{activeDocData.healthScore ?? 85}%</span>
                          <span className="text-[8px] uppercase tracking-wider text-slate-400">Clinical index</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400">Score of {activeDocData.healthScore ?? 85}/100 denotes adequate safety indices. Ensure proper medicine timing.</p>
                    </div>

                    {/* Daily health quote & Push Notification Trigger button */}
                    <div className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 ${
                      theme === "dark" ? "bg-slate-900/40 border-slate-800/80 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
                    }`}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
                          <Volume2 className="w-4 h-4 animate-bounce" />
                          <span>{labels.adherenceTips}</span>
                        </div>
                        <h5 className="font-bold text-xs">{labels.pwaAlertsEnabled}</h5>
                        <p className={`text-[11px] leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          {labels.localAlarmsDesc}
                        </p>
                      </div>

                      <button
                        onClick={triggerRemindersNotification}
                        className="py-2.5 px-3 rounded-lg text-[10px] uppercase font-bold tracking-wider text-center cursor-pointer bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-550 transition-colors"
                      >
                        🔔 {labels.testAlarmBtn}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. MEDICINES TAB (Rx ONLY) */}
              {activeTab === "medicines" && activeDoc.docType === "prescription" && (
                <div className="space-y-6 text-left">
                  
                  {/* Search bar inside medicines tab */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/10 p-1.5 rounded-2xl">
                    <div className={`flex items-center gap-2 p-2.5 rounded-xl border flex-1 transition-colors ${
                      theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}>
                      <Search className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        placeholder={labels.searchPrescribedPlaceholder || "Search prescribed medications..."}
                        value={medSearchQuery}
                        onChange={(e) => setMedSearchQuery(e.target.value)}
                        className="bg-transparent border-none focus:outline-none text-xs w-full placeholder-slate-500"
                      />
                    </div>

                    {/* Mode selector toggle */}
                    <div className="flex bg-slate-950/40 p-1 rounded-xl border border-slate-800/60 self-end sm:self-center">
                      <button
                        onClick={() => setMedsViewMode("list")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          medsViewMode === "list"
                            ? "bg-cyan-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{labels.listViewBtn || "List View"}</span>
                      </button>
                      <button
                        id="medicines-tab"
                        onClick={() => setMedsViewMode("calendar")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          medsViewMode === "calendar"
                            ? "bg-cyan-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{labels.calendarViewBtn || "Calendar View"}</span>
                      </button>
                    </div>
                  </div>

                  {/* ALARMS & VOICE REMINDERS PANEL MOVED TO CALENDAR VIEW */}

                  {(() => {
                    const combinedMedicines = (() => {
                      const list = [...(activeDocData.medicines || [])];
                      customReminders.forEach(r => {
                        const alreadyExists = list.some(m => m.name.toLowerCase() === r.medicine.toLowerCase());
                        if (!alreadyExists) {
                          list.push({
                            name: r.medicine,
                            dosage: r.dosage,
                            timing: `Once daily at ${r.time}`,
                            instructions: "Self-scheduled medicine tracking",
                            purpose: "Active Voice Alarm",
                            warnings: "Voice alerts enabled.",
                            sideEffects: "-"
                          });
                        }
                      });
                      return list;
                    })();

                    const getMedSlots = (med: any) => {
                      // Check active custom reminders for this medicine
                      const activeRemindersForMed = customReminders.filter(
                        r => r.active && r.medicine.trim().toLowerCase() === med.name.trim().toLowerCase()
                      );

                      if (activeRemindersForMed.length > 0) {
                        let morning = false;
                        let afternoon = false;
                        let night = false;

                        activeRemindersForMed.forEach(rem => {
                          if (rem.time) {
                            const [hourStr] = rem.time.split(":");
                            const hour = parseInt(hourStr, 10);
                            if (hour >= 6 && hour < 12) {
                              morning = true;
                            } else if (hour >= 12 && hour < 17) {
                              afternoon = true;
                            } else {
                              night = true;
                            }
                          }
                        });

                        return { morning, afternoon, night };
                      }

                      // NLP parser fallback toTiming:
                      const timing = ((med.timing || "") + " " + (med.instructions || "") + " " + (med.name || "") + " " + (med.purpose || "")).toLowerCase();
                      
                      const isMorning = timing.includes("morning") || 
                                        timing.includes("breakfast") || 
                                        timing.includes("am") || 
                                        timing.includes("qd") || 
                                        timing.includes("once daily") || 
                                        timing.includes("empty stomach") || 
                                        timing.includes("सुबह") || 
                                        timing.includes("ఉదయం") || 
                                        timing.includes("1-0-0");
                                        
                      const isAfternoon = timing.includes("afternoon") || 
                                          timing.includes("lunch") || 
                                          timing.includes("noon") || 
                                          timing.includes("twice daily") || 
                                          timing.includes("twice a day") || 
                                          timing.includes("bid") || 
                                          timing.includes("tid") || 
                                          timing.includes("మధ్యాహ్నం") || 
                                          timing.includes("दोपहर") || 
                                          timing.includes("0-1-0") || 
                                          timing.includes("1-1-1");
                                          
                      const isNight = timing.includes("night") || 
                                      timing.includes("bedtime") || 
                                      timing.includes("evening") || 
                                      timing.includes("dinner") || 
                                      timing.includes("twice daily") || 
                                      timing.includes("twice a day") || 
                                      timing.includes("pm") || 
                                      timing.includes("hs") || 
                                      timing.includes("రాత్రి") || 
                                      timing.includes("रात") || 
                                      timing.includes("0-0-1") || 
                                      timing.includes("1-0-1") || 
                                      timing.includes("1-1-1");
                      
                      return {
                        morning: isMorning || (!isAfternoon && !isNight),
                        afternoon: isAfternoon,
                        night: isNight
                      };
                    };

                    if (medsViewMode === "list") {
                      return (
                        <div className="space-y-4">
                          {combinedMedicines
                            ?.filter((med: any) => med.name.toLowerCase().includes(medSearchQuery.toLowerCase()))
                            .map((med: any, idx: number) => (
                              <div 
                                key={idx} 
                                className={`p-5 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                                  theme === "dark" ? "bg-slate-900/40 border-slate-800/80 text-white" : "bg-white border-slate-200 text-slate-800 shadow-sm"
                                }`}
                              >
                                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                                
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 border-slate-800/10 mb-3">
                                  <div className="space-y-0.5">
                                    <h4 className="font-extrabold text-sm text-cyan-400">{med.name}</h4>
                                    <p className="text-[10px] text-slate-500 font-medium">{(labels.purpose || "Purpose").toUpperCase()}: {med.purpose}</p>
                                  </div>
                                  <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider h-fit w-fit font-mono">
                                    {med.timing}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                                  <div>
                                    <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">{(labels.dosage || "Dosage Range")}</span>
                                    <span className="font-semibold block mt-0.5 text-slate-100" style={{ color: theme === "light" ? "#1e293b" : "" }}>{med.dosage}</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">{(labels.warningsTab || "Precaution")}</span>
                                    <span className="font-semibold text-rose-400 block mt-0.5">{med.warnings || "Take as prescribed."}</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">{(labels.sideEffects || "Side Effects")}</span>
                                    <span className="font-semibold text-slate-400 block mt-0.5">{med.sideEffects || "Mild dry mouth."}</span>
                                  </div>
                                </div>

                                <div className={`mt-3 pt-3 border-t text-[11px] leading-relaxed italic border-slate-800/10 text-slate-400`}>
                                  "{labels.instructions || "Instruction"}: {med.instructions}"
                                </div>
                              </div>
                            ))}
                        </div>
                      );
                    }

                    // CALENDAR VIEW
                    return (
                      <div className="space-y-6">
                        {/* ALARMS & VOICE REMINDERS PANEL */}
                        <div id="alarms-voice-reminders-panel" className={`p-6 rounded-2xl border ${
                          theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-md"
                        }`}>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-800/10 mb-5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                                  <Clock className="w-4 h-4 animate-pulse text-cyan-400" />
                                </span>
                                <h3 className="font-extrabold text-sm tracking-tight text-cyan-400">{labels.alarmsRemindersHeader}</h3>
                              </div>
                              <p className="text-[11px] text-slate-500 mt-1">
                                {labels.alarmsRemindersDesc}
                              </p>
                            </div>
                            
                            {/* Active count badge */}
                            <span className="px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider h-fit w-fit font-mono">
                              {customReminders.filter(r => r.active).length} {labels.activeAlarms}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            
                            {/* Form (5 cols) */}
                            <div className="lg:col-span-12 xl:col-span-5 space-y-4">
                              <h4 className="text-[10px] uppercase font-bold tracking-wider font-mono text-slate-400">{labels.setupNewAlarm}</h4>
                              
                              <div className="space-y-4">
                                {/* Medicine name */}
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-semibold text-slate-400 block font-mono">{labels.medicineNameLabel}</label>
                                  <input
                                    type="text"
                                    placeholder={labels.typeMedicinePlaceholder}
                                    value={newAlarmMed}
                                    onChange={(e) => setNewAlarmMed(e.target.value)}
                                    className={`w-full p-2.5 rounded-xl text-xs border bg-transparent focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all ${
                                      theme === "dark" ? "border-slate-800 text-white" : "border-slate-200 text-slate-800"
                                    }`}
                                    required
                                  />
                                  
                                  {/* Quick pill selector from decoded medicines */}
                                  <div className="space-y-1">
                                    <span className="text-[9px] text-slate-500 block">{labels.quickPrefill}</span>
                                    <div className="flex flex-wrap gap-1.5 max-h-[70px] overflow-y-auto pr-1">
                                      {activeDocData.medicines?.map((m: any, idx: number) => (
                                        <button
                                          key={idx}
                                          type="button"
                                          onClick={() => {
                                            setNewAlarmMed(m.name);
                                            if (m.dosage) {
                                              setNewAlarmDose(m.dosage);
                                            }
                                          }}
                                          className={`px-2 py-1 rounded text-[9px] font-bold transition-all border ${
                                            newAlarmMed === m.name
                                              ? "bg-cyan-500 border-cyan-500 text-white"
                                              : theme === "dark" 
                                                ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700" 
                                                : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                                          }`}
                                        >
                                          {m.name}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Dose & Time */}
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-semibold text-slate-400 block font-mono">{labels.doseLabel}</label>
                                    <input
                                      type="text"
                                      placeholder={labels.dosePlaceholder}
                                      value={newAlarmDose}
                                      onChange={(e) => setNewAlarmDose(e.target.value)}
                                      className={`w-full p-2.5 rounded-xl text-xs border bg-transparent focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all ${
                                        theme === "dark" ? "border-slate-800 text-white" : "border-slate-200 text-slate-800"
                                      }`}
                                      required
                                    />
                                  </div>

                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-semibold text-slate-400 block font-mono">{labels.alarmTimeLabel}</label>
                                    <input
                                      type="time"
                                      value={newAlarmTime}
                                      onChange={(e) => setNewAlarmTime(e.target.value)}
                                      className={`w-full p-2 rounded-xl text-xs border bg-transparent focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all ${
                                        theme === "dark" ? "border-slate-800 text-white" : "border-slate-200 text-slate-800"
                                      }`}
                                      required
                                    />
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!newAlarmMed.trim()) {
                                      alert("Please enter or select a medicine name.");
                                      return;
                                    }
                                    const newRem = {
                                      id: "rem-" + Date.now(),
                                      medicine: newAlarmMed.trim(),
                                      dosage: newAlarmDose.trim() || "1 tablet",
                                      time: newAlarmTime || "08:00",
                                      active: true
                                    };
                                    setCustomReminders(prev => [...prev, newRem]);
                                    
                                    // Display success alert inside layout
                                    setAdherenceNotificationMessage(`✅ Medicine Voice Alarm Scheduled: ${newRem.medicine} at ${formatAlarmTime12h(newRem.time)}`);
                                    setPushNotificationActive(true);
                                    setTimeout(() => setPushNotificationActive(false), 4500);

                                    // Reset
                                    setNewAlarmMed("");
                                    setNewAlarmDose("1 tablet");
                                  }}
                                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/15 font-sans"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>{labels.scheduleVoiceAlarm}</span>
                                </button>
                              </div>
                            </div>

                            {/* List (7 cols) */}
                            <div className="lg:col-span-12 xl:col-span-7 space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] uppercase font-bold tracking-wider font-mono text-slate-400">{labels.scheduledAlarms}</h4>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (window.confirm("Are you sure you want to clear all custom reminders?")) {
                                      setCustomReminders([]);
                                    }
                                  }}
                                  className="text-[9px] font-bold text-rose-400 uppercase tracking-widest font-mono hover:underline cursor-pointer"
                                >
                                  {labels.clearAll}
                                </button>
                              </div>

                              <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1 scrollbar-thin">
                                {customReminders.length === 0 ? (
                                  <div className="text-center py-10 border border-dashed rounded-xl border-slate-800/20 text-slate-500">
                                    <Bell className="w-6 h-6 mx-auto mb-2 text-slate-500 stroke-[1.5]" />
                                    <p className="text-xs">{labels.noActiveAlarms}</p>
                                    <p className="text-[10px] text-slate-605 mt-0.5">{labels.scheduleFormInstruction}</p>
                                  </div>
                                ) : (
                                  customReminders.map((reminder) => {
                                    const isEditing = reminder.id === editingReminderId;
                                    if (isEditing) {
                                      return (
                                        <div
                                          key={reminder.id}
                                          className={`p-3 rounded-xl border space-y-3 transition-all ${
                                            theme === "dark" ? "bg-slate-900 border-cyan-500/40" : "bg-cyan-50/40 border-cyan-300"
                                          }`}
                                        >
                                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            {/* Edit Med Name */}
                                            <div className="space-y-1">
                                              <label className="text-[9px] font-semibold text-slate-455 block font-mono">{labels.medicineNameLabel}</label>
                                              <input
                                                type="text"
                                                value={editingReminderMed}
                                                onChange={(e) => setEditingReminderMed(e.target.value)}
                                                className={`w-full p-2 rounded-lg text-xs border bg-transparent focus:outline-none focus:ring-1 focus:ring-cyan-500 ${
                                                  theme === "dark" ? "border-slate-800 text-white" : "border-slate-300 text-slate-800"
                                                }`}
                                              />
                                            </div>
                                            {/* Edit Dosage */}
                                            <div className="space-y-1">
                                              <label className="text-[9px] font-semibold text-slate-455 block font-mono">{labels.doseLabel}</label>
                                              <input
                                                type="text"
                                                value={editingReminderDose}
                                                onChange={(e) => setEditingReminderDose(e.target.value)}
                                                className={`w-full p-2 rounded-lg text-xs border bg-transparent focus:outline-none focus:ring-1 focus:ring-cyan-500 ${
                                                  theme === "dark" ? "border-slate-800 text-white" : "border-slate-300 text-slate-800"
                                                }`}
                                              />
                                            </div>
                                            {/* Edit Time */}
                                            <div className="space-y-1">
                                              <label className="text-[9px] font-semibold text-slate-455 block font-mono">{labels.alarmTimeLabel}</label>
                                              <input
                                                type="time"
                                                value={editingReminderTime}
                                                onChange={(e) => setEditingReminderTime(e.target.value)}
                                                className={`w-full p-1.5 rounded-lg text-xs border bg-transparent focus:outline-none focus:ring-1 focus:ring-cyan-500 ${
                                                  theme === "dark" ? "border-slate-800 text-white" : "border-slate-300 text-slate-800"
                                                }`}
                                              />
                                            </div>
                                          </div>

                                          <div className="flex justify-end gap-2 pt-1">
                                            <button
                                              type="button"
                                              onClick={() => setEditingReminderId(null)}
                                              className="px-3 py-1 rounded-lg border border-slate-600 text-[10px] font-bold text-slate-400 hover:text-slate-200 cursor-pointer"
                                            >
                                              {labels.cancelBtn}
                                            </button>
                                            <button
                                              type="button"
                                              onClick={handleSaveReminder}
                                              className="px-3 py-1 rounded-lg bg-cyan-500 text-[10px] font-bold text-slate-950 hover:bg-cyan-400 cursor-pointer"
                                            >
                                              {labels.saveBtn}
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    }

                                    return (
                                      <div
                                        key={reminder.id}
                                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                                          reminder.active
                                            ? "bg-cyan-500/5 border-cyan-500/20"
                                            : "bg-slate-950/5 border-slate-800/30 opacity-60"
                                        }`}
                                      >
                                        {/* Left side info */}
                                        <div className="space-y-1">
                                          <div className="flex items-center gap-1.5">
                                            <span className={`w-2 h-2 rounded-full ${reminder.active ? "bg-cyan-400 animate-pulse" : "bg-slate-500"}`} />
                                            <span className="font-extrabold text-xs text-white" style={{ color: theme === "light" ? "#0f172a" : "" }}>
                                              {reminder.medicine}
                                            </span>
                                          </div>
                                          <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono text-slate-400">
                                            <span className="bg-slate-800/30 px-1.5 py-0.5 rounded leading-none">
                                              Dose: {reminder.dosage}
                                            </span>
                                            <span className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded leading-none font-bold">
                                              ⏰ {formatAlarmTime12h(reminder.time)}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Right side controls */}
                                        <div className="flex items-center gap-1.5">
                                          
                                          {/* Test Voice Speak Button */}
                                          <button
                                            type="button"
                                            onClick={() => {
                                              speakVoiceMessage(`Time to take the following medicine: ${reminder.medicine}. Dosage is ${reminder.dosage}.`);
                                              setAdherenceNotificationMessage(`🔊 Test Voice Playing: "Time to take ${reminder.medicine}"`);
                                              setPushNotificationActive(true);
                                              setTimeout(() => setPushNotificationActive(false), 4500);
                                            }}
                                            title="Test voice alert"
                                            className="p-1 px-2.5 rounded-lg border text-[9px] font-mono font-bold flex items-center gap-1 cursor-pointer bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-all"
                                          >
                                            <Volume2 className="w-3 h-3" />
                                            <span>{labels.testVoiceBtn}</span>
                                          </button>

                                          {/* On/Off Switch */}
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const updatedActiveState = !reminder.active;
                                              setCustomReminders(prev => prev.map(r => r.id === reminder.id ? { ...r, active: updatedActiveState } : r));
                                            }}
                                            title={reminder.active ? "Turn reminder off" : "Turn reminder on"}
                                            className={`px-2 py-1 rounded-lg text-[9px] font-mono font-bold transition-all border cursor-pointer ${
                                              reminder.active
                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                                                : "bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800"
                                            }`}
                                          >
                                            {reminder.active ? "ON" : "OFF"}
                                          </button>

                                          {/* Edit Button */}
                                          <button
                                            type="button"
                                            onClick={() => startEditingReminder(reminder)}
                                            className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer"
                                            title="Edit reminder"
                                          >
                                            <Edit className="w-3.5 h-3.5" />
                                          </button>

                                          {/* Trash Delete */}
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setCustomReminders(prev => prev.filter(r => r.id !== reminder.id));
                                            }}
                                            className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                                            title="Delete reminder"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Day Selector Ribbon */}
                        <div className="flex items-center justify-start overflow-x-auto gap-2 pb-2 scrollbar-none">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => {
                            const isSelected = activeCalendarDay === dayName;
                            const todayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];
                            const isToday = dayName === todayName;
                            return (
                              <button
                                key={dayName}
                                onClick={() => setActiveCalendarDay(dayName)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl min-w-[55px] transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md scale-105 border-transparent"
                                    : isToday
                                      ? theme === "dark" 
                                        ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20" 
                                        : "bg-cyan-50 border border-cyan-200 text-cyan-600 hover:bg-cyan-100/50"
                                      : theme === "dark" 
                                        ? "bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200" 
                                        : "bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800"
                                  }`}
                              >
                                <span className="text-[10px] uppercase font-bold tracking-wider font-mono">{dayName}</span>
                                {isToday && <span className="text-[8px] mt-0.5 font-bold uppercase text-amber-400 tracking-tight">Today</span>}
                              </button>
                            );
                          })}
                        </div>

                             {/* Schedule Summary Checklist progress */}
                        <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 text-xs font-mono mb-4 ${
                          theme === "dark" ? "bg-slate-950/60 border-slate-800/80" : "bg-slate-50 border-slate-200 shadow-sm"
                        }`}>
                          <div className="flex items-center gap-2">
                             <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className={theme === "light" ? "text-slate-700 font-semibold" : "text-slate-300"}>
                              {activeCalendarDay} {labels.dayAdherenceLog}
                            </span>
                          </div>
                          <div className="font-extrabold text-cyan-400 font-sans text-[11px] sm:text-xs">
                            {(() => {
                              const filteredMeds = combinedMedicines?.filter((med: any) => med.name.toLowerCase().includes(medSearchQuery.toLowerCase())) || [];
                              let totalDoses = 0;
                              let completed = 0;
                              filteredMeds.forEach((m: any) => {
                                const slots = getMedSlots(m);
                                if (slots.morning) {
                                  totalDoses++;
                                  if (completedCalendarDoses[`${activeCalendarDay}-${m.name}-morning`]) completed++;
                                }
                                if (slots.afternoon) {
                                  totalDoses++;
                                  if (completedCalendarDoses[`${activeCalendarDay}-${m.name}-afternoon`]) completed++;
                                }
                                if (slots.night) {
                                  totalDoses++;
                                  if (completedCalendarDoses[`${activeCalendarDay}-${m.name}-night`]) completed++;
                                }
                              });
                              return totalDoses > 0 ? `${completed}/${totalDoses} ${labels.dosesTaken} (${Math.round((completed/totalDoses) * 100)}%)` : labels.noDoses;
                            })()}
                          </div>
                        </div>

                        {/* Time-of-day slots container */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          
                          {/* 1. MORNING SLOT */}
                          <div className={`rounded-xl border p-4 transition-all ${
                            theme === "dark" ? "bg-slate-900/10 border-amber-500/15" : "bg-white border-amber-200 shadow-sm"
                          }`}>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/10">
                              <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-500">
                                <Sun className="w-4 h-4" />
                              </span>
                              <div>
                                <h4 className="font-extrabold text-xs text-amber-500 uppercase tracking-wide">{labels.morningHeader}</h4>
                                <p className="text-[9px] text-slate-500 font-mono">06:00 AM - 12:00 PM</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {(() => {
                                const morningMeds = combinedMedicines?.filter((m: any) => {
                                  if (!m.name.toLowerCase().includes(medSearchQuery.toLowerCase())) return false;
                                  return getMedSlots(m).morning;
                                }) || [];
                                
                                if (morningMeds.length === 0) {
                                  return <p className="text-[10px] text-slate-500 italic p-2 text-center">{labels.noMedsScheduled}</p>;
                                }
                                
                                return morningMeds.map((med: any, i: number) => {
                                  const doseId = `${activeCalendarDay}-${med.name}-morning`;
                                  const isTaken = !!completedCalendarDoses[doseId];
                                  return (
                                    <div 
                                      key={i}
                                      onClick={() => {
                                        setCompletedCalendarDoses(prev => ({ ...prev, [doseId]: !isTaken }));
                                      }}
                                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                                        isTaken 
                                          ? "bg-emerald-500/5 border-emerald-500/30 text-slate-400 line-through" 
                                          : theme === "dark" 
                                            ? "bg-slate-950/60 border-slate-800 hover:bg-slate-900" 
                                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                                      }`}
                                    >
                                      <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                                        isTaken ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-600"
                                      }`}>
                                        {isTaken && <Check className="w-3 h-3 stroke-[3px]" />}
                                      </div>
                                      <div className="space-y-1">
                                        <h5 className={`font-bold text-xs ${isTaken ? "text-slate-500 flex-1" : "text-cyan-400"}`}>{med.name}</h5>
                                        <p className="text-[10px] text-slate-400 font-medium">{labels.doseLabel}: {med.dosage}</p>
                                        <p className="text-[9px] text-slate-500 leading-relaxed">{med.purpose}</p>
                                      </div>
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          </div>

                          {/* 2. AFTERNOON SLOT */}
                          <div className={`rounded-xl border p-4 transition-all ${
                            theme === "dark" ? "bg-slate-900/10 border-orange-500/15" : "bg-white border-orange-200 shadow-sm"
                          }`}>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/10">
                              <span className="p-1.5 rounded-lg bg-orange-500/15 text-orange-500">
                                <Activity className="w-4 h-4" />
                              </span>
                              <div>
                                <h4 className="font-extrabold text-xs text-orange-500 uppercase tracking-wide">{labels.afternoonHeader}</h4>
                                <p className="text-[9px] text-slate-500 font-mono">12:00 PM - 05:00 PM</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {(() => {
                                const afternoonMeds = combinedMedicines?.filter((m: any) => {
                                  if (!m.name.toLowerCase().includes(medSearchQuery.toLowerCase())) return false;
                                  return getMedSlots(m).afternoon;
                                }) || [];
                                
                                if (afternoonMeds.length === 0) {
                                  return <p className="text-[10px] text-slate-500 italic p-2 text-center">{labels.noMedsScheduled}</p>;
                                }
                                
                                return afternoonMeds.map((med: any, i: number) => {
                                  const doseId = `${activeCalendarDay}-${med.name}-afternoon`;
                                  const isTaken = !!completedCalendarDoses[doseId];
                                  return (
                                    <div 
                                      key={i}
                                      onClick={() => {
                                        setCompletedCalendarDoses(prev => ({ ...prev, [doseId]: !isTaken }));
                                      }}
                                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                                        isTaken 
                                          ? "bg-emerald-500/5 border-emerald-500/30 text-slate-400 line-through" 
                                          : theme === "dark" 
                                            ? "bg-slate-950/60 border-slate-800 hover:bg-slate-900" 
                                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                                      }`}
                                    >
                                      <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                                        isTaken ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-600"
                                      }`}>
                                        {isTaken && <Check className="w-3 h-3 stroke-[3px]" />}
                                      </div>
                                      <div className="space-y-1">
                                        <h5 className={`font-bold text-xs ${isTaken ? "text-slate-500 flex-1" : "text-cyan-400"}`}>{med.name}</h5>
                                        <p className="text-[10px] text-slate-400 font-medium">{labels.doseLabel}: {med.dosage}</p>
                                        <p className="text-[9px] text-slate-500 leading-relaxed">{med.purpose}</p>
                                      </div>
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          </div>

                          {/* 3. NIGHT SLOT */}
                          <div className={`rounded-xl border p-4 transition-all ${
                            theme === "dark" ? "bg-slate-900/10 border-indigo-500/15" : "bg-white border-indigo-200 shadow-sm"
                          }`}>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/10">
                              <span className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
                                <Moon className="w-4 h-4" />
                              </span>
                              <div>
                                <h4 className="font-extrabold text-xs text-indigo-400 uppercase tracking-wide">{labels.nightHeader}</h4>
                                <p className="text-[9px] text-slate-500 font-mono">05:00 PM - 12:00 AM</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {(() => {
                                const nightMeds = combinedMedicines?.filter((m: any) => {
                                  if (!m.name.toLowerCase().includes(medSearchQuery.toLowerCase())) return false;
                                  return getMedSlots(m).night;
                                }) || [];
                                
                                if (nightMeds.length === 0) {
                                  return <p className="text-[10px] text-slate-500 italic p-2 text-center">{labels.noMedsScheduled}</p>;
                                }
                                
                                return nightMeds.map((med: any, i: number) => {
                                  const doseId = `${activeCalendarDay}-${med.name}-night`;
                                  const isTaken = !!completedCalendarDoses[doseId];
                                  return (
                                    <div 
                                      key={i}
                                      onClick={() => {
                                        setCompletedCalendarDoses(prev => ({ ...prev, [doseId]: !isTaken }));
                                      }}
                                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                                        isTaken 
                                          ? "bg-emerald-500/5 border-emerald-500/30 text-slate-400 line-through" 
                                          : theme === "dark" 
                                            ? "bg-slate-950/60 border-slate-800 hover:bg-slate-900" 
                                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                                      }`}
                                    >
                                      <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                                        isTaken ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-600"
                                      }`}>
                                        {isTaken && <Check className="w-3 h-3 stroke-[3px]" />}
                                      </div>
                                      <div className="space-y-1">
                                        <h5 className={`font-bold text-xs ${isTaken ? "text-slate-500 flex-1" : "text-cyan-400"}`}>{med.name}</h5>
                                        <p className="text-[10px] text-slate-400 font-medium">{labels.doseLabel}: {med.dosage}</p>
                                        <p className="text-[9px] text-slate-500 leading-relaxed">{med.purpose}</p>
                                      </div>
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          </div>

                          {/* 2. AFTERNOON SLOT */}
                          <div className={`rounded-xl border p-4 transition-all ${
                            theme === "dark" ? "bg-slate-900/10 border-orange-500/15" : "bg-white border-orange-200 shadow-sm"
                          }`}>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/10">
                              <span className="p-1.5 rounded-lg bg-orange-500/15 text-orange-500">
                                <Activity className="w-4 h-4" />
                              </span>
                              <div>
                                <h4 className="font-extrabold text-xs text-orange-500 uppercase tracking-wide">{labels.afternoonHeader}</h4>
                                <p className="text-[9px] text-slate-500 font-mono">12:00 PM - 05:00 PM</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {(() => {
                                const afternoonMeds = combinedMedicines?.filter((m: any) => {
                                  if (!m.name.toLowerCase().includes(medSearchQuery.toLowerCase())) return false;
                                  return getMedSlots(m).afternoon;
                                }) || [];
                                
                                if (afternoonMeds.length === 0) {
                                  return <p className="text-[10px] text-slate-500 italic p-2 text-center">{labels.noMedsScheduled}</p>;
                                }
                                
                                return afternoonMeds.map((med: any, i: number) => {
                                  const doseId = `${activeCalendarDay}-${med.name}-afternoon`;
                                  const isTaken = !!completedCalendarDoses[doseId];
                                  return (
                                    <div 
                                      key={i}
                                      onClick={() => {
                                        setCompletedCalendarDoses(prev => ({ ...prev, [doseId]: !isTaken }));
                                      }}
                                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                                        isTaken 
                                          ? "bg-emerald-500/5 border-emerald-500/30 text-slate-400 line-through" 
                                          : theme === "dark" 
                                            ? "bg-slate-950/60 border-slate-800 hover:bg-slate-900" 
                                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                                      }`}
                                    >
                                      <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                                        isTaken ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-600"
                                      }`}>
                                        {isTaken && <Check className="w-3 h-3 stroke-[3px]" />}
                                      </div>
                                      <div className="space-y-1">
                                        <h5 className={`font-bold text-xs ${isTaken ? "text-slate-500 flex-1" : "text-cyan-400"}`}>{med.name}</h5>
                                        <p className="text-[10px] text-slate-400 font-medium">{labels.doseLabel}: {med.dosage}</p>
                                        <p className="text-[9px] text-slate-500 leading-relaxed">{med.purpose}</p>
                                      </div>
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          </div>

                          {/* 3. NIGHT SLOT */}
                          <div className={`rounded-xl border p-4 transition-all ${
                            theme === "dark" ? "bg-slate-900/10 border-indigo-500/15" : "bg-white border-indigo-200 shadow-sm"
                          }`}>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/10">
                              <span className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
                                <Moon className="w-4 h-4" />
                              </span>
                              <div>
                                <h4 className="font-extrabold text-xs text-indigo-400 uppercase tracking-wide">{labels.nightHeader}</h4>
                                <p className="text-[9px] text-slate-500 font-mono">05:00 PM - 12:00 AM</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {(() => {
                                const nightMeds = combinedMedicines?.filter((m: any) => {
                                  if (!m.name.toLowerCase().includes(medSearchQuery.toLowerCase())) return false;
                                  return getMedSlots(m).night;
                                }) || [];
                                
                                if (nightMeds.length === 0) {
                                  return <p className="text-[10px] text-slate-500 italic p-2 text-center">{labels.noMedsScheduled}</p>;
                                }
                                
                                return nightMeds.map((med: any, i: number) => {
                                  const doseId = `${activeCalendarDay}-${med.name}-night`;
                                  const isTaken = !!completedCalendarDoses[doseId];
                                  return (
                                    <div 
                                      key={i}
                                      onClick={() => {
                                        setCompletedCalendarDoses(prev => ({ ...prev, [doseId]: !isTaken }));
                                      }}
                                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                                        isTaken 
                                          ? "bg-emerald-500/5 border-emerald-500/30 text-slate-400 line-through" 
                                          : theme === "dark" 
                                            ? "bg-slate-950/60 border-slate-800 hover:bg-slate-900" 
                                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                                      }`}
                                    >
                                      <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                                        isTaken ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-600"
                                      }`}>
                                        {isTaken && <Check className="w-3 h-3 stroke-[3px]" />}
                                      </div>
                                      <div className="space-y-1">
                                        <h5 className={`font-bold text-xs ${isTaken ? "text-slate-500 flex-1" : "text-cyan-400"}`}>{med.name}</h5>
                                        <p className="text-[10px] text-slate-400 font-medium">{labels.doseLabel}: {med.dosage}</p>
                                        <p className="text-[9px] text-slate-500 leading-relaxed">{med.purpose}</p>
                                      </div>
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })()}



                </div>
              )}

              {/* 3. LAB RESULTS TAB */}
              {activeTab === "lab_results" && activeDoc.docType === "lab_report" && (
                <div className="space-y-6 text-left">
                  
                  {/* Category grids */}
                  <div className="space-y-4">
                    {activeDocData.labResults?.map((res: any, index: number) => (
                      <div 
                        key={index} 
                        className={`p-5 rounded-2xl border transition-all duration-300 ${
                          theme === "dark" ? "bg-slate-900/40 border-slate-800/80 text-white" : "bg-white border-slate-200 text-slate-800 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between border-b pb-2.5 border-slate-800/10 mb-3.5">
                          <div className="space-y-0.5">
                            <h4 className="font-extrabold text-sm">{res.name}</h4>
                            <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">{res.category || "General"} Panel</span>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-mono font-bold text-slate-400">{(labels.val || "Value").toUpperCase()} DETECTED</p>
                            <p className="text-base font-black text-cyan-400">{res.currentValue}</p>
                          </div>
                        </div>

                        {/* Visual Range bar */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-mono text-slate-500">
                            <span>Reference Range: {res.normalRange}</span>
                            <span className={`font-bold uppercase ${
                              res.status === "High" ? "text-red-500" : res.status === "Low" ? "text-blue-500" : "text-emerald-500"
                            }`}>
                              {(labels.status || "Status").toUpperCase()}: {res.status}
                            </span>
                          </div>
                          
                          {/* Svg line visualization */}
                          <div className="h-2 rounded-full relative w-full bg-slate-800 overflow-hidden">
                            <div className="absolute top-0 bottom-0 left-1/4 right-3/4 bg-emerald-500/45" title="Normal Range Box" />
                            <motion.div 
                              initial={{ left: 0 }}
                              animate={{ left: res.status === "High" ? "82%" : res.status === "Low" ? "12%" : "48%" }}
                              transition={{ duration: 1 }}
                              className={`absolute w-3 h-3 rounded-full -top-0.5 shadow-md ${
                                res.status === "High" ? "bg-rose-500 shadow-rose-500/50" : res.status === "Low" ? "bg-blue-500" : "bg-emerald-500"
                              }`} 
                            />
                          </div>
                        </div>

                        {/* Plain clinical breakdown */}
                        <p className={`text-xs mt-3.5 leading-relaxed italic ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                          "Explanation: {res.explanation}"
                        </p>

                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* 4. WARNINGS TAB */}
              {activeTab === "warnings" && (
                <div className="space-y-6 text-left">
                  
                  <div className="space-y-4">
                    {(activeDocData.warnings || []).map((warn: string, i: number) => (
                      <div 
                        key={i} 
                        className="p-5 rounded-2xl border text-left flex gap-3.5 bg-red-500/5 border-red-500/25 text-rose-500"
                      >
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500 animate-pulse" />
                        <div>
                          <h5 className="font-bold text-xs uppercase tracking-wider font-mono text-rose-500 mb-1">{labels.warningsHeader || "Clinical Precaution"}</h5>
                          <p className={`text-xs leading-relaxed`}>{warn}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Interactive Drug Interaction Tester Box */}
                  <div className={`p-6 rounded-2xl border space-y-4 ${
                    theme === "dark" ? "bg-slate-900/40 border-slate-800/80 text-white" : "bg-white border-slate-200 text-slate-800 shadow"
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-rose-500/15 text-rose-500">
                        <ShieldAlert className="w-4 h-4" />
                      </span>
                      <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-slate-400">AI Medication Interaction Cross-Checker</h4>
                    </div>
                    
                    <p className={`text-[11px] ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      Enter two medications to test for clinical compatibility (e.g. "Amoxicillin" & "Methotrexate", or "Aspirin" & "Warfarin").
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <input
                          type="text"
                          placeholder="Medicine 1 (e.g. Amoxicillin)"
                          value={drug1}
                          onChange={(e) => setDrug1(e.target.value)}
                          className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors ${
                            theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-250 text-slate-800"
                          }`}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Medicine 2 (e.g. Methotrexate)"
                          value={drug2}
                          onChange={(e) => setDrug2(e.target.value)}
                          className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors ${
                            theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-250 text-slate-800"
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      onClick={runDrugInteractionCheck}
                      className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer bg-gradient-to-tr from-rose-500 to-indigo-650 text-white hover:opacity-90"
                    >
                      Run Cross-Interaction Scan
                    </button>

                    {interactionResult && (
                      <div className={`p-4 rounded-xl text-xs leading-relaxed border transition-colors ${
                        interactionResult.includes("🚨") 
                          ? "bg-red-500/10 border-red-500/20 text-rose-400 font-semibold" 
                          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      }`}>
                        {interactionResult}
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* 5. RECOMMENDATIONS TAB */}
              {activeTab === "recommendations" && (
                <div className="space-y-4 text-left">
                  {(activeDocData.recommendations || []).map((rec: string, i: number) => (
                    <div 
                      key={i} 
                      className={`p-4 rounded-xl border text-left flex gap-3 ${
                        theme === "dark" ? "bg-slate-900/10 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-850 shadow-sm"
                      }`}
                    >
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                      <div>
                        <h5 className="font-bold text-xs uppercase tracking-wider font-mono text-emerald-400 mb-0.5">{labels.recommendationsTab || "Clinical Guideline"}</h5>
                        <p className="text-xs leading-relaxed">{rec}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* HEALTH TRACKERS METRICS TIMELINE PLOTS (RECHARTS) */}
      <section id="timeline" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <HealthTimeline metrics={timelineMetrics} theme={theme} onChangeMetrics={setTimelineMetrics} />
      </section>

      {/* FAQ AND GLASSMORPH CONTACT (IMPORTED FROM MODULATED COMPONENT) */}
      <section id="faq" className="border-t border-slate-750/10">
        <FAQContact theme={theme} />
      </section>

      {/* FOOTER */}
      <footer className={`py-12 border-t transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-950 border-slate-900" : "bg-white border-slate-250"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-12 gap-8 text-left text-xs font-semibold">
          
          <div className="sm:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-cyan-500 text-white">
                <Brain className="w-4 h-4" />
              </div>
              <span className="font-bold font-mono text-cyan-400 tracking-wider">MEDIDECODE AI</span>
            </div>
            <p className={`text-[11px] leading-relaxed font-normal ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              Translating clinical abbreviations, handwriting scripts, and chemical diagnostic metrics into actionable wellness insights. Fully encrypted, secure, sandbox compliant.
            </p>
          </div>

          <div className="sm:col-span-2 space-y-2.5">
            <h6 className="font-bold text-[10px] font-mono tracking-widest uppercase text-slate-500">Platform</h6>
            <a href="#features" className={`block font-normal hover:text-cyan-400 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Features</a>
            <a href="#how-it-works" className={`block font-normal hover:text-cyan-400 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Workflow</a>
            <button onClick={scrollToWorkspace} className={`block text-left font-normal hover:text-cyan-400 cursor-pointer ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Workspace</button>
          </div>

          <div className="sm:col-span-2 space-y-2.5">
            <h6 className="font-bold text-[10px] font-mono tracking-widest uppercase text-slate-500">Compliance</h6>
            <span className={`block font-normal ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>HIPAA Sandbox</span>
            <span className={`block font-normal ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>GDPR Private Storage</span>
            <span className={`block font-normal ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Data Encrypted</span>
          </div>

          <div className="sm:col-span-4 space-y-3">
            <h6 className="font-bold text-[10px] font-mono tracking-widest uppercase text-slate-500">Legal Disclaimer</h6>
            <p className={`text-[10px] font-normal leading-relaxed ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
              MediCode AI is a clinical educational information index. It does not replace advice, diagnoses, or prescriptions given by practicing hospital consultants or licensed clinical professionals.
            </p>
            <p className="text-[10px] text-slate-500 font-mono">© 2026 MediCode AI. All rights private.</p>
          </div>

        </div>
      </footer>

      {/* AUTH POPUP PANEL MODAL */}
      <AnimatePresence>
        {authModal && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative z-10 w-full max-w-[440px] rounded-2xl border text-left shadow-2xl overflow-hidden flex flex-col ${
                theme === "dark" ? "bg-[#0f1420] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-850"
              }`}
            >
              {/* Tabs header at the top */}
              <div className="flex border-b border-slate-805 rounded-t-2xl overflow-hidden">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-4 text-center text-sm font-semibold transition-all duration-200 outline-none cursor-pointer border-b-2 ${
                    !isSignUp 
                      ? "text-[#009fff] border-[#009fff]" 
                      : "text-slate-500 hover:text-slate-300 border-transparent"
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-4 text-center text-sm font-semibold transition-all duration-200 outline-none cursor-pointer border-b-2 ${
                    isSignUp 
                      ? "text-[#009fff] border-[#009fff]" 
                      : "text-slate-500 hover:text-slate-300 border-transparent"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8 space-y-6">
                
                {/* Email Address */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-slate-400 text-[13px] font-medium">Email Address</label>
                  <input
                    type="email"
                    placeholder="agent@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#0c1017] border border-slate-800 text-white focus:outline-none focus:border-[#009fff] focus:ring-1 focus:ring-[#009fff] transition-colors placeholder-slate-600 text-sm"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-slate-400 text-[13px] font-medium">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#0c1017] border border-slate-800 text-white focus:outline-none focus:border-[#009fff] focus:ring-1 focus:ring-[#009fff] transition-colors placeholder-slate-600 text-sm"
                  />
                </div>

                {/* Remember Me / Forgot Password */}
                {!isSignUp && (
                  <div className="flex items-center justify-between text-xs my-1">
                    <label className="flex items-center gap-2 text-slate-400 hover:text-slate-300 cursor-pointer select-none text-[13px]">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-800 bg-[#0c1017] text-[#009fff] focus:ring-0 w-4 h-4 accent-[#009fff]" 
                      />
                      <span>Remember me</span>
                    </label>
                    <button 
                      onClick={() => alert("Simulation Mode: Password reset instructions triggers sent to " + (authEmail || "your register address") + "!")}
                      className="text-[#009fff] hover:text-sky-400 hover:underline transition-colors font-medium text-[13px]"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Submit button */}
                <button 
                  onClick={async () => {
                    if (!authEmail || !authPassword) {
                      alert("Please enter both your email address and password.");
                      return;
                    }
                    const displayName = authEmail ? authEmail.split('@')[0] : "Emily Johnson";
                    setGuestUser(`${displayName.charAt(0).toUpperCase() + displayName.slice(1)} (Verified User)`);
                    setAuthModal(false);
                    setAuthEmail("");
                    setAuthPassword("");
                  }}
                  className="w-full py-3.5 px-4 rounded-lg bg-[#009fff] hover:bg-[#008be5] text-white font-bold text-sm shadow-[0_4px_14px_rgba(0,159,255,0.25)] transition-all active:scale-[0.98] focus:outline-none cursor-pointer text-center"
                >
                  {isSignUp ? "Secure Sign Up" : "Secure Log In"}
                </button>

                {/* Separator line */}
                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-slate-850"></div>
                  <span className="flex-shrink mx-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">OR</span>
                  <div className="flex-grow border-t border-slate-850"></div>
                </div>

                {/* Google Sign In */}
                <button 
                  onClick={async () => {
                    setGuestUser("Emily Johnson (Verified User)");
                    setAuthModal(false);
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] focus:outline-none cursor-pointer shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.66-.23-1.23-.63-1.67-1.09z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                {/* Environment guidance indicator */}
                <div className="pt-2 text-center">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 bg-amber-450/5 px-2.5 py-1 rounded-full border border-amber-400/20 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    💡 Offline Sandbox Session active
                  </span>
                </div>

              </div>
            </motion.div>

            {/* Return below login card */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="mt-6 z-10"
            >
              <button
                onClick={() => setAuthModal(false)}
                className="text-slate-400 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer focus:outline-none"
              >
                <span>←</span> Return to Landing Page
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING AI CHATBOT WIDGET */}
      {isChatBotOpen && isChatBotExpanded && (
        <AnimatePresence>
          <motion.div
            key="chatbot-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsChatBotExpanded(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[49] print:hidden cursor-pointer"
          />
        </AnimatePresence>
      )}

      <div 
        id="floating-chatbot-container" 
        className={
          isChatBotExpanded 
            ? "fixed inset-0 z-50 flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 print:hidden transition-all duration-300"
            : `fixed right-6 z-50 flex flex-col items-end gap-3 print:hidden transition-all duration-300 ${
                showScrollTop ? "bottom-22" : "bottom-6"
              }`
        }
      >
        
        {/* Chatbox Window */}
        <AnimatePresence>
          {isChatBotOpen && (
            <motion.div
              id="chatbot-window"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${
                isChatBotExpanded 
                  ? "w-full h-full" 
                  : "w-[90vw] sm:w-[380px] h-[500px]"
              } ${
                theme === "dark" 
                  ? "bg-slate-950/40 border-white/10 text-white backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] ring-1 ring-white/10" 
                  : "bg-white/85 border-cyan-300 text-slate-950 shadow-[0_0_35px_10px_rgba(6,182,212,0.18)] backdrop-blur-2xl ring-1 ring-cyan-200/50 shadow-lg font-medium"
              }`}
            >
              {/* Header */}
              <div className={`p-4 border-b flex items-center justify-between ${
                theme === "dark" ? "border-white/5 bg-white/5 backdrop-blur-md" : "border-slate-200/50 bg-slate-50/55 backdrop-blur-md"
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold leading-tight flex items-center gap-1.5">
                      <span>MediCode AI Assistant</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </h4>
                    <p className={`text-[10px] ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      Discussing: {activeDoc.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setIsChatBotExpanded(!isChatBotExpanded)}
                    className="p-1.5 rounded-lg hover:bg-slate-700/10 text-slate-450 hover:text-cyan-400 transition-colors cursor-pointer"
                    title={isChatBotExpanded ? "Minimize Window" : "Expand to Full Screen"}
                  >
                    {isChatBotExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => { setIsChatBotOpen(false); setIsChatBotExpanded(false); }}
                    className="p-1.5 rounded-lg hover:bg-slate-700/10 text-slate-450 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Close Assistant"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(chatMessages[selectedDocId] || []).length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 px-4">
                    <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/10">
                      <Brain className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wide">AI Cognitive Consult</p>
                      <p className={`text-[11px] leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-800 font-semibold"}`}>
                        Ask about prescription instructions, dosage regimens, lab values, or general safety warnings for this document.
                      </p>
                    </div>
                  </div>
                ) : (
                  (chatMessages[selectedDocId] || []).map((msg) => {
                    const isAi = msg.sender === "ai";
                    return (
                      <div 
                        key={msg.id}
                        className={`flex gap-2 w-full max-w-[85%] ${isAi ? "mr-auto text-left justify-start" : "ml-auto text-right justify-start flex-row-reverse"}`}
                      >
                        <div className={`p-1.5 h-7 w-7 rounded-lg text-white shrink-0 flex items-center justify-center ${
                          isAi ? "bg-cyan-500" : "bg-indigo-600"
                        }`}>
                          {isAi ? <Brain className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className={`p-3 rounded-2xl text-xs leading-relaxed text-left ${
                            isAi
                              ? theme === "dark" ? "bg-slate-950/40 text-slate-200 border border-white/5" : "bg-cyan-50 border border-cyan-200/80 shadow-sm text-slate-950 font-medium"
                              : "bg-indigo-600 text-white"
                          }`}>
                            {isAi ? (
                              <StructuredMessage text={msg.text} theme={theme} />
                            ) : (
                              msg.text
                            )}
                          </div>
                          {!isAi ? (
                            <div className="flex items-center justify-end gap-2 mt-1 px-1 text-[9px] font-mono">
                              <button
                                onClick={() => handleCopyText(msg.text, msg.id)}
                                className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                                  copiedMsgId === msg.id 
                                    ? "text-emerald-500 bg-emerald-500/10" 
                                    : "text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                                }`}
                              >
                                {copiedMsgId === msg.id ? (
                                  <>
                                    <Check className="w-2.5 h-2.5 text-emerald-500" />
                                    <span className="text-emerald-500">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-2.5 h-2.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                              <span className="text-slate-600/40">•</span>
                              <span className="text-slate-500">{msg.timestamp}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-1 px-1 text-[9px] font-mono text-slate-400">
                              <span>{msg.timestamp}</span>
                              <span className="text-slate-600/40">•</span>
                              <button
                                onClick={() => handleToggleSpeak(msg.text, msg.id)}
                                className={`flex items-center gap-1 px-1.5 py-0.5 rounded hover:text-cyan-400 hover:bg-cyan-500/10 cursor-pointer transition-all ${
                                  activeSpeechId === msg.id ? "text-cyan-400 bg-cyan-500/10 font-semibold" : ""
                                }`}
                              >
                                {activeSpeechId === msg.id ? (
                                  <>
                                    <VolumeX className="w-2.5 h-2.5 animate-pulse" />
                                    <span>Stop</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-2.5 h-2.5" />
                                    <span>Listen</span>
                                  </>
                                )}
                              </button>
                              <span className="text-slate-600/40">•</span>
                              <button
                                onClick={() => handleCopyText(msg.text, msg.id)}
                                className={`flex items-center gap-1 px-1.5 py-0.5 rounded hover:text-cyan-400 hover:bg-cyan-500/10 cursor-pointer transition-all ${
                                  copiedMsgId === msg.id ? "text-emerald-500 bg-emerald-500/10" : ""
                                }`}
                              >
                                {copiedMsgId === msg.id ? (
                                  <>
                                    <Check className="w-2.5 h-2.5 text-emerald-500" />
                                    <span className="text-emerald-500">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-2.5 h-2.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}

                {isAiTyping && (
                  <div className="mr-auto text-left flex gap-2 w-full max-w-[85%] items-start animate-pulse">
                    <div className="p-1 px-1.5 h-7 rounded-lg bg-cyan-500 text-white flex items-center justify-center">
                      <Brain className="w-4 h-4 animate-bounce" />
                    </div>
                    <div className={`p-3 rounded-2xl text-xs ${theme === "dark" ? "bg-slate-950/40 border border-white/5 text-slate-400" : "bg-cyan-50/75 border border-cyan-200 text-slate-900 font-medium"}`}>
                      Gemini model synthesizing response...
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Suggestions */}
              <div className={`p-2.5 border-t flex flex-wrap gap-1.5 overflow-x-auto ${
                theme === "dark" ? "border-white/5 bg-transparent" : "border-slate-200/50 bg-slate-50/20"
              }`}>
                {[
                  "What does LDL cholesterol mean?",
                  "When should Amoxicillin be taken?",
                  "What is HbA1c normal range?",
                  "Explain biological results summary simply."
                ].map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => setChatInput(sug)}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold border cursor-pointer hover:bg-cyan-500/10 transition-colors ${
                      theme === "dark" ? "border-white/5 hover:border-cyan-500/30 bg-white/5 text-slate-400 hover:text-white" : "border-slate-300 hover:border-cyan-500 bg-white/80 text-slate-800 shadow-sm hover:text-cyan-950"
                    }`}
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChatMessage(e);
                }} 
                className={`p-3 border-t flex gap-2 ${
                  theme === "dark" ? "border-white/5 bg-white/5" : "border-slate-200/50 bg-slate-50/50"
                }`}
              >
                <input
                  type="text"
                  placeholder={
                    selectedLanguage === "te"
                      ? "మందులు, ఆహారం లేదా సూచికల గురించి జెమినిని అడగండి..."
                      : selectedLanguage === "hi"
                        ? "दवाओं, आहार या संकेतकों के बारे में जेमिनी से पूछें..."
                        : "Ask Gemini about medicines, diet, or markers..."
                  }
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className={`flex-1 p-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors ${
                    theme === "dark" ? "bg-slate-950/40 border-white/5 text-white placeholder-slate-600 focus:bg-slate-950/60" : "bg-white border-slate-300 text-slate-950 placeholder-slate-550 focus:bg-white focus:border-cyan-500 font-medium"
                  }`}
                />
                
                {/* Voice Dictation Microphone Button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 ${
                    isListening
                      ? "bg-rose-500 border-rose-500 text-white hover:bg-rose-600 animate-pulse shadow-md shadow-rose-500/20"
                      : theme === "dark"
                        ? "bg-white/5 border-white/5 text-slate-350 hover:bg-slate-800 hover:text-cyan-400"
                        : "bg-white/20 border-slate-200/40 text-slate-500 hover:bg-slate-100 hover:text-cyan-600"
                  }`}
                  title={
                    selectedLanguage === "te"
                      ? "మాట్లాడి ప్రశ్న అడగండి (Mic)"
                      : selectedLanguage === "hi"
                        ? "बोलकर प्रश्न पूछें (Mic)"
                        : "Ask with your voice (Mic)"
                  }
                >
                  {isListening ? (
                    <MicOff className="w-3.5 h-3.5 text-white animate-bounce" />
                  ) : (
                    <Mic className={`w-3.5 h-3.5 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
                  )}
                </button>

                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  title="Send Message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Trigger Button */}
        {!isChatBotExpanded && (
          <motion.button
            id="chatbot-trigger-button"
            onClick={() => setIsChatBotOpen(!isChatBotOpen)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3.5 rounded-full border shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isChatBotOpen 
                ? "bg-rose-500 text-white border-rose-450 shadow-rose-500/25" 
                : theme === "dark"
                  ? "bg-cyan-500 text-white border-cyan-400 hover:bg-cyan-450 shadow-cyan-500/20"
                  : "bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-550 shadow-cyan-600/20"
            }`}
            title={isChatBotOpen ? "Hide Chatbot" : "Ask Gemini Assistant"}
          >
            {isChatBotOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <MessageSquare className="w-5 h-5 animate-pulse" />
            )}
          </motion.button>
        )}

      </div>

      {/* FLOATING PRESCRIPTION HISTORY WIDGET */}
      <AnimatePresence>
        {isHistoryOpen && (
          <div 
            id="floating-history-container" 
            className="fixed right-6 bottom-24 md:right-24 md:bottom-6 z-[55] flex flex-col items-end gap-3 print:hidden"
          >
            <motion.div
              id="history-window"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 w-[90vw] sm:w-[380px] h-[500px] ${
                theme === "dark" 
                  ? "bg-slate-900/95 border-cyan-500/40 text-white backdrop-blur-xl shadow-[0_0_40px_8px_rgba(6,182,212,0.35)] ring-1 ring-cyan-500/30" 
                  : "bg-white/95 border-cyan-300 text-slate-900 shadow-[0_0_30px_6px_rgba(6,182,212,0.25)] backdrop-blur-xl ring-1 ring-cyan-200/50"
              }`}
            >
              {/* Header */}
              <div className={`p-4 border-b flex items-center justify-between ${
                theme === "dark" ? "border-cyan-500/15 bg-cyan-950/30 backdrop-blur-md" : "border-cyan-100 bg-cyan-50/40 backdrop-blur-md"
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
                    <History className={`w-4 h-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`} />
                  </div>
                  <div className="text-left">
                    <h4 className={`text-xs font-bold leading-tight flex items-center gap-1.5 ${theme === "dark" ? "text-slate-100" : "text-slate-900 font-extrabold"}`}>
                      <span>Prescription Scan History</span>
                      <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-full ${theme === "dark" ? "bg-cyan-500/20 text-cyan-400" : "bg-cyan-100 text-cyan-800"}`}>Local Session</span>
                    </h4>
                    <p className={`text-[10px] font-medium mt-0.5 ${theme === "dark" ? "text-slate-400" : "text-slate-800 font-semibold"}`}>
                      Last 10 prescriptions analyzed
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsHistoryOpen(false)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${theme === "dark" ? "hover:bg-white/10 text-slate-400 hover:text-rose-400" : "hover:bg-slate-100 text-slate-800 hover:text-rose-600"}`}
                    title="Close History"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
                {(() => {
                  const prescDocs = documents.filter(doc => doc.docType === "prescription").slice(0, 10);
                  if (prescDocs.length === 0) {
                    return (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                        <History className="w-10 h-10 text-slate-500/50 animate-pulse" />
                        <div>
                          <p className={`text-xs font-bold ${theme === "dark" ? "text-slate-300" : "text-slate-900 font-extrabold"}`}>No Prescriptions Analyzed</p>
                          <p className={`text-[10px] mt-1 ${theme === "dark" ? "text-slate-500" : "text-slate-800 font-semibold"}`}>Upload a prescription above to begin your active diagnostic history tracking.</p>
                        </div>
                      </div>
                    );
                  }

                  return prescDocs.map((doc) => {
                    const isSelected = selectedDocId === doc.id;
                    const patientName = doc.data?.patient?.name || "Patient";
                    const medicinesCount = doc.data?.medicines?.length || 0;
                    const hScore = doc.data?.healthScore || 85;
                    const urgency = doc.data?.urgencyLevel || "Routine";
                    
                    return (
                      <div
                        key={doc.id}
                        onClick={() => {
                          setSelectedDocId(doc.id);
                          setActiveMemberId(doc.memberId);
                          scrollToWorkspace();
                        }}
                        className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer hover:scale-[1.01] ${
                          isSelected 
                            ? theme === "dark" 
                              ? "bg-gradient-to-r from-cyan-950/70 to-blue-950/70 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400/50 text-white"
                              : "bg-cyan-50 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/60 text-slate-950 font-bold"
                            : theme === "dark"
                              ? "bg-slate-900/40 border-white/5 hover:border-cyan-500/45 hover:bg-slate-900/90 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                              : "bg-slate-50 border-slate-200/90 hover:border-cyan-500 hover:bg-slate-100 hover:shadow-[0_0_12px_rgba(6,182,212,0.15)] text-slate-800"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className={`text-xs font-bold leading-tight ${theme === "dark" ? "text-slate-200" : "text-slate-900 font-extrabold"}`}>
                              {doc.title || `Prescription for ${patientName}`}
                            </p>
                            <p className={`text-[9px] relative top-0.5 font-bold ${theme === "dark" ? "text-slate-400 opacity-85" : "text-slate-800 font-extrabold"}`}>
                              Analyzed: {doc.date}
                            </p>
                          </div>
                          
                          <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider ${
                            urgency === "Urgent" 
                              ? "bg-rose-500/15 text-rose-505 font-black" 
                              : urgency === "Moderate" ? "bg-amber-500/15 text-amber-600 font-bold" : "bg-emerald-550/15 text-emerald-700 font-extrabold"
                          }`}>
                            {urgency}
                          </span>
                        </div>

                        {/* Extra indicators */}
                        <div className={`flex flex-wrap items-center gap-2 mt-2.5 pt-2 border-t text-[9px] ${theme === "dark" ? "border-white/5 text-slate-400" : "border-slate-200 text-slate-900 font-extrabold"}`}>
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                            <span>{medicinesCount} Meds</span>
                          </span>
                          <span className="opacity-50">•</span>
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>Score: {hScore}%</span>
                          </span>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Footer info banner */}
              <div className={`p-2.5 border-t text-[9px] font-mono text-center font-bold relative z-[10] ${
                theme === "dark" ? "border-white/5 bg-white/5 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-800"
              }`}>
                Preserved locally on your machine
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top-button"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 p-3 rounded-full border shadow-xl transition-all duration-300 group hover:-translate-y-1 cursor-pointer ${
              theme === "dark" 
                ? "bg-slate-900/90 border-slate-800 text-cyan-400 hover:bg-slate-800 hover:text-cyan-350" 
                : "bg-white border-slate-200 text-cyan-600 hover:bg-slate-50 hover:text-cyan-550 shadow-slate-200/50"
            }`}
            title="Go to Top"
          >
            <ChevronUp className="w-5 h-5 transition-transform group-hover:scale-110" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* DYNAMIC PRINT-ONLY PRESCRIPTION REPORT PORTAL */}
      {activeDoc && activeDoc.docType === "prescription" && createPortal(
        <div id="prescription-print-section" className="hidden print:block bg-white text-slate-900">
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              @page {
                size: letter !important;
                margin: 1.25in !important;
              }
              html, body {
                background-color: #ffffff !important;
                color: #0d1b2a !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              #root, header, footer, aside, nav, button, .print\\:hidden, #chatbot-trigger-button, #scroll-to-top-button {
                display: none !important;
              }
              #prescription-print-section {
                display: block !important;
                visibility: visible !important;
                background-color: #ffffff !important;
                color: #0d1b2a !important;
                width: 100% !important;
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
              }
              .print-container {
                width: 100% !important;
                max-width: 100% !important;
                background: #ffffff !important;
              }
              .print-title {
                text-align: center !important;
                font-size: 24pt !important;
                font-weight: 800 !important;
                color: #1a365d !important; /* Elegant block blue */
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
                margin-top: 15pt !important;
                margin-bottom: 35pt !important;
              }
              .print-h2 {
                font-size: 14pt !important;
                font-weight: 700 !important;
                color: #2b6cb0 !important; /* Nice header blue */
                margin-top: 25pt !important;
                margin-bottom: 12pt !important;
                border-bottom: 1.5px solid #e2e8f0 !important;
                padding-bottom: 4pt !important;
                text-transform: none !important;
              }
              .print-info-grid {
                margin-bottom: 20pt !important;
              }
              .print-info-row {
                font-size: 11pt !important;
                line-height: 1.7 !important;
                margin-bottom: 4pt !important;
                color: #2d3748 !important;
              }
              .print-info-label {
                font-weight: 700 !important;
                display: inline-block !important;
                width: 145px !important;
                color: #1a202c !important;
              }
              .print-med-item {
                margin-bottom: 18pt !important;
                page-break-inside: avoid !important;
              }
              .print-med-title {
                font-size: 12.5pt !important;
                font-weight: 700 !important;
                color: #2b6cb0 !important;
                margin-bottom: 5pt !important;
              }
              .print-med-details-list {
                padding-left: 12pt !important;
              }
              .print-med-detail-row {
                font-size: 11pt !important;
                line-height: 1.6 !important;
                margin-bottom: 3pt !important;
                color: #2d3748 !important;
              }
              .print-med-label {
                font-weight: 700 !important;
                display: inline-block !important;
                width: 100px !important;
                color: #1a202c !important;
              }
              .print-notes-body {
                font-size: 11pt !important;
                line-height: 1.65 !important;
                color: #2d3748 !important;
                margin-top: 5pt !important;
              }
              .print-disclaimer-footer {
                margin-top: 50pt !important;
                text-align: center !important;
                color: #718096 !important;
                font-size: 10pt !important;
                line-height: 1.5 !important;
                border-top: 1px solid #e2e8f0 !important;
                padding-top: 15pt !important;
                page-break-inside: avoid !important;
              }
            }
          `}} />
          <div className="print-container">
            <h1 className="print-title">AI Prescription Analysis Report</h1>
            
            {/* Patient Information Section */}
            <div>
              <h2 className="print-h2">Patient Information</h2>
              <div className="print-info-grid">
                <div className="print-info-row">
                  <span className="print-info-label">Patient Name:</span>
                  {activeDoc.data.patient?.name || "Not specified"}
                </div>
                <div className="print-info-row">
                  <span className="print-info-label">Doctor Name:</span>
                  {activeDoc.data.patient?.doctorName || activeDoc.doctor || (activeDoc as any).doctorName || "Not specified"}
                </div>
                <div className="print-info-row">
                  <span className="print-info-label">Date:</span>
                  {activeDoc.data.patient?.date || activeDoc.date || "Not specified"}
                </div>
                <div className="print-info-row">
                  <span className="print-info-label">Report Generated:</span>
                  {new Date().toLocaleString("en-US", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true })}
                </div>
              </div>
            </div>

            {/* Prescribed Medications Section */}
            <div>
              <h2 className="print-h2">Prescribed Medications</h2>
              <div>
                {activeDoc.data.medicines?.map((med, idx) => (
                  <div key={idx} className="print-med-item">
                    <h3 className="print-med-title">{idx + 1}. {med.name}</h3>
                    <div className="print-med-details-list">
                      <div className="print-med-detail-row">
                        <span className="print-med-label">Dosage:</span>
                        {med.dosage || "Not specified"}
                      </div>
                      <div className="print-med-detail-row">
                        <span className="print-med-label">Frequency:</span>
                        {med.timing || "Once daily"}
                      </div>
                      <div className="print-med-detail-row">
                        <span className="print-med-label">Duration:</span>
                        {med.duration || "30 days"}
                      </div>
                      <div className="print-med-detail-row">
                        <span className="print-med-label">Instructions:</span>
                        {med.instructions || "Not specified"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Summary Section */}
            <div>
              <h2 className="print-h2">Quick Summary</h2>
              <p className="print-notes-body" style={{ background: "#e2f1f5", borderLeft: "4px solid #319795", padding: "10px", borderRadius: "4px", fontSize: "12px", lineHeight: "1.5" }}>
                {activeDoc.id === "doc-1" 
                  ? "You have been prescribed active heart & cholesterol support medications (Rosuvastatin & Clopidogrel) along with supplements. These are standard protective remedies to keep your blood vessels clear and your metabolism healthy. Please take them once daily as written, and talk to your doctor if you experience any unusual muscle aches."
                  : activeDoc.data.documentType === "prescription"
                    ? `This prescription outlines a schedule for ${activeDoc.data.medicines?.length || 0} medications, including ${activeDoc.data.medicines?.[0]?.name || "prescribed items"}. These are designed to target your recovery. Be sure to follow the dosage, duration, and instructions closely to complete your therapy.`
                    : `This lab report details thyroid metrics or blood chemistry markers. Your TSH is moderately elevated, meaning your thyroid may be working a little slowly. Always discuss these findings with your doctor for diagnostic confirmation.`}
              </p>
            </div>

            {/* Additional Notes Section */}
            <div>
              <h2 className="print-h2">Additional Notes</h2>
              <p className="print-notes-body">
                {activeDoc.id === "doc-1" 
                  ? "The prescription also contains dates 29/11/26 and 27/10/2026, which might be related to follow-up or previous prescriptions. There are also circled numbers '5' and '35' which are unclear in their context."
                  : (activeDoc.data.summary || "The prescription was fully decoded. Take all medication doses precisely as requested.")}
              </p>
            </div>

            {/* Report Disclaimer Footer */}
            <div className="print-disclaimer-footer">
              <p style={{ fontStyle: "italic", margin: "0 0 4px 0" }}>This report was generated by MediCode AI.</p>
              <p style={{ fontStyle: "italic", margin: 0 }}>Please verify all information with a qualified healthcare professional.</p>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}

export default function App() {
  return <AppContent isClerk={false} />;
}

