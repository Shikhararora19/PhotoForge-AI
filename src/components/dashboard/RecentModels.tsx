import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Database } from '@datatypes.types'
import { Badge } from '../ui/badge'


interface RecentModelsProps {
    models: Database["public"]["Tables"]["models"]["Row"][] | null    
}

const RecentModels = ({models}: RecentModelsProps) => {
  return (
    <Card>
    <CardHeader>
        <CardTitle >
            Recent Models
        </CardTitle>
    </CardHeader>
    <CardContent className='grid gap-4'>
        <div className='space-y-4'>
            {
                models?.length === 0 ? <p className='text-muted-foreground text-sm'>No models Trained yet!</p> 
                
                : models?.map((model) => {
                    return <div key={model.id} className='flex flex-row items-center justify-between space-x-4'>
                        <div>
                            <p className='text-sm font-medium'>
                                {model.model_name}
                            </p>
                            <p className='text-xs text-muted-foreground'>{model.gender}</p>
                        </div>
                        <Badge variant={getStatusVariant(model.training_status || '')}>{model.training_status}</Badge>
                        </div>
            }
                )
            }

        </div>
    </CardContent>
</Card>
  )
}

export default RecentModels

function getStatusVariant(status: string) {
    switch(status){
        case 'succeeded':
            return 'default';
        case 'failed':
            return 'destructive';
        case 'processing':
            return 'destructive';
        case 'cancelled':
            return 'destructive';
        case 'starting':
            return 'outline';
        default:
            return 'secondary'
    }
}