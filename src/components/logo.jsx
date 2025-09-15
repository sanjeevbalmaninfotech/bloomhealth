import { Link } from 'react-router-dom';
export function Logo() {
  return (
    <Link to='/' className='flex items-center justify-center group'>
      <img
        src='/Logo.svg'
        alt='Bloom Health Logo'
        width={120}
        height={50}
        className='h-auto w-auto object-contain group-hover:opacity-90 transition-opacity'
        loading='eager'
      />
    </Link>
  );
}
