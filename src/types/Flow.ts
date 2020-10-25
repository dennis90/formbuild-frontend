export type FieldTypes = (
  'date' | 'thank-you' | 'welcome' | 'multiple-choice' | 'phone-number' |
  'short-text' | 'long-text' | 'boolean' | 'email'
);

export interface FlowField {
  type: FieldTypes;
  label: string;
  required: boolean;
  order: number;
  min?: number;
  max?: number;
}

export interface FlowDescriptor {
  fields: FlowField[];
  description: string;
  id: string;
}

export default FlowDescriptor;
