import * as React from 'react'
import type { NextPage } from 'next'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from '@chakra-ui/react'
import Container from '../components/Container'
import supabase from '../lib/supabase'

const SignUp: NextPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const bgColor = useColorModeValue('white', 'gray.800')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await supabase.auth.signUp({ email, password })
  }

  async function signInWithGithub() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'github',
    })
  }

  return (
    <Box>
      <Container p="6" mt="6" rounded="lg" bgColor={bgColor} maxW="container.sm" flexDir={'column'}>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}
        >
          <Heading>Create your account here</Heading>

          <FormControl mt="6">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Confirm password</FormLabel>
            <Input
              id="confirm-password"
              type="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Button mt="6" type="submit" w="full">
            Login
          </Button>
        </form>

        <Divider my="6" />

        <Button onClick={signInWithGithub} type="button">
          Github
        </Button>
      </Container>
    </Box>
  )
}

export default SignUp
