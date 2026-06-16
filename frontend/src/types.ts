export interface Medication {
  name: string;
  purpose: string;
  dosage: string;
  timing: string;
  instructions: string;
  sideEffects?: string;
  warnings?: string;
  interactions?: string;
  duration?: string;
}

export interface LabResult {
  name: string;
  currentValue: number;
  normalRange: string;
  status: 'Normal' | 'High' | 'Low';
  explanation: string;
  category: string;
}

export interface PatientDetails {
  name: string;
  age: string;
  gender: string;
  date: string;
  bloodGroup?: string;
  allergies?: string;
  chronicDiseases?: string;
  emergencyContact?: string;
  medicalNotes?: string;
  doctorName?: string;
}

export interface AnalysisResult {
  documentType: 'prescription' | 'lab_report';
  patient: PatientDetails;
  summary: string;
  healthScore: number;
  urgencyLevel: 'Mild' | 'Moderate' | 'Urgent';
  confidenceScore: number;
  medicines?: Medication[];
  labResults?: LabResult[];
  warnings: string[];
  recommendations: string[];
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: 'Self' | 'Father' | 'Mother' | 'Child' | 'Grandparent';
  age: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  allergies: string;
  chronicDiseases: string;
  emergencyContact: string;
  medicalNotes: string;
  avatarColor: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface SavedDocument {
  id: string;
  date: string;
  docType: 'prescription' | 'lab_report';
  title: string;
  fileName: string;
  data: AnalysisResult;
  memberId: string; // associate to a family member
}

export interface TimelineMetric {
  date: string;
  bloodSugar: number;
  weight: number;
  hemoglobin: number;
  systolicBP: number;
  diastolicBP: number;
  cholesterol: number;
}
