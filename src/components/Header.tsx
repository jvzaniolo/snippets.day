import * as React from 'react'
import { Box, Flex, Heading, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const Header = () => {
  const { toggleColorMode } = useColorMode()
  const ToggleIcon = useColorModeValue(SunIcon, MoonIcon)
  const bgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box as="header" bgColor={bgColor} px="3" py="2">
      <Flex justify="space-between" maxW="container.lg" mx="auto">
        <Heading size="lg">🚀 Dev Blog</Heading>

        <IconButton type="button" onClick={toggleColorMode} aria-label="Toggle theme" variant="ghost">
          <ToggleIcon />
        </IconButton>
      </Flex>
    </Box>
  )
}

export default Header
