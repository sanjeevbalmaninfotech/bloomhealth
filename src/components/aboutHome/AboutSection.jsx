import React from 'react';
import { Heart, Eye, Shield } from 'lucide-react';

const AboutHomeSection = () => {
  return (
    <section className="py-20 px-4 bg-white text-black">
      {/* ---------- Top Plain Header Section ---------- */}
      <div className="container mx-auto text-center ">
        <h2 className="text-3xl sm:text-4xl font-headline font-extrabold mb-4">
          About Us
        </h2>

        <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm sm:text-base tracking-wider font-semibold mb-3">
          About Bloom Health
        </span>

        <p className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
         At Bloom Health, we believe every patient deserves prompt, high-quality medical care
          delivered with compassion and expertise. Our team combines the best of urgent care and
          specialist outpatient services, ensuring your health is in safe, capable hands.
        </p>
      </div>

      {/* ---------- Main Grid Section with Background ---------- */}
      <div className="relative bg-white">
        {/* Background Fully White */}
        <div className="absolute inset-0 bg-white"></div>

        {/* Foreground Content */}
        <div className="relative container mx-auto grid gap-12 lg:grid-cols-2 px-4 sm:px-6 lg:px-8 py-16 text-black">
          {/* Left: Mission, Vision, Values */}
          <div className="flex flex-col justify-center space-y-6">
            <InfoCard
              icon={<Heart className="h-6 w-6 text-blue-600 mr-3" />}
              title="Our Mission"
              description="To provide accessible, innovative healthcare solutions that prioritise patient well-being and deliver exceptional medical outcomes through personalised care."
            />

            <InfoCard
              icon={<Eye className="h-6 w-6 text-blue-600 mr-3" />}
              title="Our Vision"
              description="To be the leading healthcare provider in Milton Keynes and surrounding areas, known for excellence, innovation and compassionate patient-centered care."
            />

            <InfoCard
              icon={<Shield className="h-6 w-6 text-blue-600 mr-3" />}
              title="Our Values"
              description="Integrity, compassion, excellence and innovation guide everything we do. We are committed to treating every patient with dignity and respect."
            />
          </div>

          {/* Right: Paragraph + Bullet Points */}
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg text-black">
  <h3 className="text-2xl font-semibold mb-4">
    Integrated Care Under One Roof
  </h3>
  <p className="text-base sm:text-lg leading-relaxed mb-4">
    At Bloom Health, we have designed our services to offer integrated care in a single,
    convenient location. By bringing together clinicians, diagnostic services, and
    pharmacy support, we streamline your treatment journey — ensuring seamless
    coordination, clear communication, and continuity of care throughout every stage of
    your experience with us.
  </p>
  <h4 className="text-lg font-semibold mb-3">
    What Sets Us Apart
  </h4>
  <ul className="space-y-2 list-disc list-inside text-gray-700">
    <li>State-of-the-art medical technology</li>
    <li>Experienced, certified healthcare professionals</li>
    <li>Same-day and walk-in appointments available</li>
    <li>Comprehensive multispecialty services</li>
  </ul>
</div>
        </div>
      </div>
    </section>
  );
};

// Reusable InfoCard component
const InfoCard = ({ icon, title, description }) => (
  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold mb-3 flex items-center">
      {icon}
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed">{description}</p>
  </div>
);

export default AboutHomeSection;
