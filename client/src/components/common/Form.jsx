import { Label } from '@radix-ui/react-label'
import React from 'react'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const form = ({formControls,formData,setFormData,onSubmit,buttonText}) => {
    const renderInputs=(getControlItem)=>{

        const value=formData[getControlItem.name];

        let element= null;
        switch (getControlItem.componentType) {
            case 'input':
                element=( <Input value={value} 
                 name={getControlItem.name}
                  placeholder={getControlItem.placeholder}
                   id={getControlItem.name}
                    type={getControlItem.type} 
                    onChange={e=>setFormData({
                        ...formData,
                        [getControlItem.name]:e.target.value
                    })}
                    />)
                break;
          
            case 'select':
                element=(<Select onValueChange={(value)=>setFormData({
                    ...formData,
                    [getControlItem.name]:value
                })}
                 value={value}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={getControlItem.placeholder}/>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options && getControlItem.options.length>0 ?
                            getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null
                        }
                    </SelectContent>
                </Select>)
                break;
            case 'textarea':
                element=( <Textarea
                     value={value} 
                     name={getControlItem.name}
                      placeholder={getControlItem.placeholder}
                       id={getControlItem.name} 
                       onChange={e=>setFormData({
                        ...formData,
                        [getControlItem.name]:e.target.value
                    })}
                       />)
                break;
            default:
                element=( <Input
                     name={getControlItem.name}
                      placeholder={getControlItem.placeholder} 
                      id={getControlItem.name} 
                      type={getControlItem.type}
                      onChange={e=>setFormData({
                        ...formData,
                        [getControlItem.name]:e.target.value
                    })}
                    value={value}
                      />)
                break;
        }
        return element;
    }
  return (
    <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-3'>
            {
                formControls?.map((controlItem => <div className='grid w-full gap-1.5 ' key={controlItem.name}>
                    <Label className='mb-1'>{controlItem.label}</Label>
                    {
                        renderInputs(controlItem)
                    }
                </div>))
            }

        </div>
        <Button type='submit' className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
    </form>
  )
}

export default form