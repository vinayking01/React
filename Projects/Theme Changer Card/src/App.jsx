import { useEffect, useState } from 'react'
import './App.css'
import ThemeBtn from './component/ThemeBtn'
import ThemeCard from './component/ThemeCard'
import { MyThemeProvider } from './component/UseContext'


function App() {
  const [themeMode, SetTheme] = useState("light");
  
  function darkTheme()
  {
    SetTheme("dark")
  }

  function lightTheme()
  {
    SetTheme("light")
  }

    // actual change in theme

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])
  

  return (
    <>
    <MyThemeProvider value={{themeMode, darkTheme ,lightTheme}}>
    <ThemeBtn />
    <ThemeCard/>
    </MyThemeProvider>
     
    </>
  )
}

export default App
