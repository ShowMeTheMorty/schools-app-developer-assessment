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
import { useUpdateSchoolMutation } from 'api/schools.queries';
import { School } from 'api/types';
import { z } from 'zod';


interface SchoolDetailsFormProps {
  school: School;
  onClose: () => void;
}

const updateSchoolSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(512, 'Title must be at most 512 characters'),
  address: z.string(),
  contactEmail: z.string().email('Please enter a valid email').or(z.literal('')),
  contactPhone: z.string(),
  note: z.string(),
  completed: z.boolean(),
});

type UpdateSchoolFormValues = z.infer<typeof updateSchoolSchema>;

const SchoolDetails = ({ school, onClose }: SchoolDetailsFormProps) => {
  const updateSchoolMutation = useUpdateSchoolMutation();

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

  const handleSubmit = form.onSubmit(async (values) => {
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

    onClose();
  });

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

          <Group justify="flex-end">
            <Button variant="default" onClick={onClose} type="button">
              Close
            </Button>
            <Button type="submit" loading={updateSchoolMutation.isPending}>
              Save
            </Button>
          </Group>
        </Stack>
      </form>

    </>
  );
};

export default SchoolDetails;