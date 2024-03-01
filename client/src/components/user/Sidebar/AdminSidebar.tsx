import React from 'react'

interface SidebarProps {
  onButtonClick: (component: string) => void
}

const AdminSidebar: React.FC<SidebarProps> = ({onButtonClick}) => {
  return (
    <div className='flex fixed top-20 bg-gray-800 h-full w-1/5'>
      <div className='text-center bg-gray-800 w-full mx-10'>
        <span onClick={() => onButtonClick('users')} className="bg-white w-full my-8 h-10 rounded-xl flex justify-center items-center hover:cursor-pointer">
            Users
        </span>
        <span onClick={() => onButtonClick('auctions')}  className=" bg-white w-full my-8 h-10 rounded-xl flex justify-center items-center hover:cursor-pointer">
            Auctions
        </span>
        <span onClick={() => onButtonClick('posts')}  className=" bg-white w-full my-8 h-10 rounded-xl flex justify-center items-center hover:cursor-pointer">
            Posts
        </span>
        <span onClick={() => onButtonClick('reports')}  className=" bg-white w-full my-8 h-10 rounded-xl flex justify-center items-center hover:cursor-pointer">
            Reports
        </span>
        <span onClick={() => onButtonClick('income')}  className=" bg-white w-full my-8 h-10 rounded-xl flex justify-center items-center hover:cursor-pointer">
            Income
        </span>
        {/* <a href="" className=' bg-white w-full my-8 h-10 rounded-xl flex justify-center items-center hover:cursor-pointer'>
          <p>Users</p>
        </a>
        <a href="" className=' bg-white w-full my-8  h-10 rounded-xl flex justify-center items-center hover:cursor-pointer'>
          <p>Users</p>
        </a>
        <a href="" className=' bg-white w-full my-8 h-10 rounded-xl flex justify-center items-center hover:cursor-pointer'>
          <p>Users</p>
        </a>
        <a href="" className=' bg-white w-full my-8  h-10 rounded-xl flex justify-center items-center hover:cursor-pointer'>
          <p>Users</p>
        </a>
        <a href="" className=' bg-white w-full my-8  h-10 rounded-xl flex justify-center items-center hover:cursor-pointer'>
          <p>Users</p>
        </a> */}
      </div>
    </div>
  )
}

export default AdminSidebar