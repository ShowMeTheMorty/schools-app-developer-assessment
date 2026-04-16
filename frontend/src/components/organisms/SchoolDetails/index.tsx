import { zod4Resolver } from 'mantine-form-zod-resolver';
import { 
  Button, 
  Checkbox, 
  Group, 
  Space, 
  Stack, 
  Text, 
  TextInput, 
  Textarea, 
  Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { isNormalizedApiError } from 'api/queryClient';
import { useUpdateSchoolMutation, useDeleteSchoolMutation } from 'api/schools.queries';
import { School } from 'api/types';
import { z } from 'zod';
import DeleteModal from '../DeleteModal';
import { useEffect, useState } from 'react';


interface SchoolDetailsFormProps {
  school: School;
  onClose: () => void;
}

const optionalEmailSchema = z.string().refine(
  (value) => value === '' || z.string().email().safeParse(value).success,
  'Please enter a valid email'
);

const updateSchoolSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(512, 'Title must be at most 512 characters'),
  address: z.string(),
  contactEmail: optionalEmailSchema,
  contactPhone: z.string(),
  note: z.string(),
  completed: z.boolean(),
});

type UpdateSchoolFormValues = z.infer<typeof updateSchoolSchema>;

const SchoolDetails = ({ school, onClose }: SchoolDetailsFormProps) => {
  const updateSchoolMutation = useUpdateSchoolMutation();
  const deleteSchoolMutation = useDeleteSchoolMutation();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const form = useForm<UpdateSchoolFormValues>({
    initialValues: {
      title: school.title,
      address: school.address,
      contactEmail: school.contactEmail,
      contactPhone: school.contactPhone,
      note: school.note,
      completed: school.completed,
    },
    validate: zod4Resolver(updateSchoolSchema),
  });

  useEffect(() => {
    form.setValues({
      title: school.title,
      address: school.address,
      contactEmail: school.contactEmail,
      contactPhone: school.contactPhone,
      note: school.note,
      completed: school.completed,
    });
  }, [school]);

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await updateSchoolMutation.mutateAsync({
        id: school.id,
        body: {
          title: values.title,
          completed: values.completed,
          address: values.address,
          contactEmail: values.contactEmail,
          contactPhone: values.contactPhone,
          note: values.note,
        },
      });

      notifications.show({
        title: 'School updated',
        message: 'The school details were saved successfully.',
        color: 'green',
      });

      onClose();
    } catch (error) {
      notifications.show({
        title: 'Save failed',
        message: isNormalizedApiError(error) ? error.message : 'Could not update the school.',
        color: 'red',
      });
    }
  });

  const handleSubmitDelete = async () => {
    try {
      await deleteSchoolMutation.mutateAsync(school.id);

      notifications.show({
        title: 'School deleted',
        message: 'The school was deleted successfully.',
        color: 'green',
      });

      onClose();
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: isNormalizedApiError(error) ? error.message : 'Could not delete the school.',
        color: 'red',
      });
    }
  };

  return (
    <>
      <Title order={3}>School details</Title>
      <Text size="sm" c="dimmed">View or change the details of the school</Text>
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
            placeholder="email@example.com"
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

          <Checkbox
            label="Completed"
            {...form.getInputProps('completed', { type: 'checkbox' })}
          />

          <Space h="lg" />
          <Group justify="space-between">
            <Button 
              c="red" 
              variant="outline"
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete
            </Button>

            <Group>
              <Button variant="default" onClick={onClose} type="button">
                Close
              </Button>
              <Button type="submit" loading={updateSchoolMutation.isPending}>
                Save
              </Button>
            </Group>
          </Group>
        </Stack>
      </form>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleSubmitDelete}
        onClose={() => setDeleteModalOpen(false)}
      />

    </>
  );
};

export default SchoolDetails;