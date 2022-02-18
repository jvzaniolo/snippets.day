import * as React from 'react'
import type { NextPage } from 'next'
import { Box, useColorModeValue } from '@chakra-ui/react'
import LoginComponent from '../components/Login'
import Container from '../components/Container'

const Login: NextPage = () => {
  const bgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box>
      <Container p="6" mt="6" rounded="lg" bgColor={bgColor} maxW="container.sm">
        <LoginComponent />
      </Container>
    </Box>
  )
}

export default Login
