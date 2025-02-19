import { fetchModels } from '@/app/actions/model-actions'
import Configurations from '@/components/image-generation/configurations'
import GeneratedImages from '@/components/image-generation/GeneratedImages'
import React from 'react'

interface searchParams{
  model_id?: string
}


const ImageGeneration = async ({searchParams}:{searchParams: Promise<searchParams>}) => {


  const model_id = (await searchParams).model_id;
  const {data: userModels} = await fetchModels()
  return (
    <section className='container mx-auto grid gap-4 grid-cols-3 overflow-hidden'>
      <Configurations userModels={userModels || []} model_id ={model_id}/>
      <div className='col-span-2 p-4 rounded-x1 flex items-center justify-center h-fit'>
        <GeneratedImages/>
      </div>
    </section>
  )
}

export default ImageGeneration