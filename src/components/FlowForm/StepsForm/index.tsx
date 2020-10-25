import React from 'react';

import TextField from 'components/form/TextField';
import SelectField, { Option } from 'components/form/SelectField';
import { FlowStep, StepTypes } from 'types/Flow';

export type StepFieldChangeHandler = <K extends keyof FlowStep>(key: K, value: FlowStep[K]) => void;

export interface FieldsFormProps {
  onFieldChange: StepFieldChangeHandler;
  step: FlowStep;
}

const StepsForm: React.FC<FieldsFormProps> = (props) => {
  const labelChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onFieldChange('label', event.currentTarget.value);
  };

  const typeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    props.onFieldChange('type', event.currentTarget.value as StepTypes);
  };

  const requiredChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onFieldChange('required', event.currentTarget.checked);
  };

  return (
    <div>
      <SelectField
        id={`step-${props.step.order}-type`}
        label="Tipo"
        value={props.step.type}
        onChange={typeChangeHandler}
      >
        <Option label="Boas vindas" value="welcome"/>
        <Option label="Data" value="date"/>
        <Option label="E-mail" value="email"/>
        <Option label="Múltipla escolha" value="multiple-choice"/>
        <Option label="Sim/Não" value="boolean"/>
        <Option label="Telefone" value="phone-number"/>
        <Option label="Text longo" value="long-text"/>
        <Option label="Texto curto" value="short-text"/>
        <Option label="Agradecimento" value="thank-you"/>
      </SelectField>

      <TextField
        id={`step-${props.step.order}-label`}
        label="Legenda"
        value={props.step.label}
        onChange={labelChangeHandler}
      />

      <input
        id={`step-${props.step.order}-required`}
        type="checkbox"
        checked={props.step.required}
        onChange={requiredChangeHandler}
      />
    </div>
  );
};

export default StepsForm;
