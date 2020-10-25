import * as ROUTES from 'config/routes';
import { RoutePath } from '../types';

const privateMapping: RoutePath[] = [
  {
    component: () => import(/* webpackChunkName: "create-flow" */ 'views/CreateFlow'),
    path: ROUTES.CREATE,
  },
  {
    component: () => import(/* webpackChunkName: "edit-flow" */ 'views/EditFlow'),
    path: ROUTES.EDIT(),
  },
  {
    component: () => import(/* webpackChunkName: "list-flows" */ 'views/FlowsListing'),
    path: ROUTES.LIST,
  },
]

export default privateMapping;
