import { ChartNoAxesCombined, FlipHorizontal, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';


 const adminSideBarMenuItems= [
  {
      id:'dashboard',
      label:'Dashboard',
      path:'/admin/dashboard',
      icons: <LayoutDashboard/>
  },
  {
      id:'products',
      label:'Products',
      path:'/admin/products',
      icons:<ShoppingBasket/>
  },
  {
      id:'orders',
      label:'Orders',
      path:'/admin/orders',
      icons:<FlipHorizontal />

  }
]


function MenuItems ({setOpen}){
  const navigate =useNavigate();

  return(
<nav className='mt-8 flex-col flex gap-2' >
      {
        adminSideBarMenuItems.map((menuItems)=><div key={menuItems.id}
         onClick={()=>{
          navigate(menuItems.path);
          setOpen(false);
         }}
          className='flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-xl text-muted-foreground hover:bg-muted hover:text-foreground '>
          {menuItems.icons}
          <span>{menuItems.label}</span>

        </div>)
      }
  </nav>
  ) 
}


const Sidebar = ({open,setOpen}) => {
  const navigate =useNavigate();



  return (
    <Fragment>
      {/* mobile view */}
        <Sheet open={open} onOpenChange={setOpen}>
    <SheetContent side='left' className='w-64'>
      <div className='flex flex-col h-full'>
        <SheetHeader className='border-b'>
            <SheetTitle className='flex items-center gap-2'>
             <ChartNoAxesCombined size={30}/>
              Admin Panel
            </SheetTitle>
        </SheetHeader>
        <MenuItems setOpen={setOpen}/>
      </div>
    </SheetContent>
  </Sheet>

{/* desktop view */}
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div 
        onClick={()=> navigate('/admin/dashboard')}
        className='flex cursor-pointer items-center gap-2'>
          <ChartNoAxesCombined size={30}/>
            <h1 className='text-2xl font-extrabold '>Admin Panel</h1>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>  )
}

export default Sidebar