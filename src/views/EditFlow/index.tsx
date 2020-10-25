import { useQuery, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Alert from 'components/Alert';
import FlowDescriptor from 'types/Flow';
import Loader from 'components/Loader';

const FLOWS_DETAIL_QUERY = gql`
  query FindFlow($id: String!) {
    flow(id: $id) {
      id
      description
      fields {
        label
        type
      }
    }
  }
`;

const EditForm = () => {
  const [formState, setFormState] = useState<FlowDescriptor | undefined>(undefined);

  const { id: flowId } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery<{ flow: FlowDescriptor }>(FLOWS_DETAIL_QUERY, {
    variables: {
      id: flowId,
    },
  });

  return (
    <div>
      {loading &&
        <Loader/>
      }

      {error &&
        <Alert status="error">
          {error.message || String(error)}
        </Alert>
      }

      {data?.flow &&
        <div>
          {data.flow.description}
          {data.flow.fields.map((field) => (
            <div key={field.order}>
              <code>
                {field.type}
                <br/>
                {field.label}
              </code>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default EditForm;
