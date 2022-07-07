import Topbar from './components/topbar/Topbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Settings from './pages/settings/Settings'
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import { Routes, Route } from 'react-router-dom'

function App() {
  const currentUser = true
  // const currentUser = false
  return (
    <>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/login" element={currentUser ? <Home /> : <Login />} />
        <Route
          path="/settings"
          element={currentUser ? <Settings /> : <Login />}
        />
        <Route path="/write" element={currentUser ? <Write /> : <Login />} />
        <Route
          path="/register"
          element={currentUser ? <Home /> : <Register />}
        />
      </Routes>
    </>
  )
}

export default App
