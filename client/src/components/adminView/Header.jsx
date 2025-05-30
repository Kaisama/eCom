import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { logoutUser } from '@/store/auth_slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = ({setOpen}) => {
const dispatch=useDispatch();
const navigate=useNavigate();
  const handleLogOut=()=>{
    dispatch(logoutUser()).then(()=>{
      navigate('/auth/login')
    })
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-bottom'>
      <Button onClick={()=>{setOpen(true);
         console.log('header',setOpen(true))}} className="lg:hidden sm:block">
        <AlignJustify/>
        <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button onClick={handleLogOut} className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
          <LogOut/>
          Logout</Button>
      </div>
    </header>
  )
}

export default Header