import React, { useEffect } from 'react';
import Department from '../components/layout/Department';

const GeneralMedicine = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Department
      departmentName='GP Services at Bloom Health'
      overviewText='Comprehensive primary care for you and your family'
      overviewDescription={
        <span>
          Our General Practice (GP) services, is the first point of contact for patients seeking
          medical advice, diagnosis and treatment for a wide range of health concerns{' '}
          <strong>Comprehensive, compassionate primary care for you and your family</strong>
          <br />
          <br />
          At Bloom Health, our experienced GPs provide expert medical assessment, diagnosis and
          treatment for a wide range of general health concerns. We offer same-day appointments,
          routine check-ups and chronic condition management for both adults and children, with the
          added convenience of video and telephone consultations.
          <br />
          <br />
          If needed, we provide referrals for in-house investigations, specialist consultations and
          prescription services, all coordinated to ensure seamless, continuous care.
        </span>
      }
      services={[
        'Rheumatology Consultation.',
        'EEG Testing.',
        'EMG/Nerve Conduction Studies.',
        'Botulinum Toxin Therapy.',
      ]}
      diseases={[
        'GP consultations for adults and children.',
        'Same-day, video and telephone appointments.',
        'Preventive health checks and chronic condition management.',
        'Referrals for investigations, prescriptions and specialist care.',
      ]}
      moreDetails={
        <span>
          For more detailed information about our general medicine and GP services. Please contact us.
        </span>
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
            "We treat a wide range of neurological conditions including stroke, epilepsy, multiple sclerosis, Parkinson's disease, migraine, neuropathy and other disorders of the nervous system.",
        },
        // Add other FAQs specific to neurology
      ]}
    />
  );
};

export default GeneralMedicine;
