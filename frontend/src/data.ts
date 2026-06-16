import { FamilyMember, SavedDocument, TimelineMetric } from "./types";

export const INITIAL_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: "self",
    name: "Emily Johnson",
    relation: "Self",
    age: "32",
    gender: "Female",
    bloodGroup: "O+",
    allergies: "Sulfonamides, Penicillin (mild rash)",
    chronicDiseases: "None",
    emergencyContact: "Arthur Johnson (+1 555-0192)",
    medicalNotes: "Regular gym goer. Slight history of seasonal pollen asthma.",
    avatarColor: "from-cyan-500 to-blue-600"
  },
  {
    id: "father",
    name: "Arthur Johnson",
    relation: "Father",
    age: "64",
    gender: "Male",
    bloodGroup: "A+",
    allergies: "None",
    chronicDiseases: "Hypertension (managed with Amlodipine)",
    emergencyContact: "Emily Johnson (+1 555-0188)",
    medicalNotes: "Advised to limit sodium. Enjoys golf and morning yoga.",
    avatarColor: "from-teal-500 to-emerald-600"
  },
  {
    id: "mother",
    name: "Sarah Johnson",
    relation: "Mother",
    age: "59",
    gender: "Female",
    bloodGroup: "O-",
    allergies: "NSAIDs (Aspirin causes stomach bleeding)",
    chronicDiseases: "Hypothyroidism (managed with Levothyroxine)",
    emergencyContact: "Emily Johnson (+1 555-0188)",
    medicalNotes: "Diagnosed in 2018. Needs regular TSH lab screens.",
    avatarColor: "from-purple-500 to-pink-600"
  },
  {
    id: "grandparent",
    name: "Henry Johnson",
    relation: "Grandparent",
    age: "82",
    gender: "Male",
    bloodGroup: "O+",
    allergies: "Contrast dye (severe)",
    chronicDiseases: "Type 2 Diabetes, Mild Osteoarthritis",
    emergencyContact: "Arthur Johnson (+1 555-0192)",
    medicalNotes: "Requires daily insulin checking and comfortable orthopedic shoes.",
    avatarColor: "from-amber-500 to-orange-600"
  }
];

export const INITIAL_TIMELINE_METRICS: TimelineMetric[] = [
  { date: "Jan 2026", bloodSugar: 98, weight: 64, hemoglobin: 13.5, systolicBP: 118, diastolicBP: 78, cholesterol: 185 },
  { date: "Feb 2026", bloodSugar: 102, weight: 64.5, hemoglobin: 13.4, systolicBP: 122, diastolicBP: 80, cholesterol: 191 },
  { date: "Mar 2026", bloodSugar: 106, weight: 65, hemoglobin: 13.2, systolicBP: 125, diastolicBP: 82, cholesterol: 210 },
  { date: "Apr 2026", bloodSugar: 104, weight: 64.8, hemoglobin: 13.1, systolicBP: 121, diastolicBP: 79, cholesterol: 202 },
  { date: "May 2026", bloodSugar: 108, weight: 65.2, hemoglobin: 13.3, systolicBP: 128, diastolicBP: 84, cholesterol: 220 },
  { date: "Jun 2026", bloodSugar: 105, weight: 65.0, hemoglobin: 13.2, systolicBP: 124, diastolicBP: 81, cholesterol: 224 }
];

export const GENERAL_HEALTH_TIPS = [
  {
    id: "tip1",
    title: "Understanding Pre-Diabetes",
    content: "An HbA1c between 5.7% and 6.4% is a warning sign. Switching plain grain flour to whole grains can drop glucose markers by 12% in three months.",
    tag: "Nutrition"
  },
  {
    id: "tip2",
    title: "Deciphering Doctor's Abbreviations",
    content: "'b.i.d.' means twice daily, 't.i.d.' means three times, and 'q.h.s.' signifies taking a medication right before sleeping.",
    tag: "Education"
  },
  {
    id: "tip3",
    title: "Managing Borderline LDL",
    content: "Pectin-rich fruits such as apples, grapes, and citrus fruits act as sponge barriers, absorbing active LDL fats in the small intestines.",
    tag: "Cardiology"
  }
];

export const PRE_LOADED_DOCUMENTS: SavedDocument[] = [
  {
    id: "doc-1",
    date: "2026-10-27",
    docType: "prescription",
    title: "Cardiometabolic Prescription Deciphered",
    fileName: "extracted_prescription.png",
    memberId: "self",
    data: {
      documentType: "prescription",
      patient: {
        name: "Not specified",
        age: "Not specified",
        gender: "Not specified",
        date: "27/10/2026",
        doctorName: "Not specified",
        bloodGroup: "",
        allergies: ""
      },
      summary: "The prescription also contains dates 29/11/26 and 27/10/2026, which might be related to follow-up or previous prescriptions. There are also circled numbers '5' and '35' which are unclear in their context.",
      healthScore: 92,
      urgencyLevel: "Mild",
      confidenceScore: 95,
      medicines: [
        {
          name: "Rosuvastatin",
          purpose: "Cholesterol lowering medication",
          dosage: "75 mg",
          duration: "30 days",
          timing: "Once daily",
          instructions: "Not specified"
        },
        {
          name: "Clopidogrel",
          purpose: "Antiplatelet blood thinner to prevent cardiovascular events",
          dosage: "75 mg",
          duration: "30 days",
          timing: "Once daily",
          instructions: "Not specified"
        },
        {
          name: "Rosuvastatin",
          purpose: "Statins for arterial health",
          dosage: "Not specified",
          duration: "30 days",
          timing: "Once daily",
          instructions: "Not specified"
        },
        {
          name: "Metabolic Care",
          purpose: "Deciphered daily cardiometabolic supplement provider",
          dosage: "Not specified",
          duration: "30 days",
          timing: "Once daily",
          instructions: "Not specified"
        },
        {
          name: "Multivitamin",
          purpose: "Nutritional daily multivitamin defense",
          dosage: "Not specified",
          duration: "30 days",
          timing: "Once daily",
          instructions: "Not specified"
        }
      ],
      warnings: ["Monitor for muscle aches or dark urine if taking multiple statins concurrently."],
      recommendations: ["Take Rosuvastatin in the evening for maximum liver synthesis absorption."]
    }
  },
  {
    id: "doc-2",
    date: "2026-03-14",
    docType: "lab_report",
    title: "Annual Metabolic Screening",
    fileName: "bloodpanel_annual_sarah.png",
    memberId: "mother",
    data: {
      documentType: "lab_report",
      patient: {
        name: "Sarah Johnson",
        age: "59",
        gender: "Female",
        date: "March 14, 2026",
        bloodGroup: "O-",
        allergies: "NSAIDs"
      },
      summary: "Annual hormone and vital assessment reports. TSH is elevated, indicating need for mild thyroid hormone adjustment.",
      healthScore: 78,
      urgencyLevel: "Mild",
      confidenceScore: 96,
      labResults: [
        {
          name: "TSH (Thyroid)",
          currentValue: 5.8,
          normalRange: "0.4 - 4.2 uIU/mL",
          status: "High",
          explanation: "Slightly elevated thyroid stimulating hormone points to mild hypothyroid underactivity.",
          category: "Endocrine"
        },
        {
          name: "Hemoglobin",
          currentValue: 12.1,
          normalRange: "12.0 - 15.5 g/dL",
          status: "Normal",
          explanation: "Perfect hemoglobin levels, indicating active oxygen cell respiration health.",
          category: "CBC"
        }
      ],
      warnings: ["Thyroid values are elevated. Levothyroxine capsule adjustment can be reviewed."],
      recommendations: ["Check selenium and zinc content dietarily.", "Schedule blood thyroid panels annually."]
    }
  }
];

export const PRELOADED_TRANSLATIONS: Record<string, Record<"te" | "hi", any>> = {
  "doc-1": {
    te: {
      documentType: "prescription",
      patient: {
        name: "పేర్కొనబడలేదు",
        age: "పేర్కొనబడలేదు",
        gender: "పేర్కొనబడలేదు",
        date: "27/10/2026",
        doctorName: "పేర్కొనబడలేదు",
        bloodGroup: "",
        allergies: ""
      },
      summary: "కొలెస్ట్రాల్ సవరణ మరియు గుండె లోప నివారణ చికిత్స కోర్సు. రక్తనాళాలను ఆరోగ్యంగా ఉంచడానికి మరియు గుండె మరియు కొలెస్ట్రాల్ రక్షణకు నివారణలు ఉన్నాయి.",
      healthScore: 92,
      urgencyLevel: "Mild",
      confidenceScore: 95,
      medicines: [
        {
          name: "రోసువాస్టాటిన్ (Rosuvastatin)",
          purpose: "కొలెస్ట్రాల్ తగ్గించే వైద్య నివారణ",
          dosage: "7.5 mg",
          duration: "30 రోజులు",
          timing: "రోజుకు ఒకసారి",
          instructions: "సాయంత్రం సమయంలో తీసుకోండి"
        },
        {
          name: "క్లోపిడోగ్రెల్ (Clopidogrel)",
          purpose: "రక్తాన్ని పలచబరిచే మందు మరియు గుండెజబ్బు నిరోధకం",
          dosage: "75 mg",
          duration: "30 రోజులు",
          timing: "రోజుకు ఒకసారి",
          instructions: "నీటితో తీసుకోండి"
        },
        {
          name: "రోసువాస్టాటిన్ (Rosuvastatin 2)",
          purpose: "ధమనుల ఆరోగ్యానికి స్టాటిన్స్",
          dosage: "పేర్కొనబడలేదు",
          duration: "30 రోజులు",
          timing: "రోజుకు ఒకసారి",
          instructions: "పేర్కొనబడలేదు"
        },
        {
          name: "మెటబాలిక్ కేర్ (Metabolic Care)",
          purpose: "రోజువారీ కొలెస్ట్రాల్ సప్లిమెంట్",
          dosage: "పేర్కొనబడలేదు",
          duration: "30 రోజులు",
          timing: "రోజుకు ఒకసారి",
          instructions: "పేర్కొనబడలేదు"
        },
        {
          name: "మల్టీవిటమిన్ (Multivitamin)",
          purpose: "పోషకాహార రక్షణ",
          dosage: "పేర్కొనబడలేదు",
          duration: "30 రోజులు",
          timing: "రోజుకు ఒకసారి",
          instructions: "పేర్కొనబడలేదు"
        }
      ],
      warnings: ["ఏకకాలంలో బహుళ స్టాటిన్లను తీసుకుంటే కండరాల నొప్పులు లేదా ముదురు రంగు మూత్రాన్ని గమనించండి."],
      recommendations: ["గరిష్ట శోషణ మరియు ప్రయోజనం కోసం సాయంత్రం సమయంలో రోసువాస్టాటిన్ తీసుకోండి."]
    },
    hi: {
      documentType: "prescription",
      patient: {
        name: "निर्दिष्ट नहीं",
        age: "निर्दिष्ट नहीं",
        gender: "निर्दिष्ट नहीं",
        date: "27/10/2026",
        doctorName: "निर्दिष्ट नहीं",
        bloodGroup: "",
        allergies: ""
      },
      summary: "कोलेस्ट्रॉल के नियमन और हृदय स्वास्थ्य सुरक्षा का कोर्स। रक्त वाहिकाओं को साफ और स्वस्थ रखने के लिए दवाएं दी गई हैं।",
      healthScore: 92,
      urgencyLevel: "Mild",
      confidenceScore: 95,
      medicines: [
        {
          name: "रोसुवास्टेटिन (Rosuvastatin)",
          purpose: "कोलेस्ट्रॉल कम करने की दवा",
          dosage: "7.5 mg",
          duration: "30 दिन",
          timing: "दिन में एक बार",
          instructions: "शाम को लें"
        },
        {
          name: "क्लोपिडोग्रेल (Clopidogrel)",
          purpose: "हार्ट अटैक की रोकथाम के लिए खून पतला करने वाली दवा",
          dosage: "75 mg",
          duration: "30 दिन",
          timing: "दिन में एक बार",
          instructions: "पानी के साथ लें"
        },
        {
          name: "रोसुवास्टेटिन (Rosuvastatin 2)",
          purpose: "धमनियों के स्वास्थ्य के लिए स्टेटिन",
          dosage: "निर्दिष्ट नहीं",
          duration: "30 दिन",
          timing: "दिन में एक बार",
          instructions: "निर्दिष्ट नहीं"
        },
        {
          name: "मेटाबॉलिक केयर (Metabolic Care)",
          purpose: "दैनिक कार्डियोमेटाबॉलिक स्वास्थ्य पूरक",
          dosage: "निर्दिष्ट नहीं",
          duration: "30 दिन",
          timing: "दिन में एक बार",
          instructions: "निर्दिष्ट नहीं"
        },
        {
          name: "मल्टीविटामिन (Multivitamin)",
          purpose: "दैनिक पोषण संबंधी मल्टीविटामिन",
          dosage: "निर्दिष्ट नहीं",
          duration: "30 दिन",
          timing: "दिन में एक बार",
          instructions: "निर्दिष्ट नहीं"
        }
      ],
      warnings: ["यदि एक साथ कई स्टेटिन ले रहे हैं, तो मांसपेशियों में दर्द या गहरे रंग के मूत्र की निगरानी करें।"],
      recommendations: ["अधिकतम लिवर अवशोषण के लिए शाम को रोसुवास्टेटिन लें।"]
    }
  },
  "doc-2": {
    te: {
      documentType: "lab_report",
      patient: {
        name: "సారా జాన్సన్",
        age: "59",
        gender: "స్త్రీ",
        date: "మార్చి 14, 2026",
        bloodGroup: "O-",
        allergies: "NSAIDs"
      },
      summary: "వార్షిక హార్మోన్ మరియు కీలక అంచనా నివేదికలు. TSH పెరిగింది, ఇది స్వల్ప థైరాయిడ్ హార్మోన్ సర్దుబాటు అవసరాన్ని సూచిస్తుంది.",
      healthScore: 78,
      urgencyLevel: "Mild",
      confidenceScore: 96,
      labResults: [
        {
          name: "TSH (థైరాయిడ్)",
          currentValue: 5.8,
          normalRange: "0.4 - 4.2 uIU/mL",
          status: "High",
          explanation: "స్వల్పంగా పెరిగిన థైరాయిడ్ హార్మోన్ సూచిక తక్కువ థైరాయిడ్ పనితీరును సూచిస్తుంది.",
          category: "Endocrine"
        },
        {
          name: "హిమోగ్లోబిన్ (Hemoglobin)",
          currentValue: 12.1,
          normalRange: "12.0 - 15.5 g/dL",
          status: "Normal",
          explanation: "అద్భుతమైన హిమోగ్లోబిన్ స్థాయిలు, ఆరోగ్యకరమైన ఆక్సిజన్ కణాల ప్రసరణను సూచిస్తాయి.",
          category: "CBC"
        }
      ],
      warnings: ["థైరాయిడ్ విలువలు ఎక్కువగా ఉన్నాయి. లెవోథైరాక్సిన్ మోతాదు సవరణను సమీక్షించవచ్చు."],
      recommendations: ["ఆహారంలో సెలీనియం మరియు జింక్ కంటెంట్‌ను తనిఖీ చేయండి.", "వార్షికంగా థైరాయిడ్ పరీక్షలను షెడ్యూల్ చేయండి."]
    },
    hi: {
      documentType: "lab_report",
      patient: {
        name: "सारा जॉनसन",
        age: "59",
        gender: "महिला",
        date: "14 मार्च, 2026",
        bloodGroup: "O-",
        allergies: "NSAIDs"
      },
      summary: "वार्षिक हार्मोन और महत्वपूर्ण मूल्यांकन रिपोर्ट। टीएसएच (TSH) का स्तर बढ़ा हुआ है, जो हल्के थायराइड हार्मोन समायोजन की आवश्यकता को इंगित करता है।",
      healthScore: 78,
      urgencyLevel: "Mild",
      confidenceScore: 96,
      labResults: [
        {
          name: "TSH (थायराइड)",
          currentValue: 5.8,
          normalRange: "0.4 - 4.2 uIU/mL",
          status: "High",
          explanation: "थोड़ा बढ़ा हुआ थायराइड उत्तेजक हार्मोन माइल्ड हाइपोथायरायडिज्म की ओर इशारा करता है।",
          category: "Endocrine"
        },
        {
          name: "हीमोग्लोबिन (Hemoglobin)",
          currentValue: 12.1,
          normalRange: "12.0 - 15.5 g/dL",
          status: "Normal",
          explanation: "उत्कृष्ट हीमोग्लोबिन स्तर, स्वस्थ ऑक्सीजन सेल श्वसन स्वास्थ्य का प्रदर्शन करता है।",
          category: "CBC"
        }
      ],
      warnings: ["थायराइड के मान बढ़े हुए हैं। लेवोथायरोक्सिन कैप्सूल समायोजन की समीक्षा डॉक्टर के साथ की जा सकती है।"],
      recommendations: ["आहार में सेलेनियम और जिंक सामग्री की जांच करें।", "सालाना थायराइड पैनलों का समय निर्धारित करें।"]
    }
  }
};

