import React from 'react';
import { PhoneIcon, Globe, MapPin } from 'lucide-react'; // adjust if you import icons differently
import { websiteInfo } from '../../utils/constents';


const ContactInfoAside = ({
  phone = websiteInfo.phone,
  onlineBookingLink = '/bookAppointment',
  address =websiteInfo.address,
  mapQuery = '163-175+Grafton+Gate,+Milton+Keynes,+UK,+MK9+1AE',
  imageSrc = '/contact.jpg',
  imageAlt = 'Bloom Health location',
}) => {
  return (
    <aside className='space-y-6 p-8 bg-white rounded-xl shadow-lg'>
      {/* Phone Section */}
      <div className='flex items-center space-x-4'>
        <PhoneIcon className='h-8 w-8 text-primary' />
        <div>
          <h4 className='font-semibold text-foreground'>Call Us</h4>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className='text-foreground hover:text-primary'
          >
            {phone}
          </a>
        </div>
      </div>

      {/* Online Booking Section */}
      {/* <div className='flex items-center space-x-4'>
        <Globe className='h-8 w-8 text-primary' />
        <div>
          <h4 className='font-semibold text-foreground'>Register an Interest</h4>
          <a
            href={onlineBookingLink}
            className='text-foreground hover:text-primary'
          >
            Make an Appointment
          </a>
        </div>
      </div> */}

      {/* Address Section */}
      <div className='flex items-center space-x-4'>
        <MapPin className='h-8 w-8 text-primary' />
        <div>
          <h4 className='font-semibold text-foreground'>Visit Us</h4>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-foreground hover:underline'
          >
            {address}
          </a>
        </div>
      </div>

      {/* Image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        width={600}
        height={400}
        className='rounded-xl shadow-md w-full mt-4 object-cover'
      />
    </aside>
  );
};

export default ContactInfoAside;
