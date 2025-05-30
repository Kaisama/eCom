import ShoppingHeader from '@/pages/shoppingView/ShoppingHeader'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ShoppingViewLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        
        {/* common header */}
        <ShoppingHeader/>
    
        <main className='flex flex-col w-full'>
            <Outlet/>
        </main>
    </div>
  )
}

export default ShoppingViewLayout