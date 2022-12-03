import {useRoutes} from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes';
import { AuthPageLayout ,NonAuthPageLayout} from '../components/PageLayout';


const PublicRouteWrapper = () => {
    const routes = useRoutes(PUBLIC_ROUTES);
    return routes;
  };
  
  const PrivateRouteWrapper = () => {
    // const routes = useRoutes(PRIVATE_ROUTES);
    const routes = useRoutes(PRIVATE_ROUTES);
  
    return routes;
  };


  const Pages = () => {
    const user = localStorage.getItem('user');
    // return user ? (
     return <AuthPageLayout>
        <PrivateRouteWrapper />
      </AuthPageLayout>
    // ) 
    
    // : (
    //   <NonAuthPageLayout>
    //     <PublicRouteWrapper  />
    //   </NonAuthPageLayout>
    // );
  };
  
  export default Pages;