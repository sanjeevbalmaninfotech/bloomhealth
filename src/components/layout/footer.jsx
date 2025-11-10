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
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../logo';

const footerColumns = [
  {
    title: 'OUR SERVICES',
    links: [
      { name: 'Diagnostics', href: '/services/diagnostics' },
      { name: 'Urgent Care', href: '/services/urgent-care' },
      { name: 'Outpatient', href: '/services/outpatient-services' }
    ],
  },
  {
    title: 'ABOUT US',
    links: [
      { name: 'About Us', href: '/' },
    ],
  },
  {
    title: 'CONTACT',
    links: [
      { name: '24-hour walk-in centre', href: '/' },
    ],
  },
  {
    title: 'LOCATION & CONTACT',
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
              href='tel:07949301632'
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
  const navigate = useNavigate();

  // Handle link click with scroll to top
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className='text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer'
                    >
                      {link.name}
                    </a>
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
        {location.pathname === '/' ? 
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