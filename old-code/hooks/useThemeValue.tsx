import * as React from 'react'
import useTheme from './useTheme'

const useThemeValue = (light: React.ReactNode, dark: React.ReactNode) => {
  const { theme } = useTheme()

  return theme === 'light' ? light : dark
}

export default useThemeValue
