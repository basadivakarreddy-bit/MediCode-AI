# 🧬 MediCode AI

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Gemini_AI-SDK_2.4-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
</p>

> **Premium Futuristic Clinical SaaS Tool** — Decipher handwritten prescriptions, scan complex lab reports, track multi-member wellness markers over time, and translate diagnostic findings into localized native languages instantly.

---

## 🌟 Visual Dashboard Representation

The **MediCode AI Unified Clinical Dashboard** is fully responsive and optimized for both desktop views and hybrid mobile application wrappers:

```
+-------------------------------------------------------------------------------------------------+
|   🧬 MEDICODE AI        [ Dashboard ]  [ Health Timeline ]  [ Family Profiles ]  [ Local Logs ] |
+-------------------------------------------------------------------------------------------------+
|                                                                                                 |
|   +---------------------------------------+       +-----------------------------------------+   |
|   | 📤 DRAG & DROP MEDICAL DOCUMENT       |       | 🧭 ACTIVE PATIENT: EMILY JOHNSON (Self) |   |
|   |                                       |       |    Age: 28 | Female | Blood: O-             |   |
|   |   [ PDF / JPEG / PNG Scans ]          |       +-----------------------------------------+   |
|   |   *Click to select manual files*      |       |  📊 BIOMETRIC TRENDS OVER TIME          |   |
|   |                                       |       |                                         |   |
|   +---------------------------------------+       |        (Blood Glucose, BP, Hematology)  |   |
|   |  🌐 DYNAMIC LANGUAGE TRANSLATE        |       |         /\_/\     _/\                   |   |
|   |  [ English ]  [ తెలుగు ]  [ हिन्दी ]     |       |       _/     \_/\_/   \_  [Recharts Area]|   |
|   +---------------------------------------+       +-----------------------------------------+   |
|                                                                                                 |
|   +-----------------------------------------------------------------------------------------+   |
|   |  📋 EXTRACTED CLINICAL ANALYSIS & REVENUE-GRADE MEDICATION ROSTER                        |   |
|   |  - Amoxicillin (Dosage: 500mg, Timing: TDS, Duration: 7 Days)                           |   |
|   |  - Paracetamol (Dosage: 650mg, Timing: SOS/PRN)                                         |   |
|   +-----------------------------------------------------------------------------------------+   |
|                                                                                                 |
+-------------------------------------------------------------------------------------------------+
```

---

## 🛠️ Advanced Technology Stack

The application's high-fidelity performance is built upon a modular full-stack architecture utilizing modern frameworks:

### ⚡ Front-End & Visual Architecture
*   **React 19.0 (Hooks & Functional Architecture):** Utilizes standard functional components, clean state handlers, and robust effect hook patterns for low-latency client rendering.
*   **Vite 6.2:** High-speed development bundler configured with HMR-decoupled configurations.
*   **Tailwind CSS v4.0:** Dynamic, fluid, utility-first layout styling containing zero-runtime utility overrides.
*   **Motion (Framer Motion v12):** Orchestrates sleek, hardware-accelerated transitions, modal fades, sliding drawers, and voice active status ripple rings.
*   **Lucide React:** Pixel-perfect clinical iconography for consistent dashboard layouts.

### 📊 Data Intelligence & Analytics
*   **Recharts 3.8:** Rich interactive data charting engine handling historical tracking trajectories of crucial metrics:
    - *Fasting Blood Glucose (mg/dL)*
    - *Blood Pressure (Systolic / Diastolic mmHg)*
    - *Hematology Hemoglobin (g/dL)*
    - *Body Weight (Kg)*
    - *Serum Cholesterol (mg/dL)*
*   **html2canvas & jsPDF Framework:** Integrated dynamic rendering pipelines. Standard PDF engines struggle with Indic scripts (Devanagari, Telugu); to solve this, MediCode AI uses a dynamic high-fidelity HTML letterhead layout rendered to an offline off-screen canvas at `2.0x` pixel scale before stream writing to a PDF layout.

### 🧠 Core Artificial Intelligence Engine
*   **Google Gen AI SDK v2.4 (`@google/genai`):** Built-in server-side API communication layers, executing highly structured medical document summaries, demographics categorization, and medical term translations.
*   **Dual Multi-Key API Pooling:** Prevents unexpected `429 Resource Exhausted` rate limits by automatically cycling requests across primary, secondary, and extra-credits fallback keys.

### 📱 Hybrid WebView & Mobile Wrappers (e.g., Median.co, Cordova, Capacitor)
*   **Web Speech Synthesis (`SpeechSynthesisUtterance`):** Complete voice readout of prescriptions and chat messages.
*   **Web Speech Recognition (`webkitSpeechRecognition`):** Converts active speech into text inputs for conversational diagnostic consultations.
*   **Mobile Audio Context Unlock:** Bypasses aggressive iOS and Android mobile WebView browser sound-blocking rules. Features a synchronized instant silent utterance trigger during active clicks followed by a `60ms` asynchronous queue buffer.

---

## 🚀 Key Deployed Features

### 1. 📑 Document Decryption & OCR
*   **Handwritten Prescription Deciphering:** Translates dense handwritten doctor notes, clinical shorthand abbreviations (`TDS`, `BD`, `HS`, `PRN`), dosage frequencies, treatment lengths, and safety instructions into clean, readable tabular schedules.
*   **Structured Lab Report Analyzer:** Extracts vital indicators and flags values as **Normal**, **High**, or **Low** with actionable plain-language clinical summaries.
*   **Automatic Demographics Profiling:** Automatically extracts patient demographics, blood group records, active allergies, emergency contact credentials, and attending physician names from uploaded documents.

### 👥 2. Household Profile Manager
*   **Multi-Member File Separation:** Toggle and manage independent profiles for family members: `Self` | `Father` | `Mother` | `Child` | `Grandparent`.
*   **Custom Baseline Allergies & Chronicles:** Saves active medical baselines, chronicles, and emergency information per individual.
*   **Timeline History Archiving:** Saves up to 10 parsed prescription files or lab histories under local sandbox storages bound automatically to each profile.

### 🌐 3. Multilingual Accessibility Engine
*   **Dynamic Translation Optimization:** Effortlessly translate parsed clinical terms, prescription timetables, side effects, and warning points with localized language optimization:
    *   🇬🇧 **English:** Default clean, premium corporate typography.
    *   🇮🇳 **Telugu (తెలుగు):** Highly specialized native translation for andhra/telangana elders.
    *   🇮🇳 **Hindi (हिन्दी):** Fluid devanagari script translation of complex clinical terminology.

### 🎙️ 4. Speech-To-Text AI Assistant
*   **Interactive Voice Querying:** Use the built-in microphone/audio capturing toolkit to dictate medical questions about prescriptions.
*   **Voice Answers:** Integrates Gemini-powered continuous clinical reasoning of the current file context to safely resolve clarification queries.

---

## ⚕️ High-Availability Failover & Resiliency

To prevent unexpected quota limitations and rate limits, the application contains robust engineering safeguards:

### 📝 1. The Multi-Key API Pool
The backend utilizes automated fallback logic across three independent environment variable layers:
1.  `GEMINI_API_KEY` (Primary client credential)
2.  `GEMINI_API_KEY_SECONDARY` (Backup pipeline)
3.  `EXTRA_CREDITS_API_KEY` (SaaS fallback credential for extra credits)

If any key is overloaded or exceeds limits, the server automatically rotates downstream to the next available credentials without breaking user workflows.

### 🏥 2. Intelligent Offline Clinical Advisor
If ALL keys are completely exhausted, the app is armed with an **Offline Clinical System Rule**:
*   Instead of crashing, the assistant falls back to a highly realistic local rule-based medical evaluation of patient demographics and extracted vitals from local storage.
*   This keeps the UI entirely interactive and provides generic health guidelines (hydration, dosage compliance, provider contacts) safely.

---

## 📱 Mobile Conversion & WebView Wrapper Guide (Median.co / Cordova)

When converting this web application to a native iOS/Android mobile app using **Median.co** (formerly GoNative) or similar tools, please configure the following parameters to ensure smooth microphone and file upload operations:

### 🔑 Required Native Permissions
1.  **Microphone Permission:** Required for the Voice Chatbot listening module.
    *   *Android (`AndroidManifest.xml`):* `<uses-permission android:name="android.permission.RECORD_AUDIO" />`
    *   *iOS (`Info.plist`):* `NSMicrophoneUsageDescription` — "MediCode AI needs microphone access to translate your clinical questions into text."
2.  **Camera & Storage Permission:** Required for capturing paper prescriptions directly inside the app.
    *   *Android:* `<uses-permission android:name="android.permission.CAMERA" />`
    *   *iOS:* `NSCameraUsageDescription` & `NSPhotoLibraryUsageDescription`

### 🔊 WebView Audio Optimizations Deployed
Standard mobile WebViews block speech synthesizers until explicit user interaction happens. MediCode AI implements a pre-emptive **Audio Context Unlock Pattern**:
```typescript
// Triggers immediately upon user interaction (tap on Speaker button)
const unlockUtterance = new SpeechSynthesisUtterance("");
window.speechSynthesis.speak(unlockUtterance);

// Spawns a 60ms delay queue allowing the OS to register user intent,
// bypass webview restrictions, and run high-fidelity text-to-speech.
setTimeout(() => {
  window.speechSynthesis.speak(actualUtterance);
}, 60);
```

---

## 🧱 Architectural Structure

```
├── 📁 backend/
│   └── 📄 server.ts         # Express production entry-point & dynamic asset server
├── 📁 frontend/
│   └── 📁 src/
│       ├── 📄 App.tsx       # Core Clinical Dashboard & State Orchestrator
│       ├── 📄 types.ts      # Structured TypeScript clinical interfaces
│       ├── 📄 data.ts       # Emergency protocols & localized clinical assets
│       └── 📁 components/   # Modular dashboard UI widgets
│           ├── 📄 FAQContact.tsx       # Emergency contacts & localized FAQs
│           ├── 📄 HealthTimeline.tsx   # Recharts biometric logs & charting
│           └── 📄 InteractiveHero.tsx   # Dynamic entry animations
├── 📄 package.json          # Main workspaces & unified build instructions
├── 📄 vite.config.ts        # Vite bundle configurations
└── 📄 README.md             # High-fidelity architectural guide
```

---

## 💻 Local Development Setup

Ensure you have **Node.js** (v18+) and compile the tools as follows:

1.  **Clone the Repository** and navigate to the directory.
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup your environment keys:**
    Create a `.env` file in the root directory:
    ```env
    GEMINI_API_KEY="AI_STUDIO_KEY_HERE"
    GEMINI_API_KEY_SECONDARY="SECONDARY_KEY_HERE"
    EXTRA_CREDITS_API_KEY="EXTRA_CREDITS_KEY_HERE"
    ```
4.  **Launch the developmental server:**
    ```bash
    npm run dev
    ```
5.  **Build & Compile Server bundles:**
    ```bash
    npm run build
    ```
6.  **Start Production Node Server:**
    ```bash
    npm start
    ```

---

*Disclaimers: MediCode AI is an educational diagnostic demonstration. It is not intended to substitute for professional medical advice, diagnosis, or treatment.*
