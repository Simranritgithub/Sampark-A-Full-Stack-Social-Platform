"use client"
import { createContext, ReactNode, useState } from "react"
type ThemeContextType = {
  theme: string
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {}
})

export function ThemeProvider({ children }:{children:ReactNode}) {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light"
  setTheme(newTheme)

  if (newTheme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}