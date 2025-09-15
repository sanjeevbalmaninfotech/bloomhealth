import React, { useEffect } from 'react';
import Department from '../components/layout/Department';

const RespiratoryMedicine = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Department
      departmentName='Respiratory Medicine at Bloom Health'
      overviewText='Expert care for lung and breathing health'
      overviewDescription='Our respiratory specialists provide comprehensive assessment, diagnosis, and management for conditions such as asthma, chronic cough, COPD, interstitial lung disease, and sleep-related breathing disorders. We deliver personalised care plans focused on improving breathing, reducing symptoms, and enhancing quality of life.'
      services={[
        'Rheumatology Consultation',
        'EEG Testing',
        'EMG/Nerve Conduction Studies',
        'Botulinum Toxin Therapy',
      ]}
      diseases={[
        'Specialist respiratory consultations',
        'Lung function testing, chest imaging, and sleep assessmentsDiagnostic testing, including autoimmune blood panels, inflammatory markers, and imaging',
        'Personalised treatment plans including inhaler therapies, medication management, and lifestyle strategies',
        'Access to in-house investigations, sleep studies, and referrals to pulmonary rehabilitation or thoracic surgery when requiredAccess to in-house investigations and coordinated care with orthopaedics, physiotherapy, or pain services if needed',
      ]}
      moreDetails={
        <span>
          For more detailed information about our respiratory medicine services, please visit our{' '}
          <strong>Respiratory Medicine Information Page</strong>.
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
            "We treat a wide range of neurological conditions including stroke, epilepsy, multiple sclerosis, Parkinson's disease, migraine, neuropathy, and other disorders of the nervous system.",
        },
        // Add other FAQs specific to neurology
      ]}
    />
  );
};

export default RespiratoryMedicine;
