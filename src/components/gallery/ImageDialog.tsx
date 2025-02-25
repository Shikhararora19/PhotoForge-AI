import { Tables } from '@datatypes.types'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import Image from 'next/image'
import {  Delete, Download, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Scrollbar } from '@radix-ui/react-scroll-area'
import DeleteImage from './DeleteImage'

interface ImageDialogProps {
    image: {url: string | null} & Tables<'generated_images'>,
    onClose: () => void
}
const ImageDialog = ({image, onClose}: ImageDialogProps) => {

    const handleDownload = () => {
        fetch(image.url || "").then(response => response.blob()).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
           a.setAttribute('download', `generated-image-${Date.now()}.${image?.output_format}`);
            document.body.appendChild(a);
            a.click();
            
            a.parentNode?.removeChild(a);

        }
        ).catch(error => console.error(error))

    }
  return (
    <Sheet open={true} onOpenChange={onClose}>
  <SheetContent className='max-w-full sm:max-w-xl w-full'>
    <SheetHeader>
      <SheetTitle className='text-2xl w-full'>Image Details</SheetTitle>
      <ScrollArea className="flex flex-col h-[100vh]">

      <div className='relative w-fit h-fit'>
        <Image src={image.url || ""} alt={image.prompt || "Generated image"} width={image.width || 0} height={image.height || 0} className='w-full h-auto flex mb-3 rounded'/>

        <div className='flex gap-4 absolute bottom-4 right-4'>
            <Button className='w-fit' onClick={handleDownload}><Download className='w-4 h-4 mr-2'/>Download</Button>
            {image.id && image.image_name && (
                <DeleteImage imageId={image.id.toString()} onDelete={onClose} className='w-fit' imageName={image.image_name}/>
            )}
        </div>  
      </div>
      <hr className='inline-block w-full border-primary/30 mb-2'/>

      <p className='tetx-primary/90 w-full flex flex-col'>
        <span className='text-primary text-xl font-semibold'>Prompt </span>
        {image.prompt}
      </p>
      
      <hr className='inline-block w-full border-primary/30 my-3'/>

      <div className='flex flex-wrap gap-3 mb-32'>
        <Badge variant={'secondary'} className='rounded-full border border-primary/30 px-4 py-2 text-sm font-normal max-w-[80%]'>
        <span className='text-primary uppercase mr-2 font-semibold'>Model ID:  </span>
        {image.model?.startsWith('shikhararora19') ? image.model.split('/')[1].split(":")[0] : image.model}
        </Badge>
        <Badge variant={'secondary'} className='rounded-full border border-primary/30 px-4 py-2 text-sm font-normal'>
        <span className='text-primary uppercase mr-2 font-semibold'>Aspect ratio:  </span>
        {image.aspect_ratio}
        </Badge>
        <Badge variant={'secondary'} className='rounded-full border border-primary/30 px-4 py-2 text-sm font-normal'>
        <span className='text-primary uppercase mr-2 font-semibold'>Dimensions:  </span>
        {image.width} x {image.height}
        </Badge>
        <Badge variant={'secondary'} className='rounded-full border border-primary/30 px-4 py-2 text-sm font-normal'>
        <span className='text-primary uppercase mr-2 font-semibold'>Guidence:  </span>
        {image.guidance}
        </Badge>
        <Badge variant={'secondary'} className='rounded-full border border-primary/30 px-4 py-2 text-sm font-normal'>
        <span className='text-primary uppercase mr-2 font-semibold'>Inference steps:  </span>
        {image.num_inference_steps}
        </Badge>
        <Badge variant={'secondary'} className='rounded-full border border-primary/30 px-4 py-2 text-sm font-normal'>
        <span className='text-primary uppercase mr-2 font-semibold'>Output format:  </span>
        {image.output_format}
        </Badge>
        <Badge variant={'secondary'} className='rounded-full border border-primary/30 px-4 py-2 text-sm font-normal'>
        <span className='text-primary uppercase mr-2 font-semibold'>Created At:  </span>
        {new Date().toLocaleDateString()}
        </Badge>
      </div>
      <ScrollBar orientation='vertical'/>
        </ScrollArea>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}

export default ImageDialog