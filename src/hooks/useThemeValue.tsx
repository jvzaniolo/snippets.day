import useTheme from './useTheme'

const useThemeValue = (light: unknown, dark: unknown) => {
  const { theme } = useTheme()

  return theme === 'light' ? light : dark
}

export default useThemeValue
