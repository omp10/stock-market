import './App.css'
import Navbar from './components/Navbar.jsx'
import AuthForm from './components/AuthForm.jsx'
import Watchlist from './components/Watchlist.jsx'
import Home from './components/Home.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './state/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  const { token } = useAuth()

  return (
    <div className="min-h-screen">
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/signup" element={<AuthForm mode="signup" />} />
        <Route
          path="/watchlist"
          element={token ? <Watchlist /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  )
}

export default App
