import { Container, Text, Title } from '@mantine/core';

const WelcomePage = (): JSX.Element => {
  return (
    <Container>
      <Title order={2}>Welcome to the SchoolsDocs School Dash, Assessor!</Title>
      <Text c="dimmed">You are the 1st assessor to log in today.</Text>
    </Container>
  );
}

export default WelcomePage;
