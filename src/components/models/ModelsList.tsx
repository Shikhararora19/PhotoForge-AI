import { Database } from '@datatypes.types'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'


type ModelType = {
    error: string | null,
    success: boolean,
    data:Database["public"]["Tables"]["models"]["Row"][] | null,
}
interface ModelsListProps {
    models: ModelType
    }

const ModelsList = ({models}:ModelsListProps) => {

    const {data, error, success} = models;

    if(data?.length === 0){
        return <Card className='flex flex-col h-[450px] items-center justify-center text-center'>
            <CardHeader>
                <CardTitle>
                    No models found
                </CardTitle>
                <CardDescription>
                    You have not trained any models yet. Start by creating a new model.
                </CardDescription>
                <Link href="/model-training"className='inline-block pt-2'>
                <Button className='w-fit'>
                    Create Model
                </Button>
                </Link>
                </CardHeader>
        </Card>
    }
  return (
    <div className='grid gap-6 grid-cols-3'>
        {
            data?.map((model) => (
            <Card key={model.id}className='relative flex flex-col overflow-hidden'>
            <CardHeader>
                <CardTitle>
                    {model.model_name}
                </CardTitle>
                <CardDescription>
                    {model.created_at}
                </CardDescription>
                <Link href="/model-training"className='inline-block pt-2'>
                <Button className='w-fit'>
                    Create Model
                </Button>
                </Link>
                </CardHeader>
            </Card>

            ))
        }
    </div>
  )
}

export default ModelsList