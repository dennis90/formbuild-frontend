import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

import Alert from 'components/Alert';
import PrimaryButton from 'components/PrimaryButton';
import TextField from 'components/form/TextField';
import FieldsForm, { FieldChangeHandler } from './FieldsForm';
import { FlowField } from 'types/Flow';

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

  const [flowDescription, setFlowDescription] = useState<string>('');
  const [fields, setFields] = useState<FlowField[]>([{
    type: 'welcome',
    label: 'Seja bem vindo ao meu Formulário',
    order: 0,
    required: false,
  }]);

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFlowDescription(event.currentTarget.value);
  };

  const fieldChangeHandler = (index: number): FieldChangeHandler => (key, value): void => {
    const listClone = [...fields];
    listClone[index][key] = value;
    setFields(listClone);
  };

  const flowSaveHandler = () => {
    createFlowMutator({
      variables: {
        flow: {
          description: flowDescription,
          fields,
        }
      }
    })
  }

  return (
    <div>
      <TextField
        id="description"
        label="Descrição"
        onChange={nameChangeHandler}
        value={flowDescription}
      />
      <div>
        {fields.map((field, index) => (
          <FieldsForm
            onFieldChange={fieldChangeHandler(index)}
            field={field}
            key={field.order}
          />
        ))}
      </div>

      {(data?.message || error) &&
        <Alert status="error">
          {data?.message || String(error)}
        </Alert>
      }

      <PrimaryButton
        onClick={flowSaveHandler}
        loading={loading}
      >
        Salvar Fluxo
      </PrimaryButton>
    </div>
  );
};

export default CreateFlow;
