import React, { useEffect } from 'react';
import Department from '../components/layout/Department';

const Gynecology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Department
      departmentName='Women’s Health & Gynaecology at Bloom Health'
      overviewText='Personalised, expert care for women’s health needs'
      overviewDescription="Our women’s health specialists offer discreet, expert consultations and personalised care for a wide range of gynaecological concerns, including menstrual disorders, fibroids, ovarian cysts, menopause management, pelvic pain, and reproductive health. We provide sensitive, confidential, and individualised treatment, ensuring that each woman feels respected, understood, and supported at every stage of life."
      services={[
        'Specialist gynaecology consultations',
        'Diagnostic services including pelvic ultrasound, hormonal testing, and cervical screening',
        'Personalised treatment plans including medical therapies, minor procedures, or surgical referrals',
        'Access to in-house investigations, outpatient treatments, prescriptions, and coordination with fertility, urology, or surgical services as needed',
      ]}
      moreDetails={
        <span>For more detailed information about our women’s health and gynaecology services, please visit our <strong>Women’s Health Information Page</strong>.</span>
      }
      diseases={[
        'Specialist gynaecology consultations',
        'Diagnostic services including pelvic ultrasound, hormonal testing, and cervical screening',
        'Personalised treatment plans including medical therapies, minor procedures, or surgical referrals',
        "Access to in-house investigations, outpatient treatments, prescriptions, and coordination with fertility, urology, or surgical services as needed"
      ]}
      specialtyUnits={[
        'Epilepsy Monitoring Unit',
        'Stroke Unit',
        'Movement Disorders Clinic',
        'Headache Center',
      ]}
      centersOfExcellence='Comprehensive Stroke Center'
      doctors={[
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          specialty: 'Neurology',
          image: 'https://randomuser.me/api/portraits/women/32.jpg',
        },
        {
          id: 2,
          name: 'Dr. Robert Chen',
          specialty: 'Neurophysiology',
          image: 'https://randomuser.me/api/portraits/men/44.jpg',
        },
        {
          id: 3,
          name: 'Dr. Emily Wilson',
          specialty: 'Stroke Neurology',
          image: 'https://randomuser.me/api/portraits/women/55.jpg',
        },
      ]}
      faqs={[
        {
          question: 'What neurological conditions do you treat?',
          answer:
            "We treat a wide range of neurological conditions including stroke, epilepsy, multiple sclerosis, Parkinson's disease, migraine, neuropathy, and other disorders of the nervous system.",
        },
        // Add other FAQs specific to neurology
      ]}
    />
  );
};

export default Gynecology;
