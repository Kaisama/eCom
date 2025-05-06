import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const AdminViewLayout = () => {
  const [openSideBar,setOpenSideBar]=useState(false);
  
  return (
    <div className='flex min-h-screen w-full'>
        {/* admin sidebar */}
        <Sidebar open={openSideBar} setOpen={setOpenSideBar}/>
        <div className='flex flex-1 flex-col'>
        {/* admin header */}
            <Header setOpen={setOpenSideBar}/>
            <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminViewLayout