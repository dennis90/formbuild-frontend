import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

import Alert from 'components/Alert';
import FlowForm, { FieldChangeHandler } from 'components/FlowForm';
import FlowDescriptor from 'types/Flow';

const CREATE_FLOW_MUTATOR = gql`
  mutation CreateFlow($flow: FlowInputType!) {
    flow(flow: $flow) {
      success
      message
    }
  }
`;

const CreateFlow = () => {
  const [createFlowMutator, { data, error, loading }] = useMutation(CREATE_FLOW_MUTATOR);

  const [flowDescriptor, setFlowDescriptor] = useState<Omit<FlowDescriptor, 'id'>>({
    description: '',
    steps: [{
      type: 'welcome',
      label: 'Seja bem vindo ao meu Formulário',
      order: 0,
      required: false,
    }],
  });

  const fieldChangeHandler: FieldChangeHandler = (key, value) => {
    setFlowDescriptor({ ...flowDescriptor!, [key]: value });
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createFlowMutator({
      variables: {
        flow: flowDescriptor,
      },
    });
  }

  return (
    <div>
      <FlowForm
        {...flowDescriptor}
        onFieldChange={fieldChangeHandler}
        onSubmit={formSubmitHandler}
      >
        {(data?.message || error) &&
          <Alert status="error">
            {data?.message || String(error)}
          </Alert>
        }
      </FlowForm>
    </div>
  );
};

export default CreateFlow;
