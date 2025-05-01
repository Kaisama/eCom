import ImageUpload from '@/components/adminView/ImageUpload'
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { Fragment, useState } from 'react'

const initialState={
  image:null,
  title:'',
  description:'',
  category:'',
  brand:'',
  price:'',
  salePrice:'',
  totalStock:'',
}

const Products = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const onSubmit =()=>{

  }
  return (
    <Fragment>
      <div className=' mb-5 w-full flex justify-end'>
        <Button onClick={()=>setOpenCreateProduct(true)} >Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        <Sheet open={openCreateProduct} onOpenChange={()=>setOpenCreateProduct(false)}>
            <SheetContent side='right' className='overflow-auto'>
                <SheetHeader>
                    <SheetTitle>
                      Add New Product
                    </SheetTitle>
                </SheetHeader>
                <ImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}/>
                <div className='py-6'>
                  <Form   
                  formControls={addProductFormElements}
                  formData={formData}
                  setFormData={setFormData}
                  buttonText='Add Product'
                  onSubmit={onSubmit}
                  />
                </div>
            </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  )
}

export default Products