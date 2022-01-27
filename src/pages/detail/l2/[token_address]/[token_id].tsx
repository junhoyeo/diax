import dynamic from 'next/dynamic';

const DynamicPage = dynamic(() => import('@/Detail/Layer2DetailPage'), {
  ssr: false,
});

export default DynamicPage;
