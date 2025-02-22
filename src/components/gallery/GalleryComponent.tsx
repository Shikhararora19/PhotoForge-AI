'use client'
import { Tables } from '@datatypes.types'
import React, { useState } from 'react'
import ImageDialog from './ImageDialog'
import Image from 'next/image'


type ImageProps = {
    url: string | null,

} & Tables<'generated_images'>


interface GalleryProps {
    images: ImageProps[]
}


const GalleryComponent = ({images}: GalleryProps) => {

    const [selectedImage, setselectedImage] = useState<ImageProps | null>(null)

    console.log(images)

    if (images.length === 0){
        return (
            <div className='flex justify-center items-center h-[50vh] text-muted-foreground'>
               No images to display
            </div>
        )
    }

  return (
    <section className='container mx-auto py-8'>
        <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'>
            {
            images.map((image, index) => {

               return <div key={index}>
                    <div className='relative overflow-hidden cursor-pointer transition-transform'
                    onClick={() => setselectedImage(image)}>
                        <div className='absolute inset-0 bg-black flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-70  rounded'>
                           <div className='flex items-center justify-center h-full'>
                            <p className='text-primary-foreground text-lg font-semibold'>View Details</p>
                           </div>
                        </div>

                        <Image src={image.url || ""} alt={image.prompt || "Generated image"} width={image.width || 0} height={image.height || 0} className='object-cover rounded'/>
                    </div>
                </div>

            })


            }
            
        </div>

        {
            selectedImage && <ImageDialog image={selectedImage} onClose={() => setselectedImage(null)}/>
        }
    </section>
  )
}

export default GalleryComponent