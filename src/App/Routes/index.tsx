import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import SessionContext from '../Providers/SessionProvider/context';

import privateRoutes from 'routes/mappings/private';
import publicRoutes from 'routes/mappings/public';
import RouteRenderer from 'routes/RouteRenderer';

const Routes: React.FC = () => {
  const sessionCtx = useContext(SessionContext);

  const routes = sessionCtx.user
    ? privateRoutes
    : publicRoutes;

  return (
    <Switch>
      {routes.map(({ component, path }) => {
        const routeComponent = React.lazy(component);
        return (
          <Route key={path} path={path} exact={true}>
            <RouteRenderer RenderedComponent={routeComponent}/>
          </Route>
        );
      })}
    </Switch>
  );
};

export default Routes;
