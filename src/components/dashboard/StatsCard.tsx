import { Database } from '@datatypes.types'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ImageIcon, Layers2Icon, Wallet2, ZapIcon } from 'lucide-react'

interface StatsCardProps {
    imageCount: number,
    modelCount: number,
    credits: Database["public"]["Tables"]["credits"]["Row"] | null,
    }

const StatsCard = ({imageCount, modelCount, credits}: StatsCardProps) => {
  return (
    <div className='grid grid-cols-4 gap-6'>
        <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                    Total Images
                </CardTitle>
                <ImageIcon className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>
                    {imageCount}
                </div>
                <p className='text-xs text-muted-foreground'>
                    Images generated so far
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                    Total Models
                </CardTitle>
                <Layers2Icon className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>
                    {modelCount}
                </div>
                <p className='text-xs text-muted-foreground'>
                    Custom Models trained so far
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                    Image Credits
                </CardTitle>
                <ZapIcon className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>
                    {credits?.image_generation_count || 0}/{credits?.max_image_generation_count || 0}
                </div>
                <p className='text-xs text-muted-foreground'>
                    Image credits available
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                    Model Credits
                </CardTitle>
                <Wallet2 className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>
                    {credits?.model_training_count || 0}/{credits?.max_model_training_count || 0}
                </div>
                <p className='text-xs text-muted-foreground'>
                    Model credits available
                </p>
            </CardContent>
        </Card>
    </div>
  )
}

export default StatsCard