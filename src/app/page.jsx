import { motion } from 'framer-motion';
// Using native img in Vite app
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
} from 'lucide-react';
import { services } from '@/lib/services';
import { useEffect } from 'react';
const heroData = {
  headingLine1: 'Care YOU can Count on',
  headingLine2: 'Open 24/7',
  subheading: `A new standard in private healthcare located in central Milton Keynes. Experience fast, round the clock expert medical treatments with a personal touch, From urgent walk-in care to specialist clinics, Bloom Health Hospital is here to put YOUR health first.`,
};
const featuresData = [
  {
    title: 'Urgent healthcare when you need it most',
    desc: 'Our Urgent Care Centre offers fast, walk-in treatment for a wide range of unexpected health concerns – no appointment needed.',
    icon: Clock,
  },
  {
    title: 'Comprehensive Diagnostics under one roof',
    desc: 'State-of-the-art CT,  X-ray and Ultrasound  imaging, Fast accurate turnaround of results.On-site Point of care laboratory for blood tests.',
    icon: Activity,
  },
  {
    title: 'Leading Clinicians & Advanced Care',
    desc: 'Our team includes leading consultants and specialist nurses  across Cardiology, Gastroenterology, Pediatrics, Ear Nose and Throat and more, offering specialist care in an innovative environment.',
    icon: Stethoscope,
  },
  {
    title: 'Hospital at Home',
    desc: 'Receive hospital-level care in the comfort of your own home, with our expert team providing personalized treatment plans and support.',
    icon: Home,
  },
  {
    title: 'Self-funded & Insured Patients Welcome',
    desc: 'Both self-funded and patients using private insurance are catered for at Bloom Health Hospital. Our dedicated patient advisors make access to excellent care simple. We also offer GP consultations by appointment, virtual or Face to Face, making referrals seamless and accessible.',
    icon: Shield,
  },
];
const whyChooseUsItems = [
  'Minimal Wait Times — See a doctor when you need one.',
  'Expert Clinicians — Care provided by senior doctors, specialist consultants, and experienced specialist nurses',
  'Modern Facilities — State-of-the-art equipment in a welcoming, comfortable environment.',
  'Accessible Location — Conveniently located with easy parking and transport access.',
  'Personalised Care — We focus on your needs, offering tailored health solutions.',
  'Discreet & Confidential — High standards of privacy and patient confidentiality.',
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
      <section id='about-us' className='pt-32 py-16 bg-gradient-to-b from-gray-50 to-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-10'>
            <span className='inline-block bg-primary/10 text-primary px-4 py-1 rounded-full uppercase text-xs tracking-wider font-semibold mb-3'>
              Why Choose Us
            </span>
            <h2 className='text-3xl sm:text-4xl font-headline font-extrabold text-foreground mb-2'>
              Our Priority is YOUR health
            </h2>
            <p className='max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground'>
              At Bloom Health, we are dedicated to delivering fast, expert medical care when you
              need it most. We offer multispecialty services covering diagnostics, chronic disease
              management, mental health, paediatrics, and allied health. Our highly trained
              clinicians deliver patient-centred care across diverse specialties. With
              state-of-the-art imaging, diagnostics, and private consultation suites designed for
              comfort and efficiency. Our innovative approach uses technology and evidence-based
              medicine to deliver faster, safer, and more personalised care. Serving Milton Keynes
              and surrounding areas with accessible, compassionate healthcare for all ages.
            </p>
          </div>
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-5'>
            {featuresData.map(({ title, desc, icon: Icon }) => (
              <div
                className='flex flex-col items-start p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition'
                key={title}
              >
                <div className='flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4'>
                  <Icon className='h-7 w-7 text-primary' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>{title}</h3>
                <p className='text-sm text-gray-600'>{desc}</p>
              </div>
            ))}
          </div>
          <div className='mt-12 flex flex-col items-center'>
            <>
              <div className='bg-primary/10 rounded-2xl px-6 py-6 max-w-xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 shadow'>
                <span className='text-lg font-semibold text-primary text-center sm:text-left'>
                  Bloom Health Hospital can help you start your journey to better health.{' '}
                  <a
                    href='mailto:info@bloom-health.co.uk'
                    className='underline underline-offset-2 decoration-primary font-bold hover:text-primary/80 transition'
                  >
                    Enquire Here
                  </a>{' '}
                  Or Call{' '}
                  <a
                    href='tel:07949 301632'
                    className='underline underline-offset-2 decoration-primary font-bold hover:text-primary/80 transition'
                  >
                    07949 301632
                  </a>
                </span>
              </div>
            </>
          </div>
        </div>
      </section>
      <section id='services' className='pt-32 py-16 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-10'>
            <span className='inline-block bg-primary/10 text-primary px-4 py-1 rounded-full uppercase text-xs tracking-wider font-semibold mb-3'>
              Our Services
            </span>
            <h2 className='text-3xl sm:text-4xl font-headline font-extrabold text-foreground mb-2'>
              Comprehensive Medical Services
            </h2>
            <p className='max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground'>
              Explore our wide range of specialist and urgent care services, designed to meet your
              health needs with expertise and compassion.
            </p>
          </div>
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {services.map((svc) => (
              <div
                className='p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-start hover:shadow-xl transition'
                key={svc.slug}
              >
                <div className='flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mb-3'>
                  <Plus className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-1'>{svc.title}</h3>
                <p className='text-sm text-gray-600 mb-4 flex-grow'>{svc.description}</p>
                <Link
                  to={`/services/${svc.slug}`}
                  className='inline-flex items-center text-primary font-medium underline underline-offset-2 decoration-primary hover:text-primary/80 transition'
                >
                  LEARN MORE <ArrowRight className='ml-1 h-4 w-4' />
                </Link>
              </div>
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
              Care YOU Can Count on !
            </h2>
            <p className='mt-4 text-lg text-muted-foreground'>
              At Bloom Health, we believe every patient deserves prompt, high-quality medical care
              delivered with compassion and expertise. Our team combines urgent care and specialist
              outpatient services, ensuring your health is in safe, capable hands.
            </p>
            <ul className='mt-6 space-y-3'>
              {whyChooseUsItems.map((item) => (
                <li className='flex items-start' key={item}>
                  <Check className='h-5 w-5 text-primary mr-3 mt-1' />
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
      <section id='contact' className='pt-32 py-20 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-headline font-bold text-foreground'>
              Book an Appointment
            </h2>
            <p className='mt-4 text-lg text-muted-foreground max-w-3xl mx-auto'>
              We offer flexible appointments, including same-day and walk-in urgent care
              availability. Reach out to us to get started.
            </p>
          </div>
          <div className='grid gap-12 md:grid-cols-2'>
            <form className='space-y-6 p-8 bg-white rounded-xl shadow-lg'>
              <h3 className='text-2xl font-semibold text-foreground mb-6'>
                Request an Appointment Online
              </h3>
              {formFields.map(({ label, type, placeholder, name }) => (
                <div key={name}>
                  <label htmlFor={name} className='block text-sm font-medium text-foreground mb-1'>
                    {label}
                  </label>
                  {type === 'text' || type === 'email' || type === 'tel' ? (
                    <Input
                      type={type}
                      id={name}
                      name={name}
                      placeholder={placeholder}
                      className='w-full rounded-md'
                    />
                  ) : (
                    <Textarea
                      id={name}
                      name={name}
                      rows={4}
                      placeholder={placeholder}
                      className='w-full rounded-md'
                    />
                  )}
                </div>
              ))}
              <div>
                <label
                  htmlFor='appointmentType'
                  className='block text-sm font-medium text-foreground mb-1'
                >
                  Type of Appointment
                </label>
                <select
                  id='appointmentType'
                  name='appointmentType'
                  className='w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary'
                >
                  <option value=''>Select type</option>
                  <option value='general'>General Consultation</option>
                  <option value='specialist'>Specialist Consultation</option>
                  <option value='urgent'>Urgent Care</option>
                  <option value='other'>Other</option>
                </select>
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex-1'>
                  <label
                    htmlFor='preferredDate'
                    className='block text-sm font-medium text-foreground mb-1'
                  >
                    Preferred Date
                  </label>
                  <Input
                    type='date'
                    id='preferredDate'
                    name='preferredDate'
                    className='w-full rounded-md'
                  />
                </div>
                <div className='flex-1'>
                  <label
                    htmlFor='preferredTime'
                    className='block text-sm font-medium text-foreground mb-1'
                  >
                    Preferred Time
                  </label>
                  <Input
                    type='time'
                    id='preferredTime'
                    name='preferredTime'
                    className='w-full rounded-md'
                  />
                </div>
              </div>
              <Button
                type='submit'
                size='lg'
                className='w-full bg-primary hover:bg-primary/90 text-white rounded-full shadow-md py-3'
              >
                Submit Request
              </Button>
            </form>
            <aside className='space-y-6 p-8 bg-white rounded-xl shadow-lg'>
              <div className='flex items-center space-x-4'>
                <PhoneIcon className='h-8 w-8 text-primary' />
                <div>
                  <h4 className='font-semibold text-foreground'>Call Us</h4>
                  <a href='tel:07949 301632' className='text-foreground hover:text-primary'>
                    07949 301632
                  </a>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Globe className='h-8 w-8 text-primary' />
                <div>
                  <h4 className='font-semibold text-foreground'>Book Online</h4>
                  <a href='#' className='text-foreground hover:text-primary'>
                    Home
                  </a>
                </div>
              </div>
              <div className='flex items-start space-x-4'>
                <MapPin className='h-8 w-8 text-primary mt-1' />
                <div>
                  <h4 className='font-semibold text-foreground'>Visit Us</h4>
                  <p className='text-foreground'>163-175 Grafton Gate, Milton Keynes, UK, MK9 1AE</p>
                </div>
              </div>
              <img
                src='/contact.jpg'
                alt='Bloom Health location'
                width={600}
                height={400}
                className='rounded-xl shadow-md w-full mt-4 object-cover'
              />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
