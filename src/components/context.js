import React, { createContext, useState } from 'react'

// CURRENT USER CONTEXT

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
    username: ''
  })

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )

}


// DARK/LIGHT MODE THEME CONTEXT

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

  const [darkModeOn, setDarkModeOn] = useState(false)

  const setLightMode = () => setDarkModeOn(false)
  const setDarkMode = () => setDarkModeOn(true)

  return (
    <ThemeContext.Provider value={{ darkModeOn, setLightMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )

}