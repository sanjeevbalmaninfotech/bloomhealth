// Links to hash anchors use <a>; React Router <Link> is used where appropriate
// Replace Next Link usages below with anchor tags for hash links and simple navigation
import React from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MapPin,
  PhoneIcon,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Link } from 'react-router-dom';
import { Logo } from '../logo';
const footerColumns = [
  {
    title: 'OUR SERVICES',
    links: [
      { name: 'Cardiac Care', href: '/cardiology' },
      { name: 'Gynaecology ', href: '/gynaecology ' },
      { name: 'Neurology', href: '/neurology' },
      { name: 'Respiratory Care', href: '/respiratoryMedicine' },
    ],
  },
  {
    title: 'ABOUT US',
    links: [
      { name: 'Our Mission', href: '#about-us' },
      { name: 'Our Vision', href: '#about-us' },
      { name: 'Quality & Safety', href: '#about-us' },
    ],
  },
  {
    title: 'CONTACT',
    links: [
      { name: 'Get in Touch', href: '/contact' },
      { name: 'Emergency Care', href: '/contact' },
      { name: 'Book Appointment', href: '/bookAppointment' },
    ],
  },
  {
    title: 'LOCATION & HOURS',
    customContent: (
      <div className='space-y-4'>
        <div className='flex items-start space-x-3'>
          <MapPin className='h-6 w-6 text-primary mt-1 flex-shrink-0' />
          <div>
            <p className='text-sm font-medium text-foreground'>Address</p>
            <p className='text-sm text-muted-foreground'>
              163-175 Grafton Gate, Milton Keynes, MK9 1AE UK
            </p>
          </div>
        </div>
        <div className='flex items-start space-x-3'>
          <PhoneIcon className='h-6 w-6 text-primary mt-1 flex-shrink-0' />
          <div>
            <p className='text-sm font-medium text-foreground'>Phone</p>
            <a
              href='tel:07949 301632'
              className='text-sm text-muted-foreground hover:text-primary transition-colors'
            >
              07949 301632
            </a>
          </div>
        </div>
        <div className='flex items-start space-x-3'>
          <Mail className='h-6 w-6 text-primary mt-1 flex-shrink-0' />
          <div>
            <p className='text-sm font-medium text-foreground'>Email</p>
            <a
              href='mailto:info@bloom-health.co.uk'
              className='text-sm text-muted-foreground hover:text-primary transition-colors'
            >
              info@bloom-health.co.uk
            </a>
          </div>
        </div>
      </div>
    ),
  },
];
const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];
export function Footer() {
  // Memoize the social links to prevent unnecessary re-renders
  const socialLinksContent = React.useMemo(
    () => (
      <div className='flex space-x-3'>
        {socialLinks.map((social) => (
          <a
            href={social.href}
            aria-label={social.name}
            className='transition-opacity hover:opacity-80'
            key={social.name}
          >
            <Button
              variant='outline'
              size='icon'
              className='rounded-full bg-primary text-primary-foreground hover:bg-primary/90'
            >
              <social.icon className='h-5 w-5' />
            </Button>
          </a>
        ))}
      </div>
    ),
    [],
  );
  // Memoize the footer columns to prevent unnecessary re-renders
  const footerColumnsContent = React.useMemo(
    () => (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'>
        {footerColumns.map((column) => (
          <div className='space-y-4' key={column.title}>
            <h3 className='text-sm font-bold uppercase text-primary'>{column.title}</h3>
            {column.links && (
              <ul className='space-y-2'>
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className='text-sm text-muted-foreground hover:text-accent transition-colors'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}  
            {column.customContent && <div className='mt-4'>{column.customContent}</div>}
          </div>
        ))}
      </div>
    ),
    [],
  );
  return (
    <footer className='bg-card py-8 md:py-12 text-foreground border-t'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0'>
          <div className='flex-shrink-0'>
            <Logo />
          </div>
          <div className='flex flex-wrap justify-center sm:justify-end gap-3'>
            {socialLinksContent}
          </div>
        </div>
        {location.pathname == '/' ? 
        <div className='mt-5 mb-12'>
          <div className='h-[280px] sm:h-[340px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-lg'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.47340000002!2d-0.2416814!3d51.5285582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1647881234567!5m2!1sen!2sus'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='Bloom Health Location'
            />
          </div>
        </div> : null}
        {footerColumnsContent}
        <div className='mt-8 md:mt-12 border-t pt-6 md:pt-8 text-center'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Bloom Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
