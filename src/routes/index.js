import {useRoutes,useLocation} from 'react-router-dom';
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
    const location = useLocation();
    return user ? (
      <AuthPageLayout>
        <PrivateRouteWrapper key={location.pathname} />
      </AuthPageLayout>
    ) 
    
    : (
      <NonAuthPageLayout>
        <PublicRouteWrapper key={location.pathname}  />
      </NonAuthPageLayout>
    );
  };
  
  export default Pages;