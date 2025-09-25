import React, { useEffect } from 'react';
import Department from '../components/layout/Department';

const UrgentCare = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Department
      departmentName='Urgent Care at Bloom Health'
      overviewText='Rapid, walk-in urgent care for medical needs that can’t wait.'
      overviewDescription={
        <>
          At Bloom Health, we provide fast, expert care for adults and children, 24 hours a day, with no appointment needed and minimal waiting time.<br /><br />
          Our urgent care service is designed to manage a wide range of minor to moderate illnesses and everyday health concerns, offering immediate access to clinical assessment, diagnosis, and treatment. Whether you’re feeling unwell, need prompt medical advice, or require treatment for minor conditions, our experienced clinical team is here to help you feel better, faster.
        </>
      }
      services={[
        'Rheumatology Consultation',
        'EEG Testing',
        'EMG/Nerve Conduction Studies',
        'Botulinum Toxin Therapy',
      ]}
      diseases={[
        <>
          <strong>Immediate assessment and treatment</strong>{' '}  for common illnesses and minor conditions
        </>,
        <>
          <strong>Point-of-care testing&nbsp;</strong>{' '} for rapid results, so you can get answers quickly
        </>,
        <>
          <strong>On-site imaging and investigations</strong>{' '} including X-ray and ultrasound (where clinically appropriate)
        </>,
        <>
          <span>
            <strong>In-house pharmacy</strong>{' '}providing standard medications and outpatient prescriptions, with a code system for items not available locally
          </span>
        </>,
        <>
          <strong>Access to outpatient referrals and follow-up&nbsp;</strong> if specialist care is required
        </>,
      ]}
      moreDetails={
        <div>
          At Bloom Health, we are committed to providing seamless, efficient, and high-quality care,
          all under one roof. Simply walk in, and we will ensure you are seen promptly and treated
          with care, expertise, and professionalism.
          <br />
          <br />
          For more detailed information about our Urgent Care Centre services and tests. Please contact us.
        </div>
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

export default UrgentCare;
