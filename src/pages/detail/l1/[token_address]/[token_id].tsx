import dynamic from 'next/dynamic';

const DynamicPage = dynamic(() => import('@/Detail/Layer1DetailPage'), {
  ssr: false,
});

export default DynamicPage;
