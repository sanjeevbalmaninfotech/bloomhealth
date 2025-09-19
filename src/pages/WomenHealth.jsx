import { useEffect } from "react";
import Department from "../components/layout/Department";

const WomensHealth = () => {

    console.log(" dev ==== > WomenHealth.jsx file");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
   <Department
  departmentName="Women’s Health & Gynaecology at Bloom Health"
  overviewText="Personalised, expert care for women’s health needs"
  overviewDescription="Our women’s health specialists offer discreet, expert consultations and personalised care for a wide range of gynaecological concerns, including menstrual disorders, fibroids, ovarian cysts, menopause management, pelvic pain, and reproductive health. We provide sensitive, confidential, and individualised treatment, ensuring that each woman feels respected, understood, and supported at every stage of life."
  diseases={[
    "Specialist gynaecology consultations",
    "Diagnostic services including pelvic ultrasound, hormonal testing, and cervical screening",
    "Personalised treatment plans including medical therapies, minor procedures, or surgical referrals",
    "Access to in-house investigations, outpatient treatments, prescriptions, and coordination with fertility, urology, or surgical services as needed",
  ]}
  moreDetails={
    <span>
      For more detailed information about our women’s health and gynaecology services, please visit our{" "}
      <strong>Women’s Health Information Page</strong>.
    </span>
  }
/>

  );
};

export default WomensHealth;
