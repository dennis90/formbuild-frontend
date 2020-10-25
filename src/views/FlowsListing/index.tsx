import { useQuery, useMutation, gql } from '@apollo/client';
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

const FLOW_DELETE_MUTATOR = gql`
  mutation DeleteFlow($id: String!) {
    deleteFlow(id: $id) {
      success
      message
    }
  }

`;

const FormsListing: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<{ flows: FlowDescriptor[] }>(FLOWS_LISTING_QUERY);
  const [ deleteFlowMutator, mutationState ] = useMutation(FLOW_DELETE_MUTATOR);

  const deleteFlowClickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await deleteFlowMutator({
      variables: {
        id: event.currentTarget.dataset.flowId,
      },
    });

    await refetch();
  };

  return (
    <div>
      <h1>Listagem de formulários</h1>

      {loading && <Loader/>}

      {error &&
        <Alert status="error">
          {String(error)}id: string
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

            {!mutationState.loading &&
              <button data-flow-id={flow.id} onClick={deleteFlowClickHandler}>
                Excluir
              </button>
            }
          </div>
      ))}
    </div>
  );
};

export default FormsListing;
