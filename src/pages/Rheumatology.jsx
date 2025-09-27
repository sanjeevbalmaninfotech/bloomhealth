import { useEffect } from "react";
import Department from "../components/layout/Department";

const Rheumatology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Department
      departmentName="Rheumatology at Bloom Health"
      overviewText="Expert care for joint, bone and autoimmune conditions"
      overviewDescription="Our rheumatology specialists provide expert compassionate care for individuals living with joint, muscle, bone and autoimmune conditions — including arthritis, connective tissue diseases and inflammatory disorders. We understand that these conditions can affect both your physical comfort and daily life and we are committed to offering sensitive, personalised care in a private and supportive setting."
      services={[
        'Rheumatology Consultation',
        'EEG Testing',
        'EMG/Nerve Conduction Studies',
        'Botulinum Toxin Therapy'
      ]}
      diseases={[
        'Specialist rheumatology consultations delivered with care and discretion.',
        'Diagnostic testing, including autoimmune blood panels, inflammatory markers and imaging.',
        'Personalised treatment plans, including medication management, physical therapy recommendations, lifestyle adjustments and referrals when appropriate.',
        'Access to in-house investigations and coordinated care with orthopaedics, physiotherapy  or pain services if needed.'
      ]}
      moreDetails={
        <span>For more detailed information about our rheumatology services. Please contact us.</span>
      }
      specialtyUnits={[
        'Epilepsy Monitoring Unit',
        'Stroke Unit',
        'Movement Disorders Clinic',
        'Headache Center'
      ]}
      centersOfExcellence="Comprehensive Stroke Center"
      doctors={[
        { id: 1, name: "Dr. Sarah Johnson", specialty: "Neurology", image: "https://randomuser.me/api/portraits/women/32.jpg" },
        { id: 2, name: "Dr. Robert Chen", specialty: "Neurophysiology", image: "https://randomuser.me/api/portraits/men/44.jpg" },
        { id: 3, name: "Dr. Emily Wilson", specialty: "Stroke Neurology", image: "https://randomuser.me/api/portraits/women/55.jpg" }
      ]}
      faqs={[
        {
          question: 'What neurological conditions do you treat?',
          answer: 'We treat a wide range of neurological conditions including stroke, epilepsy, multiple sclerosis, Parkinson\'s disease, migraine, neuropathy and other disorders of the nervous system.'
        },
        // Add other FAQs specific to neurology
      ]}
    />
  );
};

export default Rheumatology;