import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../../components/common/Form'
import { registerFormControls } from '@/config'
import { useDispatch } from 'react-redux'
import { registerUser } from '@/store/auth_slice'
import { useToast } from '@/hooks/use-toast'
const initialState={
  userName:'',
  email:'',
  password:''
}




const AuthRegister = () => {
  const { toast } = useToast();
  const[formData,setFormData]=useState(initialState)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  console.log('formdata',formData);

  const onSubmit=(e)=>{
    e.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
        console.log("Register user data",data);
        if(data?.payload.success){
          toast({
            title:'Success',
            description:data.payload.message,
            variant:'default'
          })
          navigate('/auth/login')
        } 
        else{
          toast({
            title:'Error',
            description:data.payload.message,
            variant:'destructive'
          })
        }
    });

    console.log('Form submitted')
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
            Create New Account
        </h1>
        <p> Already have a account
        <Link to='/auth/login' className='font-medium ml-2 text-primary hover:underline'>Login</Link>
        </p>
      </div>
      <Form
      formControls={registerFormControls}
      buttonText={'Sign Up'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister