import * as React from 'react'
import Link from 'next/link'
import { Box, Button, Flex, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import Container from './Container'

const Header = () => {
  const { toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'gray.800')
  const ToggleIcon = useColorModeValue(SunIcon, MoonIcon)

  return (
    <Box as="header" bgColor={bgColor} px="3" py="2">
      <Container justify="space-between">
        <Link href="/" passHref>
          <Button as="a" variant="unstyled" fontSize="xl" display={'flex'}>
            🚀 Dev Blog
          </Button>
        </Link>

        <Flex as="nav">
          <IconButton type="button" onClick={toggleColorMode} aria-label="Toggle theme" variant="ghost">
            <ToggleIcon />
          </IconButton>

          <Link href="/" passHref>
            <Button as="a" variant="ghost">
              Login
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button as="a" ml="2" colorScheme="blue">
              Create Account
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
