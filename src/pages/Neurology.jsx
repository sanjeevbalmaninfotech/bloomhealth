import { useEffect } from "react";
import Department from "../components/layout/Department";

const Neurology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Department
      departmentName="Neurology at Bloom Health"
      overviewText=""
      overviewDescription="Our neurology team provides compassionate, expert care for people experiencing a wide range of neurological concerns, including epilepsy, headaches, migraines, movement disorders, nerve pain, and memory difficulties. We understand that neurological symptoms can feel overwhelming or uncertain, and we are here to guide you with clear explanations, thoughtful support, and highly personalised treatment plans."
      services={[
        'Neurological Consultation',
        'EEG Testing',
        'EMG/Nerve Conduction Studies',
        'Botulinum Toxin Therapy'
      ]}
      diseases={[
        'Specialist neurology consultations tailored to your needs',
        'Diagnostic testing, including EEG (in-clinic or at home if required), MRI, CT scans, and nerve conduction studies',
        'Personalised treatment plans, including medication management, symptom control strategies, and referrals to the pain clinic when appropriate',
        'Access to in-house investigations, outpatient monitoring, and coordination with neurosurgery, neuropsychology, or allied health services as needed'
      ]}
      moreDetails={
        <span>For more detailed information about our neurology and epilepsy services, please visit our <strong>Neurology & Epilepsy Information Page</strong>.</span>
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
          answer: 'We treat a wide range of neurological conditions including stroke, epilepsy, multiple sclerosis, Parkinson\'s disease, migraine, neuropathy, and other disorders of the nervous system.'
        },
        // Add other FAQs specific to neurology
      ]}
    />
  );
};

export default Neurology;