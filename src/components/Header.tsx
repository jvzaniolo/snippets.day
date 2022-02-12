import * as React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Header = () => {
  const { colorMode, toggleColorMode } = useTheme()

  return (
    <header>
      <h1>Dev Post</h1>

      <select
        id="toggle-theme"
        name="toggle-theme"
        value={colorMode}
        onChange={e => toggleColorMode(e.target.value as 'dark' | 'light')}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </header>
  )
}

export default Header
