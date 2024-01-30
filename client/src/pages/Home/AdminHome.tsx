import { useState } from 'react'
import UserMgt from '../../components/user/AdminComponents/UserMgt/UserMgt'
import AdminNavbar from '../../components/user/Header/AdminNavbar'
import AdminSidebar from '../../components/user/Sidebar/AdminSidebar'
import { useNavigate } from 'react-router-dom'
import Auctions from '../../components/user/AdminComponents/Auction/Auctions'
import PostsMgt from '../../components/user/AdminComponents/PostsManagement/PostsMgt'

const AdminHome: React.FC = () => {

  const [selectedComponent, setSelectedComponent] = useState<string>('users')
  const navigate = useNavigate();

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'users':
        return <UserMgt />;
      case 'auctions':
        return <Auctions />;
      case 'posts':
        return <PostsMgt />;
      default:
        return null;
    }
  };

  const handleButtonClick = (component: string) => {
    setSelectedComponent(component)
  }

  return (
    <div className='flex h-screen '>
        <AdminNavbar />
        <div className="flex flex-col flex-1 w-full">
            <AdminSidebar onButtonClick = {handleButtonClick} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            {renderSelectedComponent()}
            </main>
        </div>
    </div>

  )
}

export default AdminHome


