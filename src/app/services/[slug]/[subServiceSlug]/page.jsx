// Client app fallback instead of Next notFound
import { getSubService, getService } from '@/lib/services';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
// Static params removed in React app
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
export default function SubServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug = '', subServiceSlug = '' } = useParams();
  const service = getService(slug);
  const subService = getSubService(slug, subServiceSlug);
  if (!service || !subService) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p>Sub-service not found.</p>
      </div>
    );
  }
  const location = useLocation();
  return (
    <>
      <main className='flex-grow'>
        <section className='bg-gray-50 py-4 border-b'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center text-sm text-muted-foreground'>
              <Link to='/' className='hover:text-primary'>
                Home
              </Link>
              <ChevronRight className='h-4 w-4 mx-1' />
              <a href='/#services' className='hover:text-primary'>
                Services
              </a>
              <ChevronRight className='h-4 w-4 mx-1' />
              <Link to={`/services/${service.slug}`} className='hover:text-primary'>
                {service.title}
              </Link>
              <ChevronRight className='h-4 w-4 mx-1' />
              <span className='font-medium text-foreground'>{subService.title}</span>
            </div>
          </div>
        </section>
        <section className='bg-primary/5 py-10'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='font-headline text-4xl font-bold text-primary'>{subService.title}</h1>
            {/* <p className='mt-2 text-lg text-muted-foreground'>A sub-service of {service.title}</p> */}
          </div>
        </section>
        <section className='py-10'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
              <div className='md:col-span-2'>
                {/* <h2 className='text-3xl font-bold text-[#157fc1]'>About {subService.title}</h2> */}
                <p className='mt-4 text-lg text-muted-foreground'>{subService.shortDescription}</p>
                <p className='mt-4 text-lg text-muted-foreground'>
                  Further details about the {subService.title} service will be provided here. This
                  section can include information about the procedures, what to expect, the
                  technology used, and the specialists involved.
                </p>
                <Button asChild size='lg' className='mt-8'>
                  <a href='/#contact'>Contact us for more information</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className='mb-12'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='bg-gray-50 p-8 rounded-2xl shadow-xl'>
              <h3 className='text-3xl font-bold text-[#157fc1] mb-10'>Related Services</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                {service?.subServices
                  .filter((sub) => {
                    if (location?.pathname === '/services/outpatient-services/adults')
                      return sub.slug === 'adults';
                    if (location?.pathname === '/services/outpatient-services/pediatrics')
                      return sub.slug === 'pediatrics';
                    return false;
                  })
                  .flatMap((sub) =>
                    sub.servicesChild.map((child) => {
                      const path = child?.title
                        .split(' ')
                        .map((word, i) =>
                          i === 0
                            ? word.toLowerCase()
                            : word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join('');
                      return (
                        <Link
                          key={child.slug}
                          to={`/${path}`}
                          className={`group flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                            child.slug === subService?.slug
                              ? 'border-primary bg-primary/10'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className='flex items-center gap-3 mb-4'>
                            <div className='flex items-center justify-center h-10 w-10 bg-primary/10 rounded-full'>
                              <ChevronRight className='h-5 w-5 text-primary' />
                            </div>
                            <h4 className='text-lg font-semibold text-gray-900'>{child.title}</h4>
                          </div>
                          <p className='text-sm text-gray-500 line-clamp-3'>
                            {child.shortDescription || 'Learn more about this service.'}
                          </p>
                        </Link>
                      );
                    }),
                  )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
