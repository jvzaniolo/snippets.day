import * as React from 'react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex as="header" justify="space-between">
      <Heading as="h1" fontSize="3xl">
        Dev Post
      </Heading>

      <IconButton
        aria-label="Toggle theme"
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
      />
    </Flex>
  )
}

export default Header
