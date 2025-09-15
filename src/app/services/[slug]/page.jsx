import { getService } from '@/lib/services';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { CheckSharp } from '@mui/icons-material';

export default function ServicePage() {
  const { slug = '' } = useParams();
  const service = getService(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p>Service not found.</p>
      </div>
    );
  }

  return (
    <>
      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='bg-primary/5 py-10'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='font-headline text-4xl font-bold text-primary'>{service.title}</h1>
            <p className='mt-2 text-lg text-muted-foreground'>
              Comprehensive care and specialized treatments
            </p>
          </div>
        </section>

        {/* Main Service Content */}
        <section className='py-20'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
              {/* Left Column */}
              <div className='md:col-span-2'>
                <h2 className='text-3xl font-bold text-[#157fc1]'>
                  {service?.shortDescription}
                </h2>
                <p className='mt-4 text-lg text-muted-foreground'>
                  {service?.longDescription || service?.description}
                </p>
                <ul className='text-gray-700 space-y-1 mt-10'>
                  {service?.diseases?.map((disease, index) => (
                    <li key={index} className='flex items-center'>
                      <CheckSharp fontSize='small' className='text-black mr-2' />
                      {disease}
                    </li>
                  ))}
                </ul>
                <p className='mt-12 text-lg text-muted-foreground'>
                  {service?.footer}
                </p>
                <Button asChild size='lg' className='mt-8'>
                  <a href='/#contact'>Contact us for more information</a>
                </Button>
              </div>

              {/* Right Column - Quick Links */}
              <div className='bg-gray-50 p-6 rounded-lg'>
                <h3 className='text-xl font-semibold text-foreground mb-4'>Quick Links</h3>
                <ul className='space-y-2'>
                  <li>
                    <a href='/#services' className='text-primary hover:underline'>
                      All Services
                    </a>
                  </li>
                  <li>
                    <a href='/#contact' className='text-primary hover:underline'>
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sub Services */}
        {service?.subServices && service?.subServices.length > 0 && (
          <section id='sub-services' className='py-20 bg-gray-50'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='text-center mb-12'>
                <h2 className='font-headline text-3xl font-bold text-foreground'>
                  {service?.servicesHeader}
                </h2>
                <p className='mt-2 text-lg text-muted-foreground'>
                  Explore the specific services we provide in this area.
                </p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {service.subServices.map((sub) => (
                  <div
                    key={sub.slug}
                    className='border rounded-lg p-6 shadow-sm bg-background flex flex-col text-left hover:shadow-lg transition-shadow duration-300'
                  >
                    <h3 className='text-xl font-semibold text-foreground mb-3'>{sub.title}</h3>
                    <p className='text-sm text-muted-foreground mb-6 flex-grow'>
                      {sub.description}
                    </p>
                    <Link
                      to={`/services/${service.slug}/${sub.slug}`}
                      className='text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center'
                    >
                      LEARN MORE <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </div>
                ))}
                
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
