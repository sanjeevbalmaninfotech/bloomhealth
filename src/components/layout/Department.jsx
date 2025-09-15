import React, { useState } from 'react';
// import LaunchIcon from '@mui/icons-material/Launch';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { Card } from '@mui/material';
import { CheckSharp } from '@mui/icons-material';

const Department = ({
  departmentName,
  overviewText,
  overviewDescription,
  moreDetails,
  // services,
  diseases,
  // specialtyUnits,
  // centersOfExcellence,
  // doctors,
  // faqs
}) => {
  // const [activeIndex, setActiveIndex] = useState(null);

  // const toggleAccordion = (index) => {
  //   setActiveIndex(activeIndex === index ? null : index);
  // };

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='bg-[#157fc1] border-b border-gray-300 py-3 px-4 sm:px-6'>
        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-semibold text-white sm:ml-6 lg:ml-12'>
          {departmentName}
        </h2>
      </div>

      {/* Main Content */}
      <div className='flex flex-col lg:flex-row px-6 lg:px-20 py-8 gap-8'>
        {/* Left Column */}
        <div className='w-full lg:w-[70%] space-y-8'>
          {/* Overview Section */}
          <section>
            <h3 className='text-4xl font-semibold text-[#157fc1] mb-4'>{overviewText}</h3>
            <p className='text-gray-600 font-small leading-relaxed'>
              {overviewDescription}
            </p>
          </section>

          {/* Services Provided */}
          {/* <section>
            <h3 className='text-4xl font-semibold text-blue-500 mb-4'>What We Offer</h3>
            <div className='space-y-2'>
              {services.map((service, index) => (
                <div key={index} className='border border-gray-300 shadow'>
                  <button 
                    onClick={() => toggleService(index)}
                    className='w-full text-left px-4 py-2 bg-white hover:bg-gray-100 flex justify-start items-center'
                  >
                    <span className='text-xl mr-4'>
                      {active === index ? '−' : '+'}
                    </span>
                    <span>{service.title}</span>
                    
                  </button>
                  {active === index && (
                    <div className='px-4 py-2 bg-gray-50'>
                      <p>{service.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section> */}

          {/* Diseases & Conditions Treated */}
          <section>
            <h3 className='text-4xl font-semibold text-[#157fc1] mb-4'>What We Offer</h3>
            <div className='flex flex-row'>
              <ul className='text-gray-700 space-y-1'>
                {diseases.map((disease, index) => (
                  <li key={index} className='flex items-center'>
                    <CheckSharp fontSize='small' className='text-black mr-2' />
                    {disease}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <div className='h-[1px] bg-gray-400 mb-4'/>
            <div className='flex flex-row'>{moreDetails}</div>
          </section>

          {/* Specialty Units */}
          {/* <section>
            <h3 className='text-4xl font-semibold text-blue-500 mb-4'>Specialty Units</h3>
            <div className='flex flex-row'>
              <ul className='text-gray-700 space-y-1 w-[50%]'>
                {specialtyUnits.map((unit, index) => (
                  <li key={index} className='flex items-center'>
                    <LaunchIcon fontSize='small' className='text-black mr-2' />
                    {unit}
                  </li>
                ))}
              </ul>
            </div>
          </section> */}

          {/* Centers of Excellence */}
          {/* {centersOfExcellence && (
            <section>
              <h3 className='text-4xl font-semibold text-blue-500 mb-6'>Centers Of Excellence</h3>
              <div className='flex flex-row overflow-hidden'>
                <div className='flex flex-col justify-center'>
                  <div className='text-lg font-medium text-blue-500 border rounded p-4'>
                    {centersOfExcellence}
                  </div>
                </div>
              </div>
            </section>
          )} */}

          {/* Meet The Doctors */}
          {/* <section>
            <h3 className='text-4xl font-semibold text-blue-500 mb-6'>Meet The Doctors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:px-0">
              {doctors.map((doc) => (
                <div key={doc.id} className="flex flex-col items-center text-center">
                  <Card className="overflow-hidden shadow-lg w-full max-w-xs group">
                    <div className="relative w-full aspect-[4/5]">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Card>
                  <div className="mb-8">
                    <h3 className="font-bold text-lg">{doc.name}</h3>
                    <p className="text-gray-500 text-sm">{doc.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </section> */}
        </div>

        {/* Right Column */}
        <div className='w-full lg:w-[30%] space-y-4'>
          {/* <h3 className='text-4xl font-semibold text-blue-500'>FAQs</h3> */}
          {/* <section className='bg-gray-50 space-y-4'>
            <div className='grid gap-1'>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-3 cursor-pointer hover:bg-blue-50"
                >
                  <button
                    className='w-full text-left flex justify-between items-center'
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className='text-gray-900 font-medium'>{faq.question}</span>
                    {activeIndex === index ? (
                      <KeyboardArrowUpIcon className='text-gray-500' />
                    ) : (
                      <KeyboardArrowDownIcon className='text-gray-500' />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 mt-1 ${
                      activeIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className='text-gray-600 mt-2 border-t-2'>{faq?.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </section> */}
          
          {/* Book Appointment Form */}
          <h3 className='text-3xl font-semibold text-blue-500'>Contact us for more information</h3>
          <section className='rounded-md space-y-3'>
            <form className='space-y-2'>
              <div>
                <input
                  type='text'
                  placeholder='Full Name'
                  className='w-full border border-gray-300 rounded-md px-3 py-2 mb-3'
                />
                <input
                  type='email'
                  placeholder='E-mail Address'
                  className='w-full border border-gray-300 rounded-md px-3 py-2 mb-3'
                />
                <input
                  type='text'
                  placeholder='Mobile Number'
                  className='w-full border border-gray-300 rounded-md px-3 py-2 mb-3'
                />
                <textarea
                  placeholder='Reason'
                  className='w-full border border-gray-300 rounded-md px-3 py-2 mb-3'
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-[#157fc1] text-white py-2 rounded-md hover:bg-blue-800'
              >
                Submit
              </button>
            </form>
          </section>

          {/* Contact Info */}
          <section className='bg-blue-100 p-4 rounded-md'>
            <p className='text-gray-800'>
              Our call center team is always here for you and happy to help!
            </p>
            <p className='text-gray-800 mt-2'>
              please contact our call center every day between 7:00 am
              and 10:00 pm:<br/><br/> <strong>+974 4400 4400</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Department;