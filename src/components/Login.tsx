import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import * as React from 'react'
import supabase from '../lib/supabase'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await supabase.auth.signIn({ email, password })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}
    >
      <Heading size={'lg'} textAlign={'center'}>
        Welcome to our Dev blog!
      </Heading>

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

      <Button mt="6" type="submit" w="full">
        Login
      </Button>

      <Flex align={'center'} mt="6">
        <Divider />
        <Text mx="4">OR</Text>
        <Divider />
      </Flex>

      <Button mt="6" colorScheme={'github'}>
        Github
      </Button>
    </form>
  )
}

export default Login
