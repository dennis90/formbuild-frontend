import sortBy from 'lodash/sortBy';
import React from 'react';

import TextField from 'components/form/TextField';
import PrimaryButton from 'components/PrimaryButton';
import Flow from 'types/Flow';

import StepsForm, { StepFieldChangeHandler } from './StepsForm';

export type FormFields = Omit<Flow, 'id'>;

export type FieldChangeHandler = <K extends keyof FormFields>(key: K, value: FormFields[K]) => void;

export interface FlowFormProps extends FormFields, React.HTMLAttributes<HTMLFormElement> {
  onFieldChange: FieldChangeHandler;
  loading?: boolean;
}

const FlowForm: React.FC<FlowFormProps> = (props) => {
  const { description, steps, onFieldChange, loading = false, ...formProps } = props;

  let orderedSteps = sortBy(steps, 'order');

  const descriptionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onFieldChange('description', event.currentTarget.value);
  };

  const stepFieldChangHandler = (index: number): StepFieldChangeHandler => (key, value): void => {
    const stepsList = [...steps];
    stepsList[index][key] = value;
    onFieldChange('steps', stepsList);
  };

  return (
    <form {...formProps}>
      <TextField
        id="description-field"
        label="Descrição"
        value={description}
        onChange={descriptionChangeHandler}
      />

      {orderedSteps.map((step, index) => (
        <StepsForm
          step={step}
          key={index}
          onFieldChange={stepFieldChangHandler(index)}
        />
      ))}

      {props.children}

      <PrimaryButton type="submit" loading={loading}>
        Salvar
      </PrimaryButton>
    </form>
  );
};

export default FlowForm;
