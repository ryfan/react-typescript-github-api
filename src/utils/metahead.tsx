import { Helmet, HelmetProvider } from 'react-helmet-async';

interface Meta {
 title: string;
}

const MetaHead = ({ title }: Meta) => {
 return (
  <HelmetProvider>
   <Helmet>
    <title>
     {title} - {process.env.REACT_APP_TITLE}
    </title>
   </Helmet>
  </HelmetProvider>
 );
};

export { MetaHead };
