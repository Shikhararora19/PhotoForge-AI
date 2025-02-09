import Configurations from '@/components/image-generation/configurations'
import React from 'react'

const ImageGeneration = () => {
  return (
    <section className='container mx-auto grid gap-4 grid-cols-3 overflow-hidden'>
      <Configurations />
      <div className='col-span-2 p-4 rounded-x1 flex items-center justify-center'>
        Output Images
      </div>
    </section>
  )
}

export default ImageGeneration