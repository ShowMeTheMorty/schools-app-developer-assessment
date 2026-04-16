import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, Space, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useCreateSchoolMutation } from 'api/schools.queries';
import React from 'react';
import { z } from 'zod';
import { isNormalizedApiError } from 'api/queryClient';

interface CreateSchoolFormProps {
  onClose: () => void;
}

const optionalEmailSchema = z.string().refine(
  (value) => value === '' || z.string().email().safeParse(value).success,
  'Please enter a valid email'
);

const createSchoolSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(512, 'Title must be at most 512 characters'),
  address: z.string(),
  contactEmail: optionalEmailSchema,
  contactPhone: z.string(),
  note: z.string(),
});

type CreateSchoolFormValues = z.infer<typeof createSchoolSchema>;

const CreateSchoolForm = ({ onClose }: CreateSchoolFormProps) => {
  const createSchoolMutation = useCreateSchoolMutation();

  const form = useForm<CreateSchoolFormValues>({
    initialValues: {
      title: '',
      address: '',
      contactEmail: '',
      contactPhone: '',
      note: '',
    },
    validate: zod4Resolver(createSchoolSchema),
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await createSchoolMutation.mutateAsync(values);

      notifications.show({
        title: 'School created',
        message: 'The new school has been added successfully.',
        color: 'green',
      });

      onClose();
    } catch (error) {
      notifications.show({
        title: 'Create failed',
        message: isNormalizedApiError(error) ? error.message : 'Could not create the school.',
        color: 'red',
      });
    }
  });

  return (
    <>
      <Title order={3}>New school details</Title>
      <Text size="sm" c="dimmed">Enter the details for the new school</Text>
      <Space h="md" />
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Title"
            withAsterisk
            placeholder="School name"
            {...form.getInputProps('title')}
          />

          <TextInput
            label="Address"
            placeholder="School address"
            {...form.getInputProps('address')}
          />

          <TextInput
            label="Contact Email"
            placeholder="contact@school.edu"
            {...form.getInputProps('contactEmail')}
          />

          <TextInput
            label="Contact Phone"
            placeholder="Phone number"
            {...form.getInputProps('contactPhone')}
          />

          <Textarea
            label="Note"
            placeholder="Additional notes"
            minRows={3}
            {...form.getInputProps('note')}
          />

          <Space h="lg" />
          <Group justify="flex-end">
            <Button variant="default" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" loading={createSchoolMutation.isPending}>
              Create
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default CreateSchoolForm;
