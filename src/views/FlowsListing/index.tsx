import { useQuery, gql } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';

import Alert from 'components/Alert';
import Loader from 'components/Loader';
import { EDIT as EDIT_ROUTE } from 'config/routes';
import { FlowDescriptor } from 'types/Flow';

const FLOWS_LISTING_QUERY = gql`
  query flows {
    flows {
      id
      description
      steps {
        type
      }
    }
  }
`;

export default function FormsListing() {
  const { loading, error, data } = useQuery<{ flows: FlowDescriptor[] }>(FLOWS_LISTING_QUERY);

  return (
    <div>
      <h1>Listagem de formulários</h1>

      {loading && <Loader/>}

      {error &&
        <Alert status="error">
          {String(error)}
        </Alert>
      }

      {(!loading && !error) && !data?.flows.length &&
        <div>
          Não existem fluxos para exibir :(
        </div>
      }

      {data?.flows.length &&
        data.flows.map((flow, idx) => (
          <div key={idx}>
            <Link to={EDIT_ROUTE(flow.id)}>
              {flow.description}
            </Link>
          </div>
      ))}
    </div>
  );
}
