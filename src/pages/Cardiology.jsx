import { useEffect } from "react";
import Department from "../components/layout/Department";

const Cardiology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Department
      departmentName="Cardiology Services"
      overviewText=""
      overviewDescription="At Bloom Health Hospitals, we provide comprehensive cardiology services designed to diagnose, manage and treat a wide range of heart conditions. Our team of expert cardiology specialists is dedicated to offering personalised care tailored to your individual case and needs, ensuring you receive the highest quality of treatment and support."
      services={[
        {
          title: "Web Development",
          description: "We build responsive, modern websites using the latest technologies."
        },
        {
          title: "Mobile App Development",
          description: "Cross-platform mobile applications for iOS and Android."
        },
        {
          title: "UI/UX Design",
          description: "Beautiful and intuitive user interfaces designed for optimal user experience."
        }
      ]}
      diseases={[
        'Specialist consultations to assess symptoms, medical history and cardiovascular risk.',
        'Comprehensive diagnostic testing, including ECGs and Echocardiogram.',
        'Personalised treatment plans, including medication management, lifestyle advice and referrals if further care is needed.',
        'Community-based tests and assessments, allowing for some investigations to be completed at home for convenience.',
        'Coordination with your GP or other specialists to ensure smooth, collaborative care.',
        'Follow-up appointments to monitor progress, adjust treatments and support long-term heart health.'
      ]}
      moreDetails={
        <span>For more detailed information about our cardiology services and tests. Please contact us.</span>
      }
      specialtyUnits={[
        'Hypertension Unit',
        'Arrhythmia & Syncope Unit',
        'Structural Heart Disease Unit',
        'Coronary Macro & Micro vessel Disease Unit'
      ]}
      centersOfExcellence="Cardiometabolic and Weight Management"
      doctors={[
        { id: 1, name: "Dr. John Doe", specialty: "Cardiology", image: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 2, name: "Dr. Jane Smith", specialty: "Cardiac Surgery", image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 3, name: "Dr. Michael Brown", specialty: "Interventional Cardiology", image: "https://randomuser.me/api/portraits/men/55.jpg" }
      ]}
      faqs={[
        {
          question: 'What should I bring to my first cardiology appointment?',
          answer: (
            <div className="py-2 text-gray-600">
              For your first cardiology appointment, please bring:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Qatar ID / valid passport</li>
                <li>Insurance card</li>
                <li>Any previous ECG or cardiac test results</li>
                <li>List of current medications</li>
              </ul>
            </div>
          )
        },
        {
          question: 'What should I bring to my first cardiology appointment?',
          answer: (
            <div className="py-2 text-gray-600">
              For your first cardiology appointment, please bring:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Qatar ID / valid passport</li>
                <li>Insurance card</li>
                <li>Any previous ECG or cardiac test results</li>
                <li>List of current medications</li>
              </ul>
            </div>
          )
        }
        // Add other FAQs specific to cardiology
      ]}
    />
  );
};

export default Cardiology;