import { useNavigate } from 'react-router-dom'
import AdminLoginForm from '../../components/user/Auth/AdminLoginForm'
import { useEffect } from 'react'

function AdminLogin() {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('adminToken')){
      navigate('/admin/dashboard')
    }
  })

  return (
    <AdminLoginForm />
  )
}

export default AdminLogin