import React, { useEffect } from 'react';
import Department from '../components/layout/Department';

const Gastroenterology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Department
      departmentName='Gastroenterology at Bloom Health'
      overviewText='Expert care for digestive health issues.'
      overviewDescription='At Bloom Health, our Gastroenterology service provides expert assessment, diagnosis and treatment for conditions affecting the stomach, intestines, liver, pancreas and digestive system. We offer advanced endoscopic procedures alongside personalised, compassionate care, helping you find answers and regain comfort.

      Whether you are experiencing persistent heartburn, abdominal pain, bloating, altered bowel habits  or liver concerns, our experienced specialists are here to support you every step of the way.'
      services={[
        'Gastroenterology Consultation',
        'EEG Testing',
        'EMG/Nerve Conduction Studies',
        'Botulinum Toxin Therapy',
      ]}
      diseases={[
        'Comprehensive consultations with expert gastroenterologists.',
        'Advanced diagnostic testing, including blood tests, imaging and specialist scans.',
        'Endoscopic procedures, such as gastroscopy and colonoscopy, performed with skill and care.',
        'Personalised treatment plans tailored to your specific needs and health goals.',
        'Clear, compassionate guidance to help you understand your condition and manage your digestive health with confidence.',
      ]}
      moreDetails={
        <span>For more detailed information about our gastroenterology services and tests. Please contact us.</span>
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

export default Gastroenterology;
