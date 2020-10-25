import React from 'react';

import Loader from 'components/Loader';

export interface RouteRendererProps {
  RenderedComponent: React.LazyExoticComponent<any>;
}

const RouteRenderer: React.FC<RouteRendererProps> = ({ RenderedComponent }) => (
  <React.Suspense fallback={<Loader/>}>
    <RenderedComponent/>
  </React.Suspense>
);

export default RouteRenderer;
