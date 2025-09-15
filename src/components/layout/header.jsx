// No router links needed here, we use hash anchors
import { Menu, Phone as PhoneIconLucide, Mail, Search, ChevronDown, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { useEffect, useRef, useState } from 'react';
import { featureOptions, medicalServicesMenu, specialtyColumns } from './MenuUtils';
import { Logo } from '../logo';

export function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [openLeftSheet, setOpenLeftSheet] = useState(false); // For the left sheet (feature options)
  const [openRightSheet, setOpenRightSheet] = useState(false); // For the right sheet (main menu)
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setOpenRightSheet(false); // Close mobile menu if open
      setOpenLeftSheet(false);
    }
  };

  const handleNavClick = (item) => {
    if (location.pathname === '/home') {
      // Already on /home, scroll immediately
      scrollToSection(item.sectionId);
    } else {
      // Navigate to /home and pass sectionId
      navigate('/home', { state: { scrollTo: item.sectionId } });
    }
  };

  const navItems = [
    { name: 'Home', sectionId: '#home' },
    { name: 'Our Story', sectionId: '#about-us' },
    { name: 'Services', sectionId: '#services' },
    { name: 'Contact Us', sectionId: '#contact' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBookAppointment = (e) => {
    e?.preventDefault();

    if (token) {
      navigate('/bookAppointment');
    } else {
      navigate('/login', { state: { from: '/bookAppointment' } });
    }
  };

  return (
    <header className='sticky top-0 z-50 w-full shadow-md'>
      {/* Top Bar */}
      <div className='bg-primary text-primary-foreground'>
        <div className='container mx-auto flex h-12 items-center justify-between px-4 sm:px-6 lg:px-8'>
          <div className='flex md:hidden items-center space-x-6' />
          <div className='hidden md:flex items-center space-x-6'>
            <div className='flex items-center space-x-2'>
              <PhoneIconLucide className='h-4 w-4' />
              <a href='tel:07949 301632' className='text-xs hover:underline'>
                07949 301632
              </a>
            </div>
            <div className='flex items-center space-x-2'>
              <Mail className='h-4 w-4' />
              <a href='mailto:info@bloom-health.co.uk' className='text-xs hover:underline'>
                info@bloom-health.co.uk
              </a>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <nav className='hidden lg:flex items-center space-x-2'>
              <nav className='hidden lg:flex items-center space-x-2'>
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className='px-3 py-1 text-sm font-medium text-primary-foreground hover:bg-primary/90 rounded-md transition-colors'
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </nav>
            {/* <div className='flex gap-1'>
              <div>
                <div onClick={handleBookAppointment} className='book-btn cursor-pointer'>
                  <span className='full-tex'>Book an Appointment</span>
                  <span className='short-text'>Book</span>
                </div>
              </div>
            </div> */}
            {token ? (
              <>
                <div>
                  <Link
                    to='/profile'
                    className='flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#157fc1] font-semibold hover:bg-[#11679c] hover:text-white transition border border-white'
                  >
                    P
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className='bg-white text-foreground'>
        <div className='container mx-auto flex h-20 items-center px-4 sm:px-6 lg:px-8'>
          <div className='flex-shrink-0'>
            <Logo />
          </div>

          {/* Feature Options - Centered */}
          <div className='flex-1 flex justify-center'>
            <div className='p-2'>
              <nav
                className='hidden lg:flex flex-1 flex-wrap items-center justify-center gap-y-2 pb-2 relative'
                ref={menuRef}
              >
                {featureOptions
                  ?.filter((item) => item?.enabled)
                  .map((item) => (
                    <div key={item?.name} className='relative'>
                      <Button
                        variant='ghost'
                        className='text-foreground hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary'
                        onClick={() => setOpenMenu(openMenu === item.name ? null : item.name)}
                      >
                        {item.name}
                        <ChevronDown className='w-4 h-4 ml-1' />
                      </Button>

                      {/* Regular dropdown for items with submenu */}
                      {openMenu === item.name && item.submenu?.length > 0 && (
                        <div className='absolute left-0 mt-3 w-56 bg-gradient-to-br from-white to-gray-100 border-gray-200 rounded-md shadow-lg z-50'>
                          {item.submenu.map((sub) =>
                            sub.href.startsWith('/') ? (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                onClick={() => setOpenMenu(null)}
                              >
                                {sub.name}
                              </Link>
                            ) : (
                              <a
                                key={sub.name}
                                href={sub.href}
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                              >
                                {sub.name}
                              </a>
                            ),
                          )}
                        </div>
                      )}

                      {/* Mega Menu for Medical Services */}
                      {openMenu === item.name && item.name === 'Medical Services' && (
                        <div className='absolute mt-3 -translate-x-1/2 bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-lg w-[90vw] max-w-[1200px] h-auto min-h-[300px] p-6 z-50'>

                          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2'>
                            {medicalServicesMenu.map((section) => (
                              <div key={section.title}>
                                <h3 className='font-semibold text-primary mb-2'>{section.title}</h3>
                                <ul className='space-y-1'>
                                  {section.items.map((service) => {
                                    const path = service
                                      .split(' ')
                                      .map((word, i) =>
                                        i === 0
                                          ? word.toLowerCase()
                                          : word.charAt(0).toUpperCase() + word.slice(1),
                                      )
                                      .join('');

                                    return (
                                      <li key={service}>
                                        <Link
                                          to={`/${path}`}
                                          className='text-xs text-gray-700 hover:text-primary'
                                          onClick={() => setOpenMenu(null)}
                                        >
                                          {service}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Specialty Units/Clinics dropdown */}
                      {openMenu === item?.name && item?.name === 'Specialty Units/Clinics' && (
                        <div className='absolute left-[-200px] mt-3 w-[800px] bg-gradient-to-br from-white to-gray-100 border-gray-200 rounded-md shadow-lg z-50 p-6'>
                          <div className='grid grid-cols-3 gap-6'>
                            {Object.values(specialtyColumns).map((column, colIndex) => (
                              <ul key={colIndex} className='space-y-1'>
                                {column.map((clinic, index) => (
                                  <li key={index}>
                                    <a
                                      href='#'
                                      className='text-sm text-gray-700 hover:text-primary'
                                    >
                                      {clinic}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            ))}
                          </div>
                          <div className='absolute left-[255px] top-0 w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-b-gray-100 border-r-[10px] border-r-transparent transform -translate-y-full' />
                        </div>
                      )}
                    </div>
                  ))}
              </nav>
            </div>
          </div>

          {/* Right side items */}
          <div className='flex items-center space-x-3'>
            {/* Mobile Feature Options Menu */}
            <div className='lg:hidden mr-3'>
              <Sheet open={openLeftSheet} onOpenChange={setOpenLeftSheet}>
                <SheetTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='text-foreground border-neutral-300 hover:bg-accent focus:bg-accent'
                  >
                    <Layers className='h-6 w-6' />
                    <span className='sr-only'>Toggle mobile menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side='left'
                  className='w-full max-w-sm bg-white text-foreground p-0 flex flex-col'
                >
                  {/* Logo */}
                  <div className='p-4 border-b border-neutral-200'>
                    <Logo />
                  </div>

                  {/* Scrollable Content */}
                  <div className='flex-1 overflow-y-auto'>
                    {/* Feature Options */}
                    <nav className='flex flex-col divide-y divide-gray-200'>
                      {featureOptions.map((item) => (
                        <div key={item.name} className='p-4'>
                          {/* Specialty Units/Clinics Mobile Version */}
                          {item.name === 'Specialty Units/Clinics' && (
                            <details>
                              <summary className='cursor-pointer text-base font-medium text-foreground'>
                                {item.name}
                              </summary>
                              <div className='mt-3 grid grid-cols-1 gap-4 pl-2'>
                                {Object.values(specialtyColumns).map((column, colIndex) => (
                                  <ul key={colIndex} className='space-y-1'>
                                    {column.map((clinic, index) => (
                                      <li key={index}>
                                        <Link
                                          to={`/${clinic.toLowerCase().replace(/\s+/g, '-')}`}
                                          className='text-sm text-gray-700 hover:text-primary'
                                          onClick={() => setOpenLeftSheet(false)}
                                        >
                                          {clinic}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                ))}
                              </div>
                            </details>
                          )}
                          {/* Item with submenu */}
                          {item.submenu?.length > 0 && item.name !== 'Medical Services' && (
                            <details>
                              <summary className='cursor-pointer text-base font-medium text-foreground'>
                                {item.name}
                              </summary>
                              <div className='mt-2 pl-4 space-y-2'>
                                {item.submenu.map((sub) =>
                                  sub.href.startsWith('/') ? (
                                    <Link
                                      key={sub.name}
                                      to={sub.href}
                                      className='block text-sm text-gray-700 hover:text-primary'
                                      onClick={() => setOpenLeftSheet(false)}
                                    >
                                      {sub.name}
                                    </Link>
                                  ) : (
                                    <a
                                      key={sub.name}
                                      href={sub.href}
                                      className='block text-sm text-gray-700 hover:text-primary'
                                      onClick={() => setOpenLeftSheet(false)}
                                    >
                                      {sub.name}
                                    </a>
                                  ),
                                )}
                              </div>
                            </details>
                          )}

                          {/* Medical Services Mega Menu */}
                          {item.name === 'Medical Services' && (
                            <details>
                              <summary className='cursor-pointer text-base font-medium text-foreground'>
                                {item.name}
                              </summary>
                              <div className='mt-3 grid grid-cols-2 gap-4 pl-2 overflow-y-auto max-h-[60vh]'>
                                {medicalServicesMenu.map((section) => (
                                  <div key={section.title}>
                                    <h3 className='font-semibold text-primary mb-1 text-sm'>
                                      {section.title}
                                    </h3>
                                    <ul className='space-y-1'>
                                      {section.items.map((service) => {
                                        const path = service
                                          .split(' ')
                                          .map((word, i) =>
                                            i === 0
                                              ? word.toLowerCase()
                                              : word.charAt(0).toUpperCase() + word.slice(1),
                                          )
                                          .join('');

                                        return (
                                          <li key={service}>
                                            <Link
                                              to={`/${path}`}
                                              className='text-xs text-gray-700 hover:text-primary'
                                              onClick={() => setOpenLeftSheet(false)}
                                            >
                                              {service}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}

                          {/* Items without submenu */}
                          {!item.submenu?.length && item.name !== 'Medical Services' && (
                            <Link
                              to={item.href}
                              className='text-base font-medium text-foreground hover:text-primary'
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Mobile Menu */}
            <div className='lg:hidden'>
              <Sheet open={openRightSheet} onOpenChange={setOpenRightSheet}>
                <SheetTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='text-foreground border-neutral-300 hover:bg-accent focus:bg-accent'
                  >
                    <Menu className='h-6 w-6' />
                    <span className='sr-only'>Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side='right' className='w-full max-w-sm bg-white text-foreground p-0'>
                  <div className='flex h-full flex-col'>
                    <div className='p-4 border-b border-neutral-200'>
                      <Logo />
                    </div>
                    <nav className='flex flex-col space-y-1 p-4'>
                      <nav className='flex flex-col space-y-1 p-4'>
                        {navItems.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleNavClick(item)}
                            className='block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-primary transition-colors text-left'
                          >
                            {item.name}
                          </button>
                        ))}
                      </nav>
                    </nav>
                    <div className='mt-auto space-y-4 p-4 border-t border-neutral-200'>
                      <div className='flex items-center space-x-2'>
                        <PhoneIconLucide className='h-5 w-5 text-primary' />
                        <a
                          href='tel:07949 301632'
                          className='text-sm hover:underline text-foreground'
                        >
                         07949 301632
                        </a>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Mail className='h-5 w-5 text-primary' />
                        <a
                          href='mailto:info@bloom-health.co.uk'
                          className='text-sm hover:underline text-foreground'
                        >
                          info@bloom-health.co.uk
                        </a>
                      </div>
                      <Button
                        asChild
                        className='w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md'
                      >
                        <a href='/#contact'>TALK TO US +</a>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
