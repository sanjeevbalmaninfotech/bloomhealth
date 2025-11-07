export const services = [
  {
  slug: 'diagnostics',
  title: 'Diagnostics, Imaging and Pharmacy Services',
  servicesHeader: 'Comprehensive on-site support for fast, seamless care', // Comprehensive on-site support for fast, seamless care
  shortDescription: '',
  description:
    'Bloom Health offers rapid access to CT, X-ray, ultrasound, and point-of-care testing, alongside a fully equipped in-house pharmacy. Fast results and seamless coordination ensure efficient, high-quality care every step of the way.',
  longDescription: (
    <span>
      At Bloom Health, our diagnostics are designed to provide timely, accurate results and convenient access to treatment, all within the same facility. We aim to make every stage of your care pathway efficient and personalised, from initial consultation to diagnosis, prescription and follow-up.
      <br />
      <br />
      Our pharmacy team is dedicated to delivering high-quality service by dispensing medications and providing expert clinical guidance, as well as practical information on a wide range of health issues.
      <br />
      <br />
      Our clinical and technical teams collaborate with consultants to ensure investigations and results are timely, with clear communication and continuity of care throughout.
    </span>
  ),
 diseases: [
  <div className="flex flex-col gap-4">
    <h3 className="text-2xl font-semibold text-foreground">What We Offer</h3>
  </div>,
  <div className="flex flex-col gap-2">
    <strong>Advanced imaging and diagnostics</strong>
    <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
      <li>Access to CT scanning, X-ray, ultrasound, ECG, and point-of-care laboratory testing for rapid, precise results.</li>
    </ul>
  </div>,
  <div className="flex flex-col gap-2">
    <strong>Comprehensive diagnostic reporting</strong>
    <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
      <li>Clear, comprehensive reports provided directly to your clinician, ensuring continuity of care.</li>
    </ul>
  </div>,
  <div className="flex flex-col gap-2">
    <strong>On-site pharmacy</strong>
    <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
      <li>Dispensing of prescribed medications, and comprehensive support for outpatient prescriptions, making it easy for you to collect your medication and receive any necessary advice or guidance from our team.</li>
    </ul>
  </div>,
],
  footer:
    '',
  subServices: null,
},
 {
  slug: 'urgent-care',
  title: '24-Hour walk-in centre',
  servicesHeader: 'Rapid access to expert medical care, 24 hours a day, 7 days a week.',
  shortDescription: '',
  description:
    'Experience fast, expert care for adults and children, no appointment needed. Our dedicated team delivers immediate assessments, on-site diagnostics including CT, X-ray, ultrasound, and point-of-care tests, with access to an in-house pharmacy. For serious or life-threatening emergencies, please call 999 or proceed to your nearest emergency department.',
  longDescription: (
    <span>
      At Bloom Health, we provide fast, high-quality medical care for adults and children, with no appointment needed and minimal waiting times. Our service is ideal for medical needs that can't wait for a GP appointment but do not require attendance at a hospital emergency department.
      <br />
      <br />
      Our urgent care centre is designed to manage a wide range of minor to moderate illnesses and injuries, offering immediate access to assessment, diagnosis, and treatment, all under one roof.
    </span>
  ),
  diseases: [
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-foreground">What We Offer</h3>
    </div>,
    <div className="flex flex-col gap-2">
      <strong>Comprehensive on-site diagnostics</strong>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        <li>Access to CT scans, X-rays, ultrasound, ECG, and point-of-care testing for rapid results and accurate diagnoses.</li>
      </ul>
    </div>,
    <div className="flex flex-col gap-2">
      <strong>Expert clinical team</strong>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        <li>Our experienced clinicians deliver safe, efficient, and compassionate care around the clock.</li>
      </ul>
    </div>,
    <div className="flex flex-col gap-2">
      <strong>On-site pharmacy</strong>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        <li>Immediate access to medications and outpatient prescriptions.</li>
      </ul>
    </div>,
    <div className="flex flex-col gap-2">
      <strong>Outpatient referrals and follow-up</strong>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        <li>Seamless access to specialist consultations and follow-up care where needed.</li>
      </ul>
    </div>,
    <div className="flex flex-col gap-4 mt-4">
      <h3 className="text-2xl font-semibold text-foreground">Conditions We Commonly Treat</h3>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        <li>Minor injuries (sprains, small cuts, minor burns)</li>
        <li>Fever, infections, or unexplained illness</li>
        <li>Respiratory or urinary tract infections</li>
        <li>Abdominal pain or digestive issues (non-severe)</li>
        <li>Allergic reactions (non-life-threatening)</li>
        <li>Minor skin conditions and rashes</li>
        <li>Headaches, migraines, and minor eye or ear complaints</li>
      </ul>
      <p style={{ marginTop: '8px', fontStyle: 'italic' }}>(Please note: this list is not exhaustive. If you're unsure whether your condition is suitable for urgent care, our team is here to advise you.)</p>
    </div>,
    <div className="flex flex-col gap-4 mt-4">
      <h3 className="text-2xl font-semibold text-foreground">Important Notice</h3>
      <div className="p-6 bg-blue rounded-lg">
        <div className="flex flex-col gap-4">
          <p>
            Our urgent care centre is <strong>not an alternative to an emergency department nor does it cover these services.</strong>
          </p>
          
          <p>
            If you are experiencing a <strong>life-threatening illness or injury</strong>, such as severe chest pain, breathing difficulty, heavy bleeding, loss of consciousness, or symptoms of stroke, please call 999 or go directly to your nearest <strong>NHS Emergency Department immediately</strong>.
          </p>
          
          <p>
            For urgent advice, you can also contact <strong>NHS 111</strong>.
          </p>
        </div>
      </div>
    </div>
  ],
  footer: (
  <div className="flex flex-col gap-3">
    <h3 className="text-2xl font-semibold text-foreground">
      Your Health, Handled with Care
    </h3>
    <p>
      At Bloom Health, we are committed to delivering seamless, efficient, and compassionate care, 24 hours a day. Simply walk in, and our dedicated clinical team will ensure you're seen promptly and treated with professionalism and respect.
    </p>
  </div>
),
},
 {
  slug: 'outpatient-services',
  title: 'Outpatient and Planned Care at Bloom Health, Milton Keynes',

  servicesHeader: 'Comprehensive consultant-led care for adults and children',
  description:
    'Bloom Health offers consultant-led and multidisciplinary clinics for adults and children, supported by a diverse range of healthcare services. Our skilled and dedicated team, including consultants, nurses, pharmacists, physiotherapists, and allied health professionals, provides safe, high-quality, and personalised care tailored to each patient\'s needs. With on-site diagnostics, imaging, pharmacy, and therapy services, we ensure a coordinated and continuous care experience from consultation through to treatment and follow-up, all within a professional and welcoming environment.',
  longDescription: (
    <span>
      At Bloom Health, we provide a wide range of outpatient and planned care services for both adults and paediatric patients. Our consultant-led, specialist, and multidisciplinary clinics deliver personalised, high-quality care across medical and surgical specialties, all within a welcoming, discreet, and well-coordinated environment.
      <br />
      <br />
      We support patients at every stage of their care journey, with access to on-site diagnostics, imaging, and pharmacy services, making it easy to complete assessments, investigations, and treatment plans, all in one place. Whether you are seeking expert advice for a new health concern, or ongoing management for a long-term condition, our team is dedicated to ensuring a smooth, responsive experience with continuity of care throughout.
    </span>
  ),
  diseases: [
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-foreground">What We Offer</h3>
    </div>,
    <div className="flex flex-col gap-2">
      <strong>Consultant-led outpatient clinics</strong>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        <li>A wide range of medical and surgical specialties, delivered by experienced consultants.</li>
      </ul>
    </div>,
    <div className="flex flex-col gap-2">
      <strong>Services for adults and children</strong>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        <li>Comprehensive care, including assessment and management of complex and long-term conditions.</li>
      </ul>
    </div>,
    <div className="flex flex-col gap-2">
      <strong>On-site diagnostics and pharmacy</strong>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        <li>Convenient access to imaging, laboratory testing, and pharmacy services to support your treatment plan.</li>
      </ul>
    </div>,
    <div className="flex flex-col gap-2">
      <strong>Flexible referral options</strong>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        <li>We welcome referrals from GPs, other specialists, and self-referrals where appropriate.</li>
      </ul>
    </div>,
  ],
  footer:
    'For more information about each of our specialty services, please explore the relevant pages below.',
  subServices: [],
}
];


export const getService = (slug) => services.find((service) => service.slug === slug);
export const getSubService = (serviceSlug, subServiceSlug) => {
  const service = getService(serviceSlug);
  return service?.subServices.find((sub) => sub.slug === subServiceSlug);
};
