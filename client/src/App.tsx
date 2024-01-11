import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Home from "./components/Home"
import Signup from "./pages/Auth/Signup"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/home" element={< Home />}/>
          <Route path="/signup" element={< Signup />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
