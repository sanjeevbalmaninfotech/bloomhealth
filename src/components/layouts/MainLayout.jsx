import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function MainLayout() {
  const location = useLocation(); 
  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <a href='#main' className='sr-only focus:not-sr-only p-2 bg-primary text-white'>
        Skip to main content
      </a>
      <Header className='sticky top-0 z-50 backdrop-blur-sm bg-white/70' />
      <main id='main' className='flex-grow'>
        
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


