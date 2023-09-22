import React from 'react'
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'


const App = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router> 
    </div>
  )
}

export default App