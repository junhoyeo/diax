import dynamic from 'next/dynamic';

const DynamicPage = dynamic(() => import('@/Address/AddressPage'), {
  ssr: false,
});

export default DynamicPage;
