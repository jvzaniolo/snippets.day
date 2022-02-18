import { Flex, type FlexProps } from '@chakra-ui/react'

const Container = (props: FlexProps) => {
  return (
    <Flex maxW="container.lg" mx="auto" px="4" {...props}>
      {props.children}
    </Flex>
  )
}

export default Container
