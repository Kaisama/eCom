import ImageUpload from '@/components/adminView/ImageUpload'
import ProductTiles from '@/components/adminView/ProductTiles'
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/Products'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
const {toast}=useToast();
const {products}=useSelector((state)=>state.adminProducts);
const [currentEditId,setCurrentEditId]=useState(null);

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])

  console.log("uploadedImageUrl",uploadedImageUrl);
  const onSubmit =(e)=>{
      e.preventDefault();

      console.log('form data to edit', formData);
console.log('current id to edit: ',currentEditId);
      currentEditId !== null ?
      dispatch(editProduct({
          id:currentEditId ,formData: {
            ...formData,
            image: uploadedImageUrl || formData.image
          },
      })).then((data)=>{

        console.log(data, "edit");

        if(data?.payload?.success){
          dispatch(fetchAllProducts());
          setFormData(initialState);
          setOpenCreateProduct(false);
          setCurrentEditId(null);
        }
      })
      :
      dispatch(addNewProduct({
        ...formData,
        image:uploadedImageUrl
      })).then((data)=>{
        if(data?.payload?.success){
          dispatch(fetchAllProducts());
          setOpenCreateProduct(false);
          setImageFile(null);
          setUploadedImageUrl(null);
          setFormData(initialState);
          console.log("uploadedImageUrl after",uploadedImageUrl);
          toast({
            title:'Product Added Successfully',
            description:'Product has been added successfully',
            variant:'default'
          })
        }
      })
  }

  const handleDelete=(id)=>{
    dispatch(deleteProduct(id)).then(
      data=>{
        if(data?.payload?.success){
          toast({
            title:'Product Deleted Successfully',
            description:'Product has been deleted successfully',
            variant:'default'
          })
          dispatch(fetchAllProducts());

        }
      }
    )
  }

  return (
    <Fragment>
      <div className=' mb-5 w-full flex justify-end'>
        <Button onClick={()=>setOpenCreateProduct(true)} >Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          products && products.length > 0 ? products.map((productItem) => 
            <div >
               <ProductTiles product={productItem} 
                setCurrentEditId={setCurrentEditId}
                setOpenCreateProduct={setOpenCreateProduct}
                setFormData={setFormData}
                handleDelete={handleDelete}
                />
            </div>
        ):null
        }
      </div>
        <Sheet open={openCreateProduct}
         onOpenChange={
          ()=>{setOpenCreateProduct(false)
              setCurrentEditId(null);
              setFormData(initialState);
          }
         }
         >
            <SheetContent side='right' className='overflow-auto'>
                <SheetHeader>
                    <SheetTitle>
                     {
                      currentEditId !== null ?
                      'Edit Product' :  'Add New Product'
                     }
                    </SheetTitle>
                </SheetHeader>
                <ImageUpload
                 imageFile={imageFile}
                  setImageFile={setImageFile}
                   uploadedImageUrl={uploadedImageUrl} 
                   setUploadedImageUrl={setUploadedImageUrl}
                   imageLoading = {imageLoading}
                   setImageLoading={setImageLoading}
                   
                   />
                <div className='py-6'>
                  <Form   
                  formControls={addProductFormElements}
                  formData={formData}
                  setFormData={setFormData}
                  buttonText={currentEditId !== null ? 'Edit' : 'Add'}
                  onSubmit={onSubmit}
                  />
                </div>
            </SheetContent>
        </Sheet>
    
    </Fragment>
  )
}

export default Products