import { useEffect } from "react";
import Department from "../components/layout/Department";

const Paediatrics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Department
      departmentName="Paediatrics Services at Bloom Health"
      overviewText="Specialist medical care for infants, children and teens in a friendly, family-centred environment"
      overviewDescription="At Bloom Health, our dedicated Paediatrics Service ensures young patients receive expert treatment delivered with gentle, reassuring care. We understand that children’s health concerns can be stressful for families and our experienced paediatric team is here to provide attentive, personalised support through every stage of childhood and adolescence. Whether your child needs urgent care for a sudden illness, ongoing management for a chronic condition  or routine health checks, we offer comprehensive, family-focused services designed to keep your child healthy and thriving. Our team works closely with parents and caregivers, ensuring you feel informed, supported and confident in every aspect of your child’s care."
      diseases={[
        "Paediatric consultations for infants, children and adolescents.",
        "Same-day and scheduled appointments for urgent and routine concerns.",
        "Access to in-house investigations, prescriptions and specialist referrals.",
      ]}
      moreDetails={
        <span>
          If you would like further information about our Paediatrics Services or need assistance deciding whether your child requires an appointment, please contact us — our team is happy to assist you.
        </span>
      }
    />
  );
};

export default Paediatrics;
