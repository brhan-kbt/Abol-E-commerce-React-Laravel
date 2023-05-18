import { Route, Router, Routes } from 'react-router-dom'
import Dashboard from './admin/Dashboard'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Layout from './Layout/Layout'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'

function App() {
 
  return (
    <>
	<body className='bg-gray-50'>
		{/* <Navbar/> */}
		<Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
			<Route element={<Layout />}>
                <Route path='/dashboard' element={<Dashboard />} />
			</Route>
		</Routes>
		{/* <Footer/> */}
	</body>

	</>
  )
}

export default App
