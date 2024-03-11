import { useEffect } from 'react'
import LoginForm from '../../components/user/Auth/LoginForm'
import { useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';



function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("userToken")){
      navigate('/home')
    }
  })

  return (
    <>
      <GoogleOAuthProvider clientId="425142744806-js9dcb8k4u60lffids3uj3ebgjef5mrp.apps.googleusercontent.com">
        <LoginForm />
      </GoogleOAuthProvider>;
    </>
  )
}

export default Login