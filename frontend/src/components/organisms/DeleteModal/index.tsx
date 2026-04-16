import { Button, Group, Modal, Space, Text, Title } from '@mantine/core';
import React from 'react';
import { JSX } from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteModal = ({ isOpen, onConfirm, onClose }: DeleteModalProps): JSX.Element => {
  return (
    <Modal 
      opened={isOpen} 
      onClose={onClose}
      centered
    >
      <Text>Are you sure you want to delete this school?</Text>
      <Text c="red">This action cannot be undone.</Text>
      <Space h="lg" />
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Delete
        </Button>
      </Group>
    </Modal>
  )
}

export default DeleteModal;