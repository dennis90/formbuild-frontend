export type StepTypes = (
  'date' | 'thank-you' | 'welcome' | 'multiple-choice' | 'phone-number' |
  'short-text' | 'long-text' | 'boolean' | 'email'
);

export interface FlowStep {
  type: StepTypes;
  label: string;
  required: boolean;
  order: number;
  min?: number;
  max?: number;
}

export interface FlowDescriptor {
  id: string;
  description: string;
  steps: FlowStep[];
}

export default FlowDescriptor;
