import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import FlowDescriptor from 'types/Flow';
import { firestore } from 'services/firebase';

export default function FormView() {
  const [formState, setFormState] = useState<FlowDescriptor | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState('');
  const [formStep, setFormStep] = useState(0);

  const { id: formId } = useParams<{ id: string }>();
  const formDoc = firestore.collection('forms').doc(formId);

  useEffect(() => {
    formDoc.get()
      .then((doc) => {
        if (doc.exists) {
          const formData: FlowDescriptor = doc.data() as FlowDescriptor;
          formData.steps = formData.steps.sort((a, b) => {
            if (a.order > b.order) {
              return 1;
            } else if (b.order > a.order) {
              return -1;
            }

            return 0;
          })
          setFormState(formData);
        } else {
          setErrorMessage('Document not found');
        }
      })
      .catch((error) => {
        setErrorMessage(String(error));
      });
  }, []);

  return (
    <div>
      {errorMessage &&
        <div>
          {errorMessage}
        </div>
      }

      {formState &&
        <StyledContainer>
          {formState.steps.map((formField, idx) =>
            <StyledFieldContainer key={idx} fieldOrder={idx} formStep={formStep}>
              {formField.label}
              {formField.type === 'short-text' &&
                <input type="text"/>
              }
            </StyledFieldContainer>
          )}
          <StyledButtonsContainer>
            {formStep > 0 && <StyledPrevButton onClick={() => setFormStep(formStep - 1)}>Back</StyledPrevButton>}
            {formStep < formState.steps.length - 1 && <StyledNextButton onClick={() => setFormStep(formStep + 1)}>Next</StyledNextButton>}
          </StyledButtonsContainer>
        </StyledContainer>
      }
    </div>
  );
};

const StyledContainer = styled.div`
  background-color: lightblue;
  width: 100vw;
  height: 100vh;
  position: relative;
  flex-direction: column;
  overflow: hidden;
`;

interface StyledFieldContainerProps {
  fieldOrder: number;
  formStep: number;
}

const StyledFieldContainer = styled.div<StyledFieldContainerProps>`
  position: absolute;
  width: 450px;
  left: calc(50% - 225px);
  margin: auto;
  top: ${({ fieldOrder, formStep }) => fieldOrder > formStep ? '100%' : fieldOrder === formStep ? '50%' : '-100%'};
  opacity: ${({ fieldOrder, formStep }) => fieldOrder === formStep ? '1' : '0'};
  height: 100%;
  display: block;
  transition: opacity 800ms ease-in-out, top 500ms ease-in-out;
`;

const StyledButtonsContainer = styled.div`
  background-color: lightblue;
  width: 100%;
  position: absolute;
  height: 40px;
  top: calc(100% - 40px);
  display: flex;
  justify-content: center;
`

const buttonStyles = css`
  padding: 10px 30px;
  background-color: transparent;
  color: navy;
  border: 1px solid navy;
  border-radius: 4px;
  width: 150px;
`;

const StyledNextButton = styled.button`
  ${buttonStyles}
  margin-left: 10px;
`;

const StyledPrevButton = styled.button`
  ${buttonStyles}
  margin-right: 10px;
`;
