import UserMgt from '../../components/user/AdminComponents/UserMgt/UserMgt'
import AdminNavbar from '../../components/user/Header/AdminNavbar'
import AdminSidebar from '../../components/user/Sidebar/AdminSidebar'

const AdminHome = () => {
  return (
    <div className='flex h-screen '>
        <AdminNavbar />
        <div className="flex flex-col flex-1 w-full">
            <AdminSidebar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <UserMgt />
            </main>
        </div>
    </div>

  )
}

export default AdminHome


