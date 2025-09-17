import React from 'react';

const WomenWellBeing = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
        {/* Header */}
      <div className='bg-blue-500 border-b border-gray-300 py-3 px-4 sm:px-6'>
        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-semibold text-white sm:ml-6 lg:ml-12'>
          Women Wellbeing Center
        </h2>
      </div>

      {/* Main Content */}
      <div className='flex flex-col lg:flex-row px-6 lg:px-20 py-8 gap-8'>
        {/* Left Column */}
        <div className='w-full lg:w-[70%] space-y-8'>
          {/* Overview Section */}
          <section>
            <h3 className='text-4xl font-semibold text-blue-500 mb-4'>Overview</h3>
            <p className='text-gray-700 leading-relaxed'>
              The Women Wellbeing Center for Excellence at Aman hospital is a multidisciplinary
              group of experts...
            </p>
          </section>

          {/* Why Choose Us Section */}
          <section>
            <h3 className='text-2xl font-semibold text-blue-500 mb-4'>
              Why Choose our Women Wellbeing Center for Excellence?
            </h3>
            <p className='text-gray-700 leading-relaxed'>
              Our multidisciplinary scheme entails a complete treatment that engages the
              involvement...
            </p>
          </section>

          {/* Services Provided */}
          <section>
            <h3 className='text-2xl font-semibold text-blue-500 mb-4'>Services Provided</h3>
            <div className='space-y-2'>
              <button className='w-full text-left px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100'>
                Obstetrics
              </button>
              <button className='w-full text-left px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100'>
                General Gynaecology
              </button>
              <button className='w-full text-left px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100'>
                Reproductive health and IVF
              </button>
            </div>
          </section>

          {/* Specialty Units */}
          <section>
            <h3 className='text-2xl font-semibold text-blue-500 mb-4'>Specialty Units</h3>
            <ul className='list-disc list-inside text-gray-700 space-y-1'>
              <li>Vulvar Unit</li>
              <li>Urogynaecology Unit</li>
              <li>Menopause Unit</li>
              <li>Fertility Unit</li>
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div className='w-full lg:w-[30%] space-y-8'>
          {/* FAQ */}
          <section className='bg-white p-4 rounded-md shadow space-y-2'>
            <h3 className='text-xl font-semibold text-blue-500 mb-2'>FAQ</h3>
            <ul className='space-y-1'>
              <li className='cursor-pointer hover:text-blue-700'>
                What should I bring to my first appointment?
              </li>
              <li className='cursor-pointer hover:text-blue-700'>
                Is my insurance accepted at Aman Hospital?
              </li>
              <li className='cursor-pointer hover:text-blue-700'>
                I need directions to the clinic, where do I park?
              </li>
              <li className='cursor-pointer hover:text-blue-700'>
                Can my family member or friend attend my appointment?
              </li>
              <li className='cursor-pointer hover:text-blue-700'>
                How do I cancel or reschedule my appointment?
              </li>
            </ul>
          </section>

          {/* Book Appointment Form */}
          <section className='bg-white p-4 rounded-md shadow space-y-3'>
            <h3 className='text-xl font-semibold text-blue-500'>Book Appointment</h3>
            <form className='space-y-2'>
              <input
                type='text'
                placeholder='Full Name'
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
              <input
                type='email'
                placeholder='E-mail Address'
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
              <input
                type='text'
                placeholder='Mobile Number'
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
              <textarea
                placeholder='Reason for Visit'
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              ></textarea>
              <button
                type='submit'
                className='w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800'
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
              To schedule your appointment, please contact our call center every day between 7:00 am
              and 10:00 pm: <strong>07949 301632</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WomenWellBeing;
