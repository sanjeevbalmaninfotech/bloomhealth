export const services = [
  {
    slug: 'urgent-care',
    title: 'Urgent Care',
    servicesHeader: 'Urgent Care At Bloom Health',
    shortDescription: 'Rapid, walk-in urgent care for medical needs that can’t wait.',
    description:
      'Walk-in and same-day appointments for minor injuries, sudden illnesses, and urgent health concerns.',
    longDescription: (
      <span>
        At Bloom Health, we provide fast, expert care for adults and children, 24 hours a day with
        no appointment needed and minimal waiting time.
        <br />
        <br />
        Our urgent care service is designed to manage a wide range of minor to moderate illnesses
        and everyday health concerns, offering immediate access to clinical assessment, diagnosis,
        and treatment. Whether you’re feeling unwell, need prompt medical advice, or require
        treatment for minor conditions, our experienced clinical team is here to help you feel
        better, faster.
      </span>
    ),
    footer:
      'At Bloom Health, we are committed to providing seamless, efficient, and high-quality care, all under one roof. Simply walk in, and we will ensure you are seen promptly and treated with care, expertise, and professionalism.',
    diseases: [
      <>
        <strong>Immediate assessment and treatment</strong>for common illnesses and minor
        conditions
      </>,
      <>
        <strong>Point-of-care testing&nbsp;</strong> for rapid results, so you can get answers
        quickly
      </>,
      <>
        <strong>On-site imaging and investigations</strong>, including X-ray and ultrasound (where
        clinically appropriate)
      </>,
      <>
        <span>
          <strong>In-house pharmacy</strong> providing standard medications and outpatient
          prescriptions, with a code system for items not available locally
        </span>
      </>,
      <>
        <strong>Access to outpatient referrals and follow-up&nbsp;</strong> if specialist care is
        required
      </>,
    ],
    subServices: null,
  },
  {
    slug: 'outpatient-services',
    title: 'Outpatient Services',
    servicesHeader: 'Outpatient Specialist Services at Bloom Health',
    shortDescription: 'Comprehensive consultant-led care for adults and children',
    description:
      'Specialist consultations, follow-up care, chronic disease management, and health screenings.',
    longDescription: (
      <span>
        At Bloom Health, we offer a wide range of outpatient specialist services for both adults and
        paediatric patients. Our consultant-led clinics provide personalised care across medical and
        surgical specialties, all delivered in a welcoming, discreet, and well-coordinated
        environment.
        <br />
        <br />
        We support patients at every stage of their care journey, with access to on-site
        investigations, imaging, and pharmacy services, making it easier to complete assessments and
        treatment plans, all in one place. Whether you're seeking expert advice for a new health
        concern or ongoing support for an existing condition, our team is here to ensure a smooth,
        responsive experience with continuity of care throughout.
      </span>
    ),
    diseases: [
      <>Consultant-led outpatient clinics across a wide range of specialties</>,
      <>Services for adults and children, including complex and long-term conditions</>,
      <>Access to on-site diagnostics, investigations, pharmacy, and treatment planning</>,
      <>Referrals from GPs, other specialists, or direct self-referral where appropriate</>,
    ],
    footer:
      'For more detailed information about each of our specialty services, please explore the relevant pages below.',
    subServices: [], // still keep children if you want detailed specialties
  },
  {
    slug: 'diagnostics',
    title: 'Diagnostics',
    description:
      'On-site laboratory tests, ultrasound, X-ray, CT scans, and rapid-result services.',
    longDescription:
      'Our state-of-the-art diagnostic facilities provide rapid and accurate results. With a comprehensive suite of imaging and laboratory services all under one roof, we can expedite your diagnosis and treatment plan.',
    subServices: [
      {
        slug: 'laboratory-tests',
        title: 'Laboratory Tests',
        description: 'A full range of blood tests, urine analysis, and other lab services.',
      },
      {
        slug: 'ultrasound',
        title: 'Ultrasound',
        description: 'Non-invasive imaging for various medical conditions.',
      },
      {
        slug: 'x-ray',
        title: 'X-ray',
        description: 'Digital X-ray services for bone and soft tissue evaluation.',
      },
      {
        slug: 'ct-scans',
        title: 'CT Scans',
        description: 'Advanced computerized tomography for detailed internal imaging.',
      },
    ],
  },
  {
    slug: 'minor-procedures',
    title: 'Minor Procedures',
    description:
      'Wound care, minor surgical procedures, joint injections, and more.',
    longDescription:
      'Our Minor Procedures service provides convenient, same-day access to treatment for a variety of conditions, including wound management, minor surgical interventions, and therapeutic joint injections — without the need for hospital admission.',
    subServices: [
      {
        slug: 'wound-care',
        title: 'Wound Care',
        description: 'Assessment and treatment for acute and chronic wounds.',
      },
      {
        slug: 'joint-injections',
        title: 'Joint Injections',
        description: 'Steroid and hyaluronic acid injections for pain relief.',
      },
    ],
  },
  {
    slug: 'occupational-health',
    title: 'Occupational Health',
    description:
      'Pre-employment medicals, workplace injury management, and corporate health services.',
    longDescription:
      'Our Occupational Health services support businesses and employees with workplace wellness programs, pre-employment assessments, and tailored injury management plans to help maintain a safe and productive workforce.',
    subServices: [
      {
        slug: 'pre-employment-medicals',
        title: 'Pre-employment Medicals',
        description: 'Comprehensive health checks for new employees.',
      },
      {
        slug: 'workplace-injury-management',
        title: 'Workplace Injury Management',
        description:
          'Specialist support for employees recovering from workplace injuries.',
      },
      {
        slug: 'corporate-wellness-programs',
        title: 'Corporate Wellness Programs',
        description:
          'Tailored health programs to promote workplace wellness and productivity.',
      },
    ],
  },
];


export const getService = (slug) => services.find((service) => service.slug === slug);
export const getSubService = (serviceSlug, subServiceSlug) => {
  const service = getService(serviceSlug);
  return service?.subServices.find((sub) => sub.slug === subServiceSlug);
};
