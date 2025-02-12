import { Tables } from '@datatypes.types'
import React from 'react'


type ImageProps = {
    url: string | null,

} & Tables<'generated_images'>


interface GalleryProps {
    images: ImageProps[]
}


const GalleryComponent = ({images}: GalleryProps) => {
    console.log(images)

    if (images.length === 0){
        return (
            <div className='flex justify-center items-center h-[50vh] text-muted-foreground'>
               No images to display
            </div>
        )
    }

  return (
    <div className='container mx-auto py-8'>
        <div className='column-4 gap-4 space-y-4'>
            {
            images.map((image, index) => {

               return <div key={index}>
                    <div className='relative overflow-hidden cursor-pointer transition-transform'>
                        <img src={image.url || ""} alt={image.prompt || "Generated image"} width={image.width || 0} height={image.height || 0} className='object-cover rounded'/>
                    </div>
                </div>

            })


            }
            
        </div>

    </div>
  )
}

export default GalleryComponent