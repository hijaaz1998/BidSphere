import { useState } from 'react'
import UserMgt from '../../components/user/AdminComponents/UserMgt/UserMgt'
import AdminNavbar from '../../components/user/Header/AdminNavbar'
import AdminSidebar from '../../components/user/Sidebar/AdminSidebar'
import Auctions from '../../components/user/AdminComponents/Auction/Auctions'
import PostsMgt from '../../components/user/AdminComponents/PostsManagement/PostsMgt'
import Reports from '../../components/user/AdminComponents/Reports/Reports'
import Income from '../../components/user/AdminComponents/Income/Income'
// import Dashboard from '../../components/user/AdminComponents/Dashboard/Dashboard'

const AdminHome: React.FC = () => {

  const [selectedComponent, setSelectedComponent] = useState<string>('users')

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      // case 'dashboard':
      //   return <Dashboard />;
      case 'users':
        return <UserMgt />;
      case 'auctions':
        return <Auctions />;
      case 'income':
        return <Income />;
      case 'posts':
        return <PostsMgt />;
      case 'reports':
        return <Reports />;
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
        <div className="flex flex-col w-full">
            <AdminSidebar onButtonClick = {handleButtonClick} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            {renderSelectedComponent()}
            </main>
        </div>
    </div>

  )
}

export default AdminHome


