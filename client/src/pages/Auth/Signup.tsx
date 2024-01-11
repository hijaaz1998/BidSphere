import { useEffect } from 'react'
import RegisterForm from '../../components/user/Auth/RegisterForm'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('userData')){
            navigate('/home');
        }
    })

  return (
    <RegisterForm />
  )
}

export default Signup