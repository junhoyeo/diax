import dynamic from 'next/dynamic';

const DynamicPage = dynamic(() => import('@/Landing/LandingPage'), {
  ssr: false,
});

export default DynamicPage;
