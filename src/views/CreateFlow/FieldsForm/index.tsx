import React, { useState } from 'react';

import TextField from 'components/form/TextField';
import SelectField, { Option } from 'components/form/SelectField';
import PrimaryButton from 'components/PrimaryButton';
import { FieldTypes, FlowField } from 'types/Flow';

export type FieldChangeHandler = <K extends keyof FlowField>(key: K, value: FlowField[K]) => void;

export interface FieldsFormProps {
  onFieldChange: FieldChangeHandler;
  field: FlowField;
}

const FieldsForm: React.FC<FieldsFormProps> = (props) => {
  const labelChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onFieldChange('label', event.currentTarget.value);
  }

  const typeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    props.onFieldChange('type', event.currentTarget.value as FieldTypes );
  }

  return (
    <div>
      <SelectField
        id="option-type"
        label="Tipo"
        value={props.field.type}
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
        id="option-label"
        label="Legenda"
        value={props.field.label}
        onChange={labelChangeHandler}
      />
    </div>
  );
};

export default FieldsForm;
