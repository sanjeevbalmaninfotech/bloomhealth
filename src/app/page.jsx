import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Stethoscope,
  Clock,
  Activity,
  Shield,
  Phone as PhoneIcon,
  Globe,
  MapPin,
  ArrowRight,
  Check,
  Plus,
  Home,
  UserCheck,
  Heart,
  Eye,
} from 'lucide-react';
import { services } from '@/lib/services';
import { useEffect, useState } from 'react';
import ContactUsForm from '../components/forms/contactUs';
import ContactInfoAside from '../components/contact/ContactInfoAside';
import AboutHomeSection from '../components/aboutHome/AboutSection';

const WhyChooseUsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'Appointments at your convenience.',
    'Rapid diagnostics.',
    'Fast access to consultants.',
    'Walk in appointments for GP and Urgent care.',
    'Central Milton Keynes location.',
  ];

  // Auto-scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="about-us"
      className="pt-32 py-12 bg-gradient-to-b bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-5">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-foreground mb-2">
            Why Choose Us
          </h2>
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full uppercase text-sm sm:text-base tracking-wider font-semibold mb-3">
            Your Health Is Our Priority
          </span>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="px-4 sm:px-6 py-8 sm:py-12 bg-white rounded-2xl shadow-lg border border-gray-100 text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
              {slides[currentSlide]}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              className="bg-primary text-white rounded-full p-3 hover:bg-primary/90 transition shadow-lg"
              aria-label="Previous slide"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition ${
                    currentSlide === index ? 'bg-primary w-8' : 'bg-gray-300 w-3'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-primary text-white rounded-full p-3 hover:bg-primary/90 transition shadow-lg"
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ svc }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const isLongDescription = svc.description.length > 150;

  const handleCardClick = () => {
    window.location.href = `/services/${svc.slug}`;
  };

  const handleShowMoreClick = (e) => {
    e.stopPropagation();
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div
      onClick={handleCardClick}
      className='p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-start hover:shadow-xl transition cursor-pointer h-fit'
    >
      <div className='flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mb-3'>
        <Plus className='h-6 w-6 text-primary' />
      </div>
      <h3 className='text-lg font-semibold text-gray-900 mb-1'>{svc.title}</h3>
      <p className='text-sm text-gray-600 mb-2'>
        {showFullDescription ? svc.description : truncateText(svc.description)}
      </p>
      {isLongDescription && (
        <button
          onClick={handleShowMoreClick}
          className='text-xs text-primary hover:underline font-medium'
        >
          {showFullDescription ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

const heroData = {
  headingLine1: '  Care You Can Count On',
  headingLine2: 'Open 24/7',
  subheading: `A new standard in private healthcare, located in the heart of Milton Keynes. Experience fast, round-the-clock expert medical treatment delivered with a personal touch. From urgent walk-in care to specialist clinics, Bloom Health Hospital is here to put your health first.`,
};

const featuresData = [
  {
    title: 'Leading Consultants, Advanced Care',
    desc: 'Our team includes leading consultants across Cardiology, Gastroenterology, Paediatrics, Ear Nose and Throat and more, offering specialist care backed by the top-tier technology and proven techniques.',
    icon: UserCheck,
  },
  {
    title: '24/7 Urgent Care - No Appointment Needed',
    desc: (
      <>
        Our Urgent Care Centre offers fast, walk-in treatment for a wide range of unexpected health
        concerns –<strong> No appointment needed.</strong>
      </>
    ),
    icon: Clock,
  },
  {
    title: 'Comprehensive Diagnostics under one roof',
    desc: 'State-of-the-art CT, X-ray, and ultrasound imaging with fast, accurate turnaround of results. On-site point-of-care laboratory services are available for blood tests.',
    icon: Activity,
  },
  {
    title: 'Leading Clinicians & Advanced Care',
    desc: 'Our team includes leading consultants and specialist nurses  across Cardiology, Gastroenterology, Paediatrics, Ear Nose and Throat and more, offering specialist care in an innovative environment.',
    icon: Stethoscope,
  },
  {
    title: 'Hospital at Home',
    desc: 'Receive hospital-level care in the comfort of your own home, with our expert team providing personalised treatment plans and support.',
    icon: Home,
  },
  {
    title: 'Self-funded & Insured Patients Welcome',
    desc: 'Both self-funded and patients using private insurance are catered for at Bloom Health Hospital. Our dedicated patient advisors make access to excellent care simple. We also offer GP consultations by appointment, virtual or face-to-face, making referrals seamless and accessible.',
    icon: Shield,
  },
];

const whyChooseUsItems = [
  'Minimal Wait Times - Consult a doctor without unnecessary delays.',
  'Timely Appointments - Get the medical attention you need, when you need it.',
  'Quick Access to Doctors - Immediate care without long waiting times.',
  'Accessible Location - Conveniently located with easy parking and transport access.',
  'Personalised Care - We focus on your needs, offering tailored health solutions.',
  'Discreet & Confidential - High standards of privacy and patient confidentiality.',
];

const formFields = [
  { label: 'Name', type: 'text', placeholder: 'Your Name', name: 'name' },
  { label: 'Email', type: 'email', placeholder: 'your@email.com', name: 'email' },
  { label: 'Phone Number', type: 'tel', placeholder: '+44 1234 567890', name: 'phone' },
];

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.querySelector(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  return (
    <>
      <motion.section
        id='home'
        className='hide-card relative h-[80vh] bg-cover bg-center scroll-mt-[100px]'
        style={{ backgroundImage: 'url(/bloomHome.png)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className='absolute inset-0' />
        <motion.div
          className='container mx-auto h-full flex items-center px-4'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className='max-w-lg w-full p-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 flex flex-col items-center text-center'>
            <h1 className='text-2xl sm:text-3xl font-headline font-extrabold text-gray-900 leading-tight drop-shadow mb-1'>
              {heroData.headingLine1}
            </h1>
            <h2 className='text-lg sm:text-xl font-headline font-bold text-primary mt-1 mb-2'>
              {heroData.headingLine2}
            </h2>
            <p className='mt-1 text-base sm:text-lg text-gray-700 leading-relaxed mb-4'>
              {heroData.subheading}
            </p>
            <Button
              asChild
              size='lg'
              className='mt-2 bg-gradient-to-r from-primary to-blue-500 hover:from-blue-600 hover:to-primary text-white rounded-full px-8 py-3 shadow-xl transition-all duration-200'
            >
              <a href='#services'>EXPLORE SERVICES</a>
            </Button>
          </div>
        </motion.div>
      </motion.section>

      <div>
        <div className='hide-above-1280 mt-5'>
          <img
            src='/herobg2.png'
            alt='Bloom Health strengths wheel'
            className='rounded-3xl'
            width={1200}
            height={800}
          />
        </div>
        <div className='hide-above-1280 mt-6 rounded-3xl w-full p-6 bg-white/90 backdrop-blur-lg shadow-2xl border border-gray-200 flex flex-col items-center text-center'>
          <h1 className='text-2xl sm:text-3xl font-headline font-extrabold text-gray-900 leading-tight drop-shadow mb-1'>
            {heroData.headingLine1}
          </h1>
          <h2 className='text-lg sm:text-xl font-headline font-bold text-primary mt-1 mb-2'>
            {heroData.headingLine2}
          </h2>
          <p className='mt-1 text-base sm:text-lg text-gray-700 leading-relaxed mb-4'>
            {heroData.subheading}
          </p>
          <Button
            asChild
            size='lg'
            className='mt-2 bg-gradient-to-r from-primary to-blue-500 hover:from-blue-600 hover:to-primary text-white rounded-full px-8 py-3 shadow-xl transition-all duration-200'
          >
            <a href='#services'>EXPLORE SERVICES</a>
          </Button>
        </div>
      </div>

      <WhyChooseUsSection />

      <section id='services' className='pt-32 py-8 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-10'>
            <h2 className='text-3xl sm:text-4xl font-headline font-extrabold text-foreground mb-2'>
              Our Services
            </h2>
            <span className='inline-block bg-primary/10 text-primary px-4 py-1 rounded-full uppercase text-sm sm:text-base tracking-wider font-semibold mb-3'>
              Comprehensive Medical Services
            </span>
            <p className='max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground'>
              Explore our wide range of specialist and urgent care services, designed to meet your
              health needs with expertise and compassion.
            </p>
          </div>
         <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-start'>
  {services.map((svc) => (
    <ServiceCard key={svc.slug} svc={svc} />
  ))}
</div>
        </div>
      </section>

      <section className='pt-32 py-20 bg-gray-50'>
        <div className='container mx-auto px-4 grid gap-12 md:grid-cols-2 items-center'>
          <div>
            <span className='bg-primary/10 text-primary px-3 py-1 rounded-full uppercase text-xs font-semibold'>
              Why Choose Bloom Health?
            </span>
            <h2 className='mt-4 text-3xl sm:text-4xl font-headline font-bold text-foreground'>
              Care You Can Count On
            </h2>
            <p className='mt-4 text-lg text-muted-foreground'>
              At Bloom Health, we believe every patient deserves prompt, high-quality medical care
              delivered with compassion and expertise. Our team combines urgent care and specialist
              outpatient services, ensuring your health is in safe, capable hands.
            </p>
            <ul className='mt-6 space-y-3'>
              {whyChooseUsItems.map((item) => (
                <li className='flex items-start' key={item}>
                  <span className='h-2 w-2 bg-primary rounded-full mr-3 mt-2'></span>
                  <span className='text-gray-800'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img
              src='/vision.jpg'
              alt='Comfortable and modern facility'
              width={600}
              height={450}
              className='rounded-xl shadow-xl object-cover w-full h-auto'
              loading='lazy'
            />
          </div>
        </div>
      </section>

      <section id='contact' className='pt-32 py-12 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-headline font-bold text-foreground'>
             Contact Us
            </h2>
          </div>
          <div className='grid gap-12 md:grid-cols-2'>
          <ContactUsForm/>
           <ContactInfoAside/>
          </div>
        </div>
      </section>

      <section id='about' className='pt-12 py-8 bg-gradient-to-b from-white to-gray-50'>
    <AboutHomeSection/>
      </section>
    </>
  );
}