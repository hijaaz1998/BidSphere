import { useEffect } from 'react'
import LoginForm from '../../components/user/Auth/LoginForm'
import { useNavigate } from 'react-router-dom'


function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("userData")){
      navigate('/home')
    }
  })

  return (
    <LoginForm />
  )
}

export default Login