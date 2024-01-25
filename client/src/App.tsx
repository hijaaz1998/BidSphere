import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Home from "./pages/Home/Home"
import Signup from "./pages/Auth/Signup"
import AdminLogin from "./pages/Auth/AdminLogin"
import AdminHome from "./pages/Home/AdminHome"
import HomeMyPosts from "./pages/MyPosts/MyPost"
import { ToastContainer } from "react-toastify"
import PostDetails from "./pages/PostDetails/PostDetails"
import Auction from "./pages/Auction/Auction"

function App() {

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/home" element={< Home />}/>
          <Route path="/postDetails/:postId" element={< PostDetails />}/>
          <Route path="/signup" element={< Signup />}/>

          <Route path="/auctions" element={< Auction />}/>


          <Route path="/admin" element={< AdminLogin />}/>
          <Route path="/admin/dashboard" element={< AdminHome />}/>

        </Routes>
      </Router>
      
    </>
  )
}

export default App
