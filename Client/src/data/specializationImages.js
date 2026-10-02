// Curated realistic, high-quality medical visuals representing each clinical department
// Designed for clear visual representation of each medical discipline.

import cardiologyLocal from "../assets/cardiologist.png";
import dermatologyLocal from "../assets/dermatology.avif";
import endocrinologyLocal from "../assets/endocrinologist.avif";
import gastroLocal from "../assets/Gastroenterologist.avif";
import gynecologyLocal from "../assets/Gynecologist.webp";
import neurologyLocal from "../assets/Neurologist.jpg";
import oncologyLocal from "../assets/Oncologist.jpg";
import ophthalmologyLocal from "../assets/Ophthalmologist.jpg";
import orthopedicLocal from "../assets/orthopedic.jpg";
import entLocal from "../assets/ent.jpg";
import pediatricsLocal from "../assets/Pediatrician.avif";
import psychiatryLocal from "../assets/Psychiatrist.avif";
import pulmonologyLocal from "../assets/Pulmonologist.jpg";
import urologyLocal from "../assets/Urologist.jpg";
import anesthesiaLocal from "../assets/Anesthesiologist.jpg";
import cardiothoracicLocal from "../assets/cardiothoracic.jpg";
import generalLocal from "../assets/general.jpg";
import plasticLocal from "../assets/plastic.jpg";
import pathologyLocal from "../assets/Pathologist.jpg";
import radiologyLocal from "../assets/Radiologist.jpg";
import allergyLocal from "../assets/Allergist.jpg";
import familyLocal from "../assets/family.jpg";
import internalLocal from "../assets/Internist.webp";
import allergistLocal from "../assets/allergy.webp";

export const specializationImages = {
  // Cardiology - Heart & ECG
  Cardiologist: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=600&h=400&q=80",
  "Cardiothoracic Surgeon": "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&h=400&q=80",

  // Dermatology - Skin Diagnostics & Care
  Dermatologist: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&h=400&q=80",

  // Endocrinology - Thyroid & Hormone Care
  Endocrinologist: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&h=400&q=80",

  // Gastroenterology - Digestive System & Endoscopy
  Gastroenterologist: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&h=400&q=80",

  // Gynecology / Obstetrics - Women's & Maternal Health
  "Gynecologist / Obstetrician": "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&h=400&q=80",
  "Gynecologist/Obstetrician (OB/GYN)": "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&h=400&q=80",
  Gynecologist: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&h=400&q=80",

  // Neurology - Brain & Neural Health
  Neurologist: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&h=400&q=80",

  // Oncology - Cancer & Cellular Diagnostics
  Oncologist: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&h=400&q=80",

  // Ophthalmology - Eye & Vision Care
  Ophthalmologist: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&h=400&q=80",

  // Orthopedics - Spine, Bone & Joint Care
  "Orthopedic Surgeon": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&h=400&q=80",
  Orthopedics: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&h=400&q=80",

  // ENT - Ear, Nose, Throat
  "ENT Specialist": "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=600&h=400&q=80",
  "Otolaryngologist (ENT)": "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=600&h=400&q=80",
  Otolaryngologist: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=600&h=400&q=80",

  // Pediatrics - Child & Infant Healthcare
  Pediatrician: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&h=400&q=80",
  Pediatrics: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&h=400&q=80",

  // Psychiatry - Mental & Emotional Health
  Psychiatrist: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=400&q=80",
  Psychiatry: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=400&q=80",

  // Pulmonology - Lungs & Respiratory
  Pulmonologist: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&h=400&q=80",
  Pulmonology: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&h=400&q=80",

  // Urology - Kidney & Urinary Tract
  Urologist: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&h=400&q=80",
  Urology: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&h=400&q=80",

  // Anesthesiology - Surgical Anesthesia & Monitoring
  Anesthesiologist: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&h=400&q=80",

  // Surgery - General & Plastic
  "General Surgeon": "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&h=400&q=80",
  "Plastic Surgeon": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&h=400&q=80",

  // Pathology - Laboratory Diagnostics
  Pathologist: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&h=400&q=80",

  // Radiology - Imaging & Scans (MRI / CT)
  Radiologist: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&h=400&q=80",

  // Allergy & Immunology
  "Allergist / Immunologist": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&h=400&q=80",
  "Allergist/Immunologist": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&h=400&q=80",
  Allergist: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&h=400&q=80",

  // Family Medicine & Internal Care
  "Family Physician": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400&q=80",
  Internist: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&h=400&q=80",
};

// Fallback local illustrations
export const localSpecializationAssets = {
  Cardiologist: cardiologyLocal,
  Dermatologist: dermatologyLocal,
  Endocrinologist: endocrinologyLocal,
  Gastroenterologist: gastroLocal,
  "Gynecologist / Obstetrician": gynecologyLocal,
  Neurologist: neurologyLocal,
  Oncologist: oncologyLocal,
  Ophthalmologist: ophthalmologyLocal,
  "Orthopedic Surgeon": orthopedicLocal,
  "ENT Specialist": entLocal,
  Pediatrician: pediatricsLocal,
  Psychiatrist: psychiatryLocal,
  Pulmonologist: pulmonologyLocal,
  Urologist: urologyLocal,
  Anesthesiologist: anesthesiaLocal,
  "Cardiothoracic Surgeon": cardiothoracicLocal,
  "General Surgeon": generalLocal,
  "Plastic Surgeon": plasticLocal,
  Pathologist: pathologyLocal,
  Radiologist: radiologyLocal,
  "Allergist / Immunologist": allergyLocal,
  "Family Physician": familyLocal,
  Internist: internalLocal,
  Allergist: allergistLocal,
};

/**
 * Resolves a specialization image URL with intelligent matching
 */
export function getSpecializationImage(name = "") {
  if (!name) return specializationImages.Cardiologist;

  if (specializationImages[name]) {
    return specializationImages[name];
  }

  // Normalized search
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");
  for (const [key, url] of Object.entries(specializationImages)) {
    const cleanKey = key.toLowerCase().replace(/[^a-z]/g, "");
    if (cleanKey === cleanName || cleanName.includes(cleanKey) || cleanKey.includes(cleanName)) {
      return url;
    }
  }

  return specializationImages.Cardiologist;
}
