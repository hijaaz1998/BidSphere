import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Home from "./pages/Home/Home"
import Signup from "./pages/Auth/Signup"
// import AddPost from "./components/user/AddPost/AddPost"
import AdminLogin from "./pages/Auth/AdminLogin"
import AdminHome from "./pages/Home/AdminHome"
import HomeMyPosts from "./pages/MyPosts/MyPost"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/home" element={< Home />}/>
          <Route path="/home/myPost" element={< HomeMyPosts />}/>
          <Route path="/signup" element={< Signup />}/>
          <Route path="/admin" element={< AdminLogin />}/>
          <Route path="/admin/dashboard" element={< AdminHome />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
