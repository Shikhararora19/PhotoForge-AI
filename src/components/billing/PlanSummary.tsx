import { Tables } from '@datatypes.types'
import { User } from '@supabase/supabase-js'
import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'

type Product = Tables<'products'>
type Prices = Tables<'prices'>
type Subscription = Tables<'subscriptions'>

interface ProductWithPrices extends Product {
    prices: Prices[]
}

interface PriceWithProduct extends Prices {
    products: Product | null
}

interface SubscriptionWithProducts extends Subscription {
    prices: PriceWithProduct | null
}

interface PlanSummaryProps {
    subscription: SubscriptionWithProducts,
    user: User | null,
    products: ProductWithPrices[] | null
}

const PlanSummary = ({
    subscription,
    user,
    products,

}:PlanSummaryProps) => {

    if(!subscription || subscription.status !== 'active'){
        return <Card className='max-w-5xl '>
            <CardContent className='px-5 py-4'>
                <h3 className='pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2'>
                    <span>Plan Summary</span>
                    <Badge variant={'secondary'} className='bg-primary/10'>No Plan</Badge>
                </h3>
                <div className='grid grid-cols-8 gap-4'>
                    <div className='col-span-5 flex flex-col pr-12'>
                        <div className='flex-1 text-sm font-normal flex w-full justify-between'>
                        <span className='font-normal text-muted-foreground ml-1 lowercase'>
                            Image Generation Credits Left
                        </span>
                        <span className=''>
                            0 remaining
                        </span>
                        </div>
                        <div className='mb-1 flex items-end'>
                        <Progress value={0} className='w-full h-2'/>
                    
                    </div>
                    </div>
                    <div className='col-span-5 flex flex-col pr-12'>
                        <div className='flex-1 text-sm font-normal flex w-full justify-between'>
                        <span className='font-normal text-muted-foreground ml-1 lowercase'>
                            Model Training Credits Left
                        </span>
                        <span className=''>
                            0 remaining
                        </span>
                        </div>
                        <div className='mb-1 flex items-end'>
                        <Progress value={0} className='w-full h-2'/>
                    </div>
                    </div>
                    <div className='col-span-full flex flex-col pr-12'>
                        Please upgrade your plan to continue using the service.
                    </div>
                </div>
            </CardContent>
            <CardFooter className='border-t border-border px-4 py-3'>
                <span className='flex ml-auto flex-row'>
                    <Button variant={'outline'}>Upgrade Plan</Button>
                </span>
            </CardFooter>
        </Card>
    }

  return (
    <div>PlanSummary</div>
  )
}

export default PlanSummary