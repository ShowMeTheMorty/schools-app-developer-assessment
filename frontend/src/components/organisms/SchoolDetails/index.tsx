import { Text } from '@mantine/core';
import { School } from 'api/types';
import React from 'react';


interface SchoolDetailsFormProps {
  school: School;
  onClose: () => void;
}

const SchoolDetails = ({ school, onClose }: SchoolDetailsFormProps): JSX.Element => {
  return (
    <Text>School Details</Text>
  )
}

export default SchoolDetails;