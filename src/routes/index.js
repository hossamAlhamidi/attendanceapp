import {useRoutes,useLocation} from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES,PROTECTED_ROUTES } from './routes';
import { AuthPageLayout ,NonAuthPageLayout} from '../components/PageLayout';
import { useAuthPermission } from '../hook/useAuthPermission';

const getUserType = ()=>{
  const { is_admin } = JSON.parse(localStorage.getItem('user'));
  if(is_admin){
    return 'admin'
  }
  else{
    return 'instructor'
  }
}
const PublicRouteWrapper = () => {
    const routes = useRoutes(PUBLIC_ROUTES);
    return routes;
  };
  
  const PrivateRouteWrapper = () => {
    // const routes = useRoutes(PRIVATE_ROUTES);
    const routes = useRoutes(PROTECTED_ROUTES[getUserType()]);
  
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