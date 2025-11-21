import { Toaster } from 'react-hot-toast'
import './App.css'
import AppRouter from './appRouter/AppRouter'
import NavBar from './components/NavBar'

function App() {

  return (
  <>
  <NavBar />
  <AppRouter />
  <Toaster/>
    
  </>
  )
}

export default App
