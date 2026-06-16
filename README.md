# 🧬 MediCode AI

> **Premium Futuristic Clinical SaaS Tool** — Decipher handwritten prescriptions, scan complex lab reports, track multi-member wellness markers over time, and translate diagnostic findings into localized native languages instantly.

---

## 🌟 Visual Preview

Below is a representation of the **MediCode AI Unified Clinical Dashboard**:

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
|   +---------------------------------------+       |                                         |   |
|   |  🌐 DYNAMIC LANGUAGE TRANSLATE        |       |        (Blood Glucose, BP, Hematology)  |   |
|   |  [ English ]  [ తెలుగు ]  [ हिन्दी ]     |       |         /\_/\     _/\                   |   |
|   +---------------------------------------+       |       _/     \_/\_/   \_  [Recharts Area]|   |
|                                                   +-----------------------------------------+   |
|   +-----------------------------------------------------------------------------------------+   |
|   |  📋 EXTRACTED CLINICAL ANALYSIS & REVENUE-GRADE MEDICATION ROSTER                        |   |
|   |  - Amoxicillin (Dosage: 500mg, Timing: TDS, Duration: 7 Days)                           |   |
|   |  - Paracetamol (Dosage: 650mg, Timing: SOS/PRN)                                         |   |
|   +-----------------------------------------------------------------------------------------+   |
|                                                                                                 |
+-------------------------------------------------------------------------------------------------+
```

---

## 🚀 Key Features Deployed & Built

This full-stack clinical tool is fully responsive and leverages server-side **Google Gemini models** to power automated health marker intelligence:

### 1. 📑 Document Decryption & OCR
*   **Handwritten Prescription Deciphering:** Translates dense handwritten doctor notes, clinical abbreviations (`TDS`, `BD`, `HS`, `PRN`), dosage frequencies, treatment lengths, and safety instructions into clean, readable tabular schedules.
*   **Structured Lab Report Analyzer:** Extracts vital indicators (eg: Hemoglobin, Fasting Blood Sugar, Weight, Blood Pressure, Cholesterol) and flags values as **Normal**, **High**, or **Low** with actionable plain-English clinical insights.
*   **Automatic Demographics Profiling:** Automatically extracts patient demographics, blood group records, active allergies, emergency contact credentials, and attending physician names from the uploaded documents.

### 2. 👥 Multi-Member Profile Manager
*   **Household Dossier Sharing:** Create and toggle unique clinical profiles for individual family members:
    `Self` | `Father` | `Mother` | `Child` | `Grandparent`
*   **Custom Avatar Coloring & Metadata:** Tracks independent baseline allergies, baseline chronic ailments, emergency contacts, and personalized doctor logs per member.
*   **Associated Diagnostics Archiving:** Easily saves up to 10 scanned records in local database sandboxes, bound automatically to the specific medical timeline of the selected profile.

### 3. 📈 Diagnostic Biometrics Timeline & Log
*   **Responsive Area & Line Charts (Recharts):** Fully interactive charts logging historical trajectories of blood sugar, blood pressure, weight, hemoglobin, and cholesterol.
*   **Fasting Glucose Status Evaluator:** In-app real-time indicator that calculates safe baseline zones vs active metabolic thresholds with automated dietary guidance programs.
*   **Record Logging:** Quickly logging fresh vitals and biometric updates to watch trend lines update in real time.

### 4. 🌐 Multilingual Accessibility Engine
*   **One-Click Structural Localization:** Seamlessly translate parsed clinical terms, prescription timetables, side effects, and warning points with local language optimization:
    - 🇬🇧 **English:** Default clean, premium corporate typography.
    - 🇮🇳 **Telugu (తెలుగు):** Highly specialized native translation for andhra/telangana elders.
    - 🇮🇳 **Hindi (हिन्दी):** Fluid devanagari script translation of complex clinical terminology.

### 5. 🎙️ Speech-To-Text AI Assistant
*   **Interactive Voice Querying:** Use the built-in microphone/audio capturing toolkit to dictate medical questions about prescriptions.
*   **Voice Answers:** Integrates Gemini-powered continuous clinical reasoning of the current file context to safely resolve clarification queries.

---

## 🛠️ High-Availability Failover & Resiliency

To prevent unexpected quota limitations and rate limits (such as `429 Resource Exhausted`), the application contains robust engineering safeguards:

### 📝 1. The Multi-Key API Pool
The backend utilizes automated fallback logic across three independent environment variable layers:
1.  `GEMINI_API_KEY` (Primary client credential)
2.  `GEMINI_API_KEY_SECONDARY` (Backup pipeline)
3.  `EXTRA_CREDITS_API_KEY` (SaaS fallback credential for extra credits)

If any key is overloaded or exceeds limits, the server automatically rotates downstream to the next available credentials without breaking user workflows.

### ⚕️ 2. Intelligent Offline Clinical Advisor
If ALL keys are completely exhausted, the app is armed with an **Offline Clinical System Rule**:
*   Instead of crashing, the assistant falls back to a highly realistic local rule-based medical evaluation of patient demographics and extracted vitals from local storage.
*   This keeps the UI entirely interactive and provides generic health guidelines (hydration, dosage compliance, provider contacts) safely.

---

## 🧱 Architectural Layout

```
├── 📁 vercel.json           # Vercel configuration for serverless distribution
├── 📁 api/
│   └── 📄 index.ts          # Serverless routing adapter
├── 📁 backend/
│   └── 📄 server.ts         # Express server with Vite middleware integrations
├── 📁 frontend/
│   └── 📁 src/
│       ├── 📄 App.tsx       # Primary diagnostic layout container
│       ├── 📄 types.ts      # Structured TypeScript clinical interfaces
│       ├── 📄 data.ts       # Presets and emergency clinical instructions
│       └── 📁 components/   # High-fidelity custom widgets
│           ├── 📄 FAQContact.tsx       # FAQ & urgent care contacts
│           ├── 📄 HealthTimeline.tsx   # Interactive charts & metric loggers
│           └── 📄 InteractiveHero.tsx   # Visual landing modules
```

---

## 💻 Local Development Setup

To run this application locally, ensure you have **Node.js** (v18+) and compile the tools as follows:

1.  **Clone the Repository** and navigate to the directory.
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup your environment keys:**
    Create a `.env` file based on `.env.example`:
    ```env
    # .env
    GEMINI_API_KEY="AI_STUDIO_KEY_HERE"
    EXTRA_CREDITS_API_KEY="EXTRA_CREDITS_KEY_HERE"
    ```
4.  **Launch the developmental build:**
    ```bash
    npm run dev
    ```
5.  **Build and Compile:**
    ```bash
    npm run build
    ```
6.  **Start Production server:**
    ```bash
    npm start
    ```

---

## ☁️ Deployment (Vercel Support)

This codebase has been optimized for **zero-configuration deployments** to Vercel:

1.  `vercel.json` and `/api/index.ts` automatically map Express API routes to Vercel serverless functions.
2.  Import this repository into Vercel.
3.  Simply configure your environment variables (`GEMINI_API_KEY`, `EXTRA_CREDITS_API_KEY`) in the Vercel Dashboard, and you are ready to share!

---

*Disclaimers: MediCode AI is an educational diagnostic demonstration. It is not intended to substitute for professional medical advice, diagnosis, or treatment.*
