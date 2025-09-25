import React, { useEffect } from 'react';
import Department from '../components/layout/Department';

const Dermatology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Department
      departmentName='Dermatology at Bloom Health'
      overviewText='Specialist skin care for all ages'
      overviewDescription='Our dermatology team offers expert, confidential care for a wide range of skin, hair, and nail concerns — including acne, eczema, psoriasis, skin infections, moles, and skin cancer assessments. We understand that skin conditions can affect not just your health but also your confidence and wellbeing, which is why we provide sensitive, personalised consultations and treatments in a private, supportive setting.'
      services={[
        'Rheumatology Consultation',
        'EEG Testing',
        'EMG/Nerve Conduction Studies',
        'Botulinum Toxin Therapy',
      ]}
      diseases={[
        'Specialist dermatology consultations in a discreet, patient-centred environment',
        'Diagnostic assessments, including dermoscopy, and skin biopsies',
        'Personalised treatment plans, including topical or systemic therapies, procedural treatments, and skincare advice tailored to your needs',
        'Access to in-house investigations, minor skin procedures, prescriptions, and fast-track referrals to surgical or oncology services if required',
      ]}
      moreDetails={
        <span>For more detailed information about our dermatology services. Please contact us.</span>
      }
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

export default Dermatology;
