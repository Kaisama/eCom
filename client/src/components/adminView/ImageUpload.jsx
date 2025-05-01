import React, { useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';

const ImageUpload = ({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl}) => {

    const inputRef = useRef(null);

    const handleImageFileChange =(e)=>{
        const selectedFile = e.target.files?.[0];

        if(selectedFile) setImageFile(selectedFile);
    } 

    const handleDragOver =(e)=>{
        e.preventDefault();
    }

    const handleDrop =(e)=>{
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
       if(droppedFiles) setImageFile(droppedFiles);
    }

    const handleRemoveImageFile =()=>{
        setImageFile(null);
        if(inputRef.current) {
            inputRef.current.value = null;
        }
    }

  return (
    <div className='w-full max-w-md mx-auto mt-4'>
        <Label className='text-lg font-semibold mb-2 block'> Upload Image</Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4 '>
            <Input id='image-upload'
             className='hidden' 
             type='file'
             ref={inputRef} onChange={handleImageFileChange}/>

             {
                !imageFile ? 
                    <Label htmlFor='image-upload'
                    className='flex flex-col items-center justify-center cursor-pointer h-32 '
                    >
                        <UploadCloudIcon  className='w-10 h-10 text-muted-foreground mb-2'/>
                        <span>Drag and drop or click to upload a image</span>
                    </Label>
                  : (
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <FileIcon className='w-8 text-primary mr-2 h-8'/>
                        </div>
                        <p className='text-sm font-medium'>{imageFile.name}</p>
                        <Button variant='ghost' 
                        size='icon'
                         className='text-muted-foreground hover:text-foreground'
                         onClick={handleRemoveImageFile}
                         >
                            <XIcon className='w-4 h-4'/>
                            <span className='sr-only'>Remove</span>
                        </Button>
                    </div>
                )
             }
        </div>
    </div>
  )
}

export default ImageUpload

