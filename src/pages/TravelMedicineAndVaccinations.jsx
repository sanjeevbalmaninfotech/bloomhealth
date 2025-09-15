import React, { useEffect } from 'react';
import Department from '../components/layout/Department';

const TravelMedicineAndVaccinations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Department
      departmentName='Travel Medicine & Vaccinations at Bloom Health'
      overviewText='Your partner in safe, healthy travel'
      overviewDescription='At Bloom Health, our Travel Medicine Clinic offers expert pre-travel consultations, vaccinations, and prescriptions to help you travel safely and confidently. Our experienced team tailors advice to your destination and health needs, providing up-to-date guidance on country-specific health risks.

      Whether you need malaria prevention, altitude medications, or routine and travel-specific vaccines, we are here to support your health before, during, and after your journey.'
      services={[
        'Rheumatology Consultation',
        'EEG Testing',
        'EMG/Nerve Conduction Studies',
        'Botulinum Toxin Therapy',
      ]}
      diseases={[
        'Pre-travel consultations and personalised health advice',
        'Comprehensive vaccination services',
        'Travel-related prescriptions and health precautions',
        'Post-travel assessments if health issues arise'
      ]}
      moreDetails={
        <span>
          For more detailed information about our travel medicine services, please visit our <strong>Travel Medicine Information Page</strong>.
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

export default TravelMedicineAndVaccinations;
