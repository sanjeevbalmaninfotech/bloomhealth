export const featureOptions = [
  // { name: 'Find a Doctor', submenu: [{ name: 'Bloom Hospital Doctors', href: '/hospitalsDoctors' }], enabled: true },
  { name: 'Medical Services', href: '#', enabled: true },
  // { name: 'Centers of Excellence', submenu: [
  //   { name: 'Women Wellbeing', href: '/womenWellBeing' },
  //   { name: 'Cardiometabolic and Weight Management', href: '#' },
  //   { name: 'Pain Relief', href: '#' },
  //   { name: 'Ophthalmology Center', href: '#' }
  // ], enabled: true },
  // { name: 'Specialty Units/Clinics', href: '#', enabled: true },
  // { name: 'Executives Checkups', submenu: [
  //   { name: 'Essential Health Checkups', href: '#' },
  //   { name: 'Gold Health Checkups', href: '#' },
  //   { name: 'Platinum Health Checkups', href: '#' }
  // ], enabled: true },
  // { name: 'Packages', submenu: [
  //   { name: 'Women’s Health Packages', href: '#' },
  //   { name: 'Men’s Health Packages', href: '#' },
  //   { name: 'Endocrinology Packages', href: '#' },
  //   { name: 'Cardiology Packages', href: '#' },
  //   { name: 'Weight Loss Packages', href: '#' },
  //   { name: 'Rheumatology Packages', href: '#' }
  // ], enabled: true },
];


import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

export const medicalServicesMenu = [
  {
    title: 'Internal Medicine',
    items: [
      'Cardiology',
      'Neurology',
      'Rheumatology',
      // 'Endocrinology',
      'Gastroenterology',
      'Paediatrics',
      'Respiratory Medicine',
      // 'Infectious Diseases',
   
      
    ],
  },
  {
    title: 'Preventive Care & Wellness',
    items: [
      'Urgent Care',
      'Travel Medicine & Vaccinations',
      'General Medicine'
    ]
  },
  {
    title: 'Obstetrics & Gynaecology',
    items: [
      // 'Maternity & Fetal Care',
      'Gynaecology',
      // 'Obstetrics',
      // 'IVF / Reproductive Medicine and Surgery',
    ],
  },
  {
    title: 'Paediatrics',
    items: ['General Pediatrics'],
  },
  // {
  //   title: 'Surgery',
  //   items: [
  //     'General Surgery',
  //     'Anesthesia',
  //     'Orthopedics',
  //     'Neurosurgery',
  //     'Otolaryngology (ENT)/Head and Neck Surgery',
  //     'Urology',
  //     'Plastic & Reconstructive',
  //     'Ophthalmology',
  //   ],
  // },
  // {
  //   title: 'Dental',
  //   items: ['Adult Dentistry', 'Pediatric Dentistry', 'Cosmetic Dentistry'],
  // },
  {
    title: 'Dermatology',
    items: ['Dermatology'],
  },
  // {
  //   title: 'Pharmacy',
  //   items: ['Pharmacy Services'],
  // },
];

export const specialtyColumns = {
  column1: [
    "Bloom Voice Clinic (AVC)",
    "Arrhythmia & Syncope Unit",
    "Bariatric Surgery Specialty Clinic",
    "Cataract Surgery Specialty Clinic",
    "Coronary Macro & Micro vessel Disease Specialty Unit",
    "Cough Unit",
  ],
  column2: [
    "Diabetes Specialty Unit",
    "Diabetic Eye Care Specialty Unit",
    "Dry Eye Specialty Clinic",
    "Hypertension Specialty Unit",
    "Headache Specialty Unit",
    "Inflammatory Bowel Disease Specialty Unit",
  ],
  column3: [
    "Inflammatory Joint Unit",
    "Refractive Laser Vision Clinic",
    "Structural Heart Disease Specialty Unit",
    "The Keratoconus Specialty Clinic",
    "Vein Specialty Unit",
    "Weight Management Specialty Unit",
  ],
};

