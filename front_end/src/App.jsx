import { Route, Router, RouterProvider, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { ContextProvider } from './contexts/ContextProvider'
import Layout from './Layout/Layout'
import router from './router'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'

function App() {
 
  return (
		<>
		<ContextProvider>
		<RouterProvider router={router}/>
		</ContextProvider>
		</>
  )
}

export default App
