import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Owner'];
  const roles = ['Member', 'Owner', 'Trainer', 'Receptionist'];
  const applicationName = `FitManagePro`;
  const tenantName = `Gym`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Owner:
1. As an owner, I want to create a new Gym so that I can manage my fitness center.
2. As an owner, I want to edit the Gym details so that I can keep the information up-to-date.
3. As an owner, I want to delete a Gym when it is no longer in operation.
4. As an owner, I want to invite trainers and receptionists to join the Gym so that they can manage their respective tasks.
5. As an owner, I want to remove trainers and receptionists from the Gym when they are no longer working at the fitness center.

Trainer:
1. As a trainer, I want to view the list of members in the Gym so that I can manage their training sessions.
2. As a trainer, I want to add new members to the Gym so that they can start attending training sessions.
3. As a trainer, I want to edit member details so that I can keep their information up-to-date.
4. As a trainer, I want to remove members from the Gym when they are no longer attending training sessions.

Receptionist:
1. As a receptionist, I want to view the list of members in the Gym so that I can manage their membership status.
2. As a receptionist, I want to add new members to the Gym so that they can start using the fitness center.
3. As a receptionist, I want to edit member details so that I can keep their information up-to-date.
4. As a receptionist, I want to remove members from the Gym when they are no longer using the fitness center.

Member:
1. As a member, I want to view my membership details so that I can keep track of my membership status.
2. As a member, I want to edit my personal details so that my information is up-to-date.
3. As a member, I want to view the list of available trainers in the Gym so that I can choose a trainer for my training sessions.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
