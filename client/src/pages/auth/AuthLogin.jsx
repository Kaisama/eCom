import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import Form from '../../components/common/Form'
import { loginFormControls } from '@/config'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/auth_slice'
import { useToast } from '@/hooks/use-toast'
const initialState={
  email:'',
  password:''
}

const AuthLogin = () => {
  const[formData,setFormData]=useState(initialState)
  const dispatch = useDispatch();
  const {toast} = useToast();

  const onSubmit=(e)=>{
    e.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{
      console.log("Login user data",data);
      if(data?.payload?.success){
        toast({
          title:'Success',
          description:data.payload.message,
          variant:'default'
        })
      }
      else{
        toast({
          title:'Error',
          description:data.payload.message,
          variant:'destructive'
        })
      }
    })
    console.log('Form submitted')
  }




  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
            Sign in to your account
        </h1>
        <p> Create new account
        <Link to='/auth/register' className='font-medium ml-2 text-primary hover:underline'>Register</Link>
        </p>
      </div>
      <Form
      formControls={loginFormControls}
      buttonText={'Login'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}



export default AuthLogin