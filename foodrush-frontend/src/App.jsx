import { Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import HomePage from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import AddProduct from './pages/addProduct'
import Login from './pages/Login'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/deliveryOrder' element={<Contact />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/login' element={<Login />} />
      </Routes>

    </>
  )
}

export default App;
