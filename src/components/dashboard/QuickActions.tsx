import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { LucideCreditCard, PlusCircleIcon, WandSparkles } from 'lucide-react'

const QuickActions = () => {
  return (
    <Card>
    <CardHeader>
        <CardTitle >
            Quick Actions
        </CardTitle>
        <CardDescription>
            Get started quickly
        </CardDescription>
    </CardHeader>
    <CardContent className='grid gap-4'>
        <Button asChild className='w-full'>
            <Link href={'/image-generation'}>
                <WandSparkles className='mr-2 h-4 w-4'/> Generate Images
            </Link>
        </Button>
        <Button asChild className='w-full' variant={'destructive'}>
            <Link href={'/model-training'}>
                <PlusCircleIcon className='mr-2 h-4 w-4'/> Train New Model
            </Link>
        </Button>
        <Button asChild className='w-full' variant={'secondary'}>
            <Link href={'/billing'}>
                <LucideCreditCard className='mr-2 h-4 w-4'/> Billing
            </Link>
        </Button>
    </CardContent>
</Card>
  )
}

export default QuickActions