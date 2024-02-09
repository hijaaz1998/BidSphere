import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AdminPrivateRoutes, PrivateRoutes } from "./components/user/Auth/ProtectedRoute"
import Login from "./pages/Auth/Login"
import Home from "./pages/Home/Home"
import Signup from "./pages/Auth/Signup"
import AdminLogin from "./pages/Auth/AdminLogin"
import AdminHome from "./pages/Home/AdminHome"
import HomeMyPosts from "./pages/MyPosts/MyPost"
import { ToastContainer } from "react-toastify"
import PostDetails from "./pages/PostDetails/PostDetails"
import Auction from "./pages/Auction/Auction"
import AuctionDetails from "./pages/Auction/AuctionDetailsPage"
import ForgotPassword from "./pages/Auth/ForgotPassword"
import Profile from "./pages/Profile/Profile"

function App() {

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/signup" element={< Signup />}/>
          <Route path="/forgot-password" element={< ForgotPassword />}/>

          <Route element ={< PrivateRoutes />} > 
            <Route path="/home" element={< Home />}/>
            <Route path="/postDetails/:postId" element={< PostDetails />}/>
            <Route path="/auctions" element={< Auction />}/>
            <Route path="/auctions/details/:auctionId" element={< AuctionDetails />}/>
            <Route path="/profile/:userId" element = { <Profile /> }/>
          </Route>

          <Route element = { <AdminPrivateRoutes />}> 
            <Route path="/admin/dashboard" element={< AdminHome />}/>
          </Route>

          <Route path="/admin" element={< AdminLogin />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
