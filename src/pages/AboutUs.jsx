import React, { useState, useEffect } from 'react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const stats = [
    { number: '15+', label: 'Years of Excellence', icon: '🏆' },
    { number: '50+', label: 'Expert Clinicians', icon: '👨‍⚕️' },
    { number: '10,000+', label: 'Patients Served', icon: '❤️' },
    { number: '24/7', label: 'Emergency Care', icon: '🚨' }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      specialty: 'Internal Medicine',
      experience: '20+ years',
      image: '👩‍⚕️',
      description: 'Leading our medical team with expertise in internal medicine and patient care excellence.'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Head of Emergency Medicine',
      specialty: '24-hour walk-in centre',
      experience: '15+ years',
      image: '👨‍⚕️',
      description: 'Specialized in emergency medicine with extensive experience in critical care situations.'
    },
    {
      name: 'Dr. Emma Williams',
      role: 'Paediatrics Specialist',
      specialty: 'Child Healthcare',
      experience: '12+ years',
      image: '👩‍⚕️',
      description: 'Dedicated to providing compassionate care for children and supporting families.'
    },
    {
      name: 'Dr. James Rodriguez',
      role: 'Mental Health Director',
      specialty: 'Psychiatry',
      experience: '18+ years',
      image: '👨‍⚕️',
      description: 'Expert in mental health care with a focus on holistic patient treatment approaches.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-100 via-blue-50 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 opacity-30 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-blue-300 opacity-40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-200 opacity-30 rounded-full animate-pulse"></div>
        </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
  <h2 className="text-4xl md:text-6xl font-bold mb-6 text-blue-800">
    About Bloom Health Hospital
  </h2>
  <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600">
    Dedicated to delivering fast, expert medical care when you need it most. 
    Our commitment to excellence drives everything we do.
  </p>
  <div className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
    Your Health Is Our Priority
  </div>
</div>

      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                id={`stat-${index}`}
                data-animate
                className={`text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 transform transition-all duration-700 hover:scale-105 ${
                  isVisible[`stat-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Our Foundation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              id="mission"
              data-animate
              className={`bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500 transform transition-all duration-700 hover:shadow-xl ${
                isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-800">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide accessible, compassionate and high-quality healthcare services to our community, 
                ensuring every patient receives personalised care that promotes healing, wellness and optimal 
                health outcomes through innovative medical practices and dedicated professional service.
              </p>
            </div>

            <div
              id="vision"
              data-animate
              className={`bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-600 transform transition-all duration-700 hover:shadow-xl ${
                isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">👁️</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-800">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be the leading healthcare provider in Milton Keynes and surrounding areas, recognized 
                for excellence in patient care, medical innovation and community health improvement. 
                We envision a healthier future where advanced medical care is accessible to all.
              </p>
            </div>

            <div
              id="values"
              data-animate
              className={`bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-700 transform transition-all duration-700 hover:shadow-xl ${
                isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">💎</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-800">Our Values</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <div><strong>Compassion:</strong> Treating every patient with empathy</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <div><strong>Excellence:</strong> Highest standards of medical care</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <div><strong>Innovation:</strong> Advanced technology and medicine</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <div><strong>Integrity:</strong> Honesty and ethical practices</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              id="story-content"
              data-animate
              className={`transform transition-all duration-700 ${
                isVisible['story-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-4xl font-bold text-blue-800 mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Founded with a vision to transform healthcare delivery in Milton Keynes, 
                Bloom Health Hospital has grown from a small clinic to a comprehensive 
                medical facility serving thousands of patients annually.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Our journey began with a simple belief: that every individual deserves 
                access to high-quality, compassionate healthcare. Today, we continue 
                to uphold this principle while embracing cutting-edge medical technology 
                and evidence-based practices.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <p className="text-blue-800 font-semibold italic">
                  "We believe in treating not just the condition, but the whole person, 
                  with dignity, respect and the highest standard of medical care."
                </p>
              </div>
            </div>
            <div
              id="story-image"
              data-animate
              className={`transform transition-all duration-700 ${
                isVisible['story-image'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white text-center">
                <div className="text-6xl mb-4">🏥</div>
                <h3 className="text-2xl font-bold mb-4">Modern Healthcare Facility</h3>
                <p className="text-blue-100">
                  State-of-the-art equipment and comfortable patient environments 
                  designed for healing and recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-4">Our Leadership Team</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Meet the experienced professionals leading our commitment to excellence
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                id={`team-${index}`}
                data-animate
                className={`bg-white rounded-2xl p-6 shadow-lg text-center transform transition-all duration-700 hover:shadow-xl hover:scale-105 ${
                  isVisible[`team-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm mb-2">{member.specialty}</p>
                <p className="text-blue-500 text-sm font-medium mb-3">{member.experience}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Why Choose Bloom Health?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Minimal Wait Times',
                description: 'See a doctor when you need one. Our efficient scheduling ensures you get the care you need without unnecessary delays.'
              },
              {
                icon: '👨‍⚕️',
                title: 'Expert Clinicians',
                description: 'Care provided by senior doctors, specialist consultants and experienced specialist nurses with years of expertise.'
              },
              {
                icon: '🏥',
                title: 'Modern Facilities',
                description: 'State-of-the-art equipment in a welcoming, comfortable environment designed for your comfort and recovery.'
              },
              {
                icon: '📍',
                title: 'Accessible Location',
                description: 'Conveniently located with easy parking and transport access in the heart of Milton Keynes.'
              },
              {
                icon: '💙',
                title: 'Personalised Care',
                description: 'We focus on your individual needs, offering tailored health solutions that work best for you.'
              },
              {
                icon: '🔒',
                title: 'Discreet & Confidential',
                description: 'High standards of privacy and patient confidentiality ensure your medical information stays secure.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                data-animate
                className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200 transform transition-all duration-700 hover:shadow-lg hover:scale-105 ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Specialties */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Our Medical Specialties</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🚨', title: 'Urgent Care', desc: 'Immediate medical attention for emergencies' },
              { icon: '🏥', title: 'Outpatient Services', desc: 'Comprehensive consultations and treatments' },
              { icon: '⚕️', title: 'Minor Procedures', desc: 'Safe surgical procedures by experts' },
              { icon: '🔬', title: 'Diagnostics', desc: 'Advanced imaging and laboratory services' },
              { icon: '🩺', title: 'Chronic Care', desc: 'Long-term disease management' },
              { icon: '🧠', title: 'Mental Health', desc: 'Counseling and psychiatric care' },
              { icon: '👶', title: 'Paediatrics', desc: 'Specialized care for children' },
              { icon: '🤝', title: 'Allied Health', desc: 'Physiotherapy and specialist therapies' }
            ].map((specialty, index) => (
              <div
                key={index}
                id={`specialty-${index}`}
                data-animate
                className={`bg-white rounded-xl p-6 shadow-md text-center border border-blue-100 transform transition-all duration-700 hover:shadow-lg hover:scale-105 ${
                  isVisible[`specialty-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-3xl mb-3">{specialty.icon}</div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">{specialty.title}</h3>
                <p className="text-gray-600 text-sm">{specialty.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Experience */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Patient-Centered Experience</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              id="experience-content"
              data-animate
              className={`transform transition-all duration-700 ${
                isVisible['experience-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-2xl font-bold text-blue-800 mb-6">What Sets Us Apart</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Evidence-Based Medicine</h4>
                    <p className="text-gray-600">Using the latest research and proven treatments for optimal outcomes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Multidisciplinary Approach</h4>
                    <p className="text-gray-600">Team-based care with specialists working together</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Continuous Innovation</h4>
                    <p className="text-gray-600">Embracing new technologies for better patient care</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="experience-visual"
              data-animate
              className={`transform transition-all duration-700 ${
                isVisible['experience-visual'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-black-100 shadow-xl">
  <div className="text-center">
    <div className="text-5xl mb-4 drop-shadow-lg">🎯</div>
    <h3 className="text-2xl font-extrabold mb-3">Patient Satisfaction</h3>
    <div className="text-4xl font-extrabold mb-1 text-yellow-300 drop-shadow">
      98%
    </div>
    <p className="text-blue-100 mb-6 text-sm tracking-wide">
      Patient satisfaction rate
    </p>

    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 shadow-md">
      <p className="text-base italic leading-relaxed text-blue-50">
        "The care I received was exceptional. The staff was professional,
        caring and made me feel at ease throughout my treatment."
      </p>
      <p className="text-xs mt-3 text-blue-200 font-medium">— Patient Review</p>
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Technology & Innovation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              id="tech-1"
              data-animate
              className={`bg-white rounded-xl p-8 shadow-lg text-center transform transition-all duration-700 hover:shadow-xl ${
                isVisible['tech-1'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-blue-600">🔬</span>
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Advanced Diagnostics</h3>
              <p className="text-gray-600">State-of-the-art imaging equipment and laboratory facilities for accurate diagnosis</p>
            </div>
            <div
              id="tech-2"
              data-animate
              className={`bg-white rounded-xl p-8 shadow-lg text-center transform transition-all duration-700 hover:shadow-xl ${
                isVisible['tech-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-blue-600">💻</span>
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Digital Health Records</h3>
              <p className="text-gray-600">Secure, comprehensive electronic health records for continuity of care</p>
            </div>
            <div
              id="tech-3"
              data-animate
              className={`bg-white rounded-xl p-8 shadow-lg text-center transform transition-all duration-700 hover:shadow-xl ${
                isVisible['tech-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-blue-600">📱</span>
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Telemedicine</h3>
              <p className="text-gray-600">Remote consultations and follow-ups for convenient healthcare access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-black-100">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-8">
      Ready to Experience Better Healthcare?
    </h2>
    <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto">
      Join thousands of satisfied patients who trust Bloom Health Hospital for their medical needs.
    </p>

    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm text-blue-50">
        <div className="text-3xl mb-3">📞</div>
        <h3 className="text-xl font-bold mb-2 text-gray-200">Call Us</h3>
        {/* <p className="text-2xl font-bold text-gray-200">07949 301632</p> */}
      </div>

      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm text-blue-50">
        <div className="text-3xl mb-3">📅</div>
        <h3 className="text-xl font-bold mb-2 text-gray-200">Register an Interest</h3>
        <p className="font-semiboldtext-gray-200 ">Available 24/7</p>
      </div>

      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm text-blue-50">
        <div className="text-3xl mb-3">📍</div>
        <h3 className="text-xl font-bold mb-2text-gray-200">Visit Us</h3>
        <p className="text-gray-200">163-175 Grafton Gate</p>
        <p className="text-gray-200">Milton Keynes, MK9 1AE</p>
      </div>
    </div>

   
  </div>
</section>

    </div>
  );
};

export default AboutUs;