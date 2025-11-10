import React, { useEffect } from "react";
import { LocationOn, Phone, AccessTime, Email } from "@mui/icons-material";
import { AnimatedBlock } from "../components/layout/UseInView";

const BookAnAppointment = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const infoItems = [
    {
      icon: <LocationOn className="info-icon" />,
      title: "Address",
      desc: '163-175 Grafton Gate, Milton Keynes, UK, MK9 1AE',
    },
    {
      icon: <Phone className="info-icon" />,
      title: "Call or Whatsapp",
      desc: "07949 301632",
    },
    {
      icon: <AccessTime className="info-icon" />,
      title: "Opening Hours",
      desc: "Open 24/7",
    },
    {
      icon: <Email className="info-icon" />,
      title: "Mail",
      desc: "info@bloom-health.co.uk",
    },
  ];

  return (
    <div>
      <div className='bg-[#157fc1] border-b border-gray-300 py-3 px-4 sm:px-6'>
        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-semibold text-white sm:ml-6 lg:ml-12'>
          Register an Interest
        </h2>
      </div>
      <div className='appointment-container'>
        {/* Left Column */}
        <div className='contact-info mt-48 flex flex-col gap-12'>
          {/* Intro text */}
          <AnimatedBlock delay={0.1}>
            <span className="font-semibold text-lg">
              Thank you for choosing Bloom Health. We look forward to serving you.
            </span>
          </AnimatedBlock>

          {/* First row */}
          <div className='flex flex-row flex-wrap gap-6'>
            {infoItems.slice(0, 2).map((item, idx) => (
              <AnimatedBlock key={idx} delay={0.2 + idx * 0.2}>
                <div className='info-block w-[250px] flex flex-col gap-3'>
                  {item.icon}
                  <div>
                    <h4>{item.title}</h4>
                    <div className='mt-4 whitespace-pre-line'>{item.desc}</div>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>

          {/* Second row */}
          <div className='flex flex-row flex-wrap gap-6'>
            {infoItems.slice(2).map((item, idx) => (
              <AnimatedBlock key={idx} delay={0.6 + idx * 0.2}>
                <div className='info-block w-[250px] flex flex-col gap-3'>
                  {item.icon}
                  <div>
                    <h4>{item.title}</h4>
                    <div className='mt-4 whitespace-pre-line'>{item.desc}</div>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div
          className='form-section opacity-0 translate-y-5 animate-slide-up ml-8'
          style={{ animationDelay: '0.2s' }}
        >
          <label className='section-label'>This appointment is for? *</label>
          <div className='radio-group'>
            <label>
              <input type='radio' name='for' defaultChecked /> Myself
            </label>
            <label>
              <input type='radio' name='for' /> Someone Else
            </label>
          </div>

          <h3>Patient Information</h3>
          <input type='text' placeholder='Full Name *' />
          <div className='radio-group'>
            <label>
              <input type='radio' name='gender' defaultChecked /> Male
            </label>
            <label>
              <input type='radio' name='gender' /> Female
            </label>
          </div>
          <input type='date' className="mb-3"/>
          <input type='text' placeholder='Mobile Number *' className="mb-3"/>
          <input type='email' placeholder='Email Address *' className="mb-3"/>

          <h3>Appointment Information</h3>
          <label className='section-label'>Is this your first time visiting us? *</label>
          <div className='radio-group'>
            <label>
              <input type='radio' name='first' defaultChecked /> Yes
            </label>
            <label>
              <input type='radio' name='first' /> No
            </label>
          </div>

          <select>
            <option>Preferred Callback Time *</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>

          <textarea placeholder='Reason for Visit *' className="mt-3"></textarea>

          <button className='submit-btn'>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default BookAnAppointment;