import { Button, Group, Modal, Text } from '@mantine/core';
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
      title="Delete school"
      centered
    >
      <Text>Are you sure you want to delete this school?</Text>
      <Text size="sm" c="dimmed" mt="xs">This action cannot be undone.</Text>
      <Group justify="flex-end" mt="xl">
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