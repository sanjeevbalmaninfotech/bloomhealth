import React from 'react';
import Department from '../components/layout/Department';

const Urology = () => {
  return (
    <Department
      departmentName='Urology'
      overviewText='Our Urology department provides comprehensive care for disorders of the nervous system. Our team of neurologists and neurosurgeons are experts in diagnosing and treating conditions affecting the brain, spinal cord, and peripheral nerves. We utilize advanced diagnostic tools and treatment modalities to provide personalized care for each patient.'
      services={[
        'Urology Consultation',
        'EEG Testing',
        'EMG/Nerve Conduction Studies',
        'Botulinum Toxin Therapy',
      ]}
      diseases={[
        'Epilepsy',
        'Migraine and Headache Disorders',
        'Multiple Sclerosis',
        "Parkinson's Disease",
        'Stroke',
        'Urology',
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

export default Urology;
