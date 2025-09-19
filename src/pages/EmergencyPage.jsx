import React,{useEffect} from 'react';
import { Phone, Mail, MapPin, Clock, AlertTriangle, Heart, Ambulance, Shield, Users, Stethoscope, Activity } from 'lucide-react';

const EmergencyPage = () => {



      useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const emergencyContacts = [
    {
      type: "Emergency Hotline",
      number: "911",
      description: "Immediate medical emergency response",
      icon: <AlertTriangle className="h-8 w-8 text-rose-400" />,
      available: "24/7"
    },
    {
      type: "Hospital Main",
      number: "07949 301632",
      description: "General hospital inquiries and appointments",
      icon: <Heart className="h-8 w-8" style={{color: 'hsl(203, 80%, 42%)'}} />,
      available: "24/7"
    },
    {
      type: "Ambulance Service",
      number: "+1 (555) 999-8888",
      description: "Non-emergency medical transport",
      icon: <Ambulance className="h-8 w-8 text-sky-400" />,
      available: "24/7"
    }
  ];

  const emergencyServices = [
    {
      title: "Rapid Response Team",
      description: "Our specialized emergency team responds within minutes to provide immediate life-saving interventions including CPR, advanced cardiac support, and trauma stabilization.",
      icon: <Heart className="h-12 w-12 text-rose-300" />,
      details: "Average response time: 4-6 minutes"
    },
    {
      title: "Critical Care Unit",
      description: "State-of-the-art intensive care facilities with 24/7 monitoring, ventilator support, and specialized equipment for critical patients requiring immediate medical attention.",
      icon: <Activity className="h-12 w-12" style={{color: 'hsl(203, 80%, 52%)'}} />,
      details: "Advanced life support available"
    },
    {
      title: "Emergency Transportation",
      description: "Fully equipped ambulances with paramedic staff, cardiac monitors, oxygen support, and direct communication with our emergency department for seamless patient transfer.",
      icon: <Ambulance className="h-12 w-12 text-sky-300" />,
      details: "GPS-tracked fleet of 12 ambulances"
    }
  ];

  const emergencyProcedures = [
    {
      title: "Triage Assessment",
      description: "Upon arrival, patients undergo immediate triage assessment to prioritize treatment based on severity of condition.",
      icon: <Stethoscope className="h-8 w-8 text-emerald-300" />
    },
    {
      title: "Rapid Diagnosis",
      description: "Our emergency physicians use advanced diagnostic tools including CT scans, X-rays, and laboratory tests for quick diagnosis.",
      icon: <Activity className="h-8 w-8" style={{color: 'hsl(203, 80%, 52%)'}} />
    },
    {
      title: "Immediate Treatment",
      description: "Treatment begins immediately with pain management, stabilization, and necessary medical interventions to ensure patient safety.",
      icon: <Shield className="h-8 w-8 text-cyan-300" />
    },
    {
      title: "Specialist Consultation",
      description: "If needed, our on-call specialists are available 24/7 for immediate consultation and advanced treatment procedures.",
      icon: <Users className="h-8 w-8 text-indigo-300" />
    }
  ];

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
 <section className="relative min-h-screen flex justify-center px-2 py-4">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white/30 to-slate-50/20" />
        
        <div className="container mx-auto h-full flex  justify-center px-4 relative z-10">
          <div className="max-w-4xl w-full mx-auto">
            {/* Main Emergency Card */}
            <div className="p-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 text-center mb-6">
              <div className="flex justify-center mb-6">
                <div className="bg-rose-50 p-4 rounded-full border border-rose-100">
                  <AlertTriangle className="h-16 w-16 text-rose-400" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight drop-shadow mb-3">
                Emergency Medical Services
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{color: 'hsl(203, 80%, 42%)'}}>
                Compassionate Care When You Need It Most
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
                Our dedicated emergency medical team is available 24/7 to provide immediate, expert care during critical situations. 
                We understand that medical emergencies are frightening, and we're here to help with professional, compassionate treatment.
              </p>
              
              {/* Emergency Call Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="tel:911" 
                  className="bg-gradient-to-r from-rose-400 to-rose-300 hover:from-rose-500 hover:to-rose-400 text-white rounded-full px-12 py-4 shadow-xl transition-all duration-200 text-xl font-bold flex  justify-center space-x-3"
                >
                  <Phone className="h-6 w-6" />
                  <span>CALL 911 NOW</span>
                </a>
                <a 
                  href="tel:07949301632" 
                  className="bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-white rounded-full px-8 py-3 shadow-xl transition-all duration-200 flex  justify-center space-x-2"
                  style={{background: 'linear-gradient(to right, hsl(203, 80%, 52%), hsl(203, 80%, 62%))'}}
                >
                  <Phone className="h-5 w-5" />
                  <span>Hospital Direct</span>
                </a>
              </div>
            </div>

            {/* Mobile Responsive Emergency Contacts */}
            <div className="hide-above-1280 grid gap-6 md:hidden">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="p-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200">
                  <div className="flex  justify-center space-x-4 mb-4">
                    {contact.icon}
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{contact.type}</h3>
                      <p className="text-gray-600">{contact.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <a 
                      href={`tel:${contact.number}`}
                      className="text-2xl font-bold hover:opacity-80 transition-colors"
                      style={{color: 'hsl(203, 80%, 42%)'}}
                    >
                      {contact.number}
                    </a>
                    <span className="text-emerald-500 font-semibold">{contact.available}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do in Emergencies */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Handle Your Emergency</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              When you arrive at our emergency department, here's exactly what happens to ensure you receive the best possible care as quickly as possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {emergencyProcedures?.map((procedure, index) => (
              <div key={index} className="p-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-slate-50 p-2 rounded-2xl border border-gray-100">
                    {procedure.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{procedure.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{procedure.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts Grid - Desktop */}
      <section className="hidden md:block py-12 px-4 bg-gradient-to-r from-slate-50/50 to-blue-50/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Emergency Contact Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 bg-slate-50 p-3 rounded-2xl border border-gray-100">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.type}</h3>
                  <p className="text-gray-600 mb-4">{contact.description}</p>
                  <a 
                    href={`tel:${contact.number}`}
                    className="text-3xl font-bold hover:opacity-80 transition-colors mb-3"
                    style={{color: 'hsl(203, 80%, 42%)'}}
                  >
                    {contact.number}
                  </a>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-500 font-semibold">{contact.available}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Emergency Services</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We provide comprehensive emergency medical services with advanced equipment, experienced staff, and a commitment to saving lives through immediate, professional care.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {emergencyServices.map((service, index) => (
              <div key={index} className="p-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 bg-slate-50 p-3 rounded-2xl border border-gray-100">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <span className="text-sm font-semibold px-4 py-2 rounded-full bg-blue-50 border border-blue-100" style={{color: 'hsl(203, 80%, 42%)'}}>
                    {service.details}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4 bg-gradient-to-r from-slate-50/30 to-blue-50/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Get Help Immediately</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Details */}
              <div className="p-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-rose-50 p-2 rounded-2xl border border-rose-100">
                      <Phone className="h-6 w-6 text-rose-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Life-Threatening Emergency</h4>
                      <a href="tel:911" className="text-rose-500 hover:text-rose-600 font-bold text-xl">
                        Call 911
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-2 rounded-2xl border border-blue-100">
                      <Phone className="h-6 w-6" style={{color: 'hsl(203, 80%, 52%)'}} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Hospital Emergency Line</h4>
                      <a href="tel:07949 301632" className="hover:opacity-80 transition-colors" style={{color: 'hsl(203, 80%, 42%)'}}>
                        07949 301632
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
                      <Mail className="h-6 w-6 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Emergency Inquiries</h4>
                      <a href="mailto:info@bloom-health.co.uk" className="hover:opacity-80 transition-colors" style={{color: 'hsl(203, 80%, 42%)'}}>
                        info@bloom-health.co.uk
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-50 p-2 rounded-2xl border border-emerald-100">
                      <MapPin className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Emergency Department</h4>
                      <p className="text-gray-600">
                        123 Medical Center Drive<br />
                        Health City, HC 12345<br />
                        <span className="text-emerald-500 font-medium">Open 24/7</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
             <div className="p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200">
  <h3 className="text-2xl font-bold text-gray-900 mb-8">Immediate Actions</h3>

  <div className="space-y-4">
    <a 
      href="tel:911" 
      className="w-full bg-gradient-to-r from-rose-300 to-rose-200 hover:from-rose-400 hover:to-rose-300 text-gray-800 rounded-full px-6 py-4 shadow-xl transition-all duration-200 font-bold flex items-center justify-center space-x-3"
    >
      <AlertTriangle className="h-6 w-6" />
      <span>CALL 911 - EMERGENCY</span>
    </a>

    <a 
      href="tel:+15551234567" 
      className="w-full rounded-full px-6 py-4 shadow-xl transition-all duration-200 font-bold flex items-center justify-center space-x-3 text-white"
      style={{background: 'linear-gradient(to right, hsl(203, 80%, 42%), hsl(203, 80%, 52%))'}}
    >
      <Phone className="h-6 w-6" />
      <span>CALL HOSPITAL</span>
    </a>

    <a 
      href="mailto:emergency@bloomhealth.com" 
      className="w-full bg-gradient-to-r from-emerald-200 to-emerald-100 hover:from-emerald-300 hover:to-emerald-200 text-gray-800 rounded-full px-6 py-4 shadow-xl transition-all duration-200 font-bold flex items-center justify-center space-x-3"
    >
      <Mail className="h-6 w-6" />
      <span>EMAIL INQUIRY</span>
    </a>

    <a 
      href="https://www.google.com/maps?q=163-175+Grafton+Gate,+Milton+Keynes,+UK,+MK9+1AE"
      target="_blank" 
      rel="noopener noreferrer"
      className="w-full bg-gradient-to-r from-slate-200 to-slate-100 hover:from-slate-300 hover:to-slate-200 text-gray-800 rounded-full px-6 py-4 shadow-xl transition-all duration-200 font-bold flex items-center justify-center space-x-3"
    >
      <MapPin className="h-6 w-6" />
      <span>GET DIRECTIONS</span>
    </a>
  </div>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Emergency Guidelines */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Emergency Guidelines</h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              Knowing what to expect and how to communicate during an emergency can save valuable time and potentially save lives. Here's what our emergency team needs from you.
            </p>
            
            <div className="p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">When You Call:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>Stay calm and speak clearly to the dispatcher</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>Provide your exact location or address immediately</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>Describe the nature of the emergency clearly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>Follow all instructions given by the dispatcher</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>Do not hang up until told to do so</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Information We Need:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>Patient's current symptoms and condition</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>Any known allergies or medical conditions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>Current medications being taken</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>Insurance information if available</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>Emergency contact person details</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergencyPage;