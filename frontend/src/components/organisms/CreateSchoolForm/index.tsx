import { Text } from "@mantine/core";
import React from "react";


interface CreateSchoolFormProps {
  onClose: () => void;
}

const CreateSchoolForm = ({ onClose }: CreateSchoolFormProps): JSX.Element => {
  return (
    <Text>Create School Form</Text>
  );
};

export default CreateSchoolForm;
