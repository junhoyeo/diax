import dynamic from 'next/dynamic';

const DynamicPage = dynamic(() => import('@/Detail/DetailPage'), {
  ssr: false,
});

export default DynamicPage;
