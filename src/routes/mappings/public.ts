import * as ROUTES from 'config/routes';
import { RoutePath } from '../types';

const publicMapping: RoutePath[] = [
  {
    component: () => import(/* webpackChunkName: "sign-in" */ 'views/SignIn'),
    path: ROUTES.SIGN_IN,
  },
]

export default publicMapping;
