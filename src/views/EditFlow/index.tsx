import { useQuery, gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Alert from 'components/Alert';
import FlowForm, { FieldChangeHandler } from 'components/FlowForm';
import Loader from 'components/Loader';
import FlowDescriptor from 'types/Flow';

const FLOWS_DETAIL_QUERY = gql`
  query FindFlow($id: String!) {
    flow(id: $id) {
      id
      description
      steps {
        type
        label
        required
        order
        min
        max
      }
    }
  }
`;

const FLOW_UPDATE_MUTATOR = gql`
  mutation UpdateFlow($id: String!, $flow: FlowInputType!) {
    flow(id: $id, flow: $flow) {
      success
      message
    }
  }
`;

const EditForm = () => {
  const [flowDescriptor, setFlowDescriptor] = useState<FlowDescriptor | undefined>(undefined);

  const { id: flowId } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery<{ flow: FlowDescriptor }>(FLOWS_DETAIL_QUERY, {
    variables: {
      id: flowId,
    },
  });

  const [updateFlowMutator, mutatorStatus] = useMutation(FLOW_UPDATE_MUTATOR);

  useEffect(() => {
    if (data?.flow) {
      setFlowDescriptor(data.flow);
    }
  }, [data]);

  const fieldChangeHandler: FieldChangeHandler = (key, value) => {
    setFlowDescriptor({ ...flowDescriptor!, [key]: value });
  }

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateFlowMutator({
      variables: {
        id: data?.flow.id,
        flow: flowDescriptor,
      },
    });
  };

  return (
    <div>
      {loading && <Loader/>}

      {error &&
        <Alert status="error">
          {error.message || String(error)}
        </Alert>
      }

      {data?.flow &&
        <FlowForm
          {...data.flow}
          onFieldChange={fieldChangeHandler}
          onSubmit={formSubmitHandler}
          loading={mutatorStatus.loading}
        >
          {(mutatorStatus.data?.message || mutatorStatus.error) &&
            <Alert status="error">
              {mutatorStatus.data?.message || String(mutatorStatus.error)}
            </Alert>
          }
        </FlowForm>
      }
    </div>
  );
};

export default EditForm;
